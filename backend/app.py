from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
from typing import Dict, Any
import logging
from datetime import datetime

from ml_pipeline import NewsClassifier, preprocess_text

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Smart News Classifier API",
    description="An AI-powered news article classifier that detects fake news",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global classifier instance
classifier = None


class NewsArticle(BaseModel):
    title: str
    content: str


class ClassificationResponse(BaseModel):
    prediction: str
    confidence: float
    probability_fake: float
    probability_real: float
    processed_text_length: int
    timestamp: str


class TrainingRequest(BaseModel):
    retrain: bool = False


@app.on_event("startup")
async def startup_event():
    """Initialize the ML model on startup"""
    global classifier
    try:
        classifier = NewsClassifier()

        # Check if model exists, if not train it
        if not os.path.exists("models/news_classifier.joblib"):
            logger.info("No existing model found. Training new model...")
            classifier.train_model()
            logger.info("Model training completed!")
        else:
            logger.info("Loading existing model...")
            classifier.load_model()
            logger.info("Model loaded successfully!")

    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")
        raise


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Smart News Classifier API is running!",
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    model_status = "loaded" if classifier and classifier.model else "not_loaded"
    return {
        "status": "healthy",
        "model_status": model_status,
        "timestamp": datetime.now().isoformat()
    }


@app.post("/classify", response_model=ClassificationResponse)
async def classify_news(article: NewsArticle):
    """Classify a news article as real or fake"""
    try:
        if not classifier or not classifier.model:
            raise HTTPException(status_code=503, detail="Model not loaded")

        # Combine title and content
        full_text = f"{article.title} {article.content}"

        # Get prediction
        prediction, confidence, probabilities = classifier.predict(full_text)

        # Process text to get length info
        processed_text = preprocess_text(full_text)

        return ClassificationResponse(
            prediction=prediction,
            confidence=confidence,
            probability_fake=probabilities[0],
            probability_real=probabilities[1],
            processed_text_length=len(processed_text.split()),
            timestamp=datetime.now().isoformat()
        )

    except Exception as e:
        logger.error(f"Error during classification: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Classification error: {str(e)}")


@app.post("/train")
async def train_model(request: TrainingRequest):
    """Train or retrain the model"""
    try:
        global classifier

        if not classifier:
            classifier = NewsClassifier()

        logger.info("Starting model training...")
        metrics = classifier.train_model(retrain=request.retrain)
        logger.info("Model training completed!")

        return {
            "message": "Model trained successfully",
            "metrics": metrics,
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        logger.error(f"Error during training: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Training error: {str(e)}")


@app.get("/model-info")
async def get_model_info():
    """Get information about the current model"""
    try:
        if not classifier:
            return {"status": "No classifier initialized"}

        info = classifier.get_model_info()
        return info

    except Exception as e:
        logger.error(f"Error getting model info: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
