import pandas as pd
import numpy as np
import re
import string
import joblib
import os
from datetime import datetime
import logging

# NLP libraries
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

# ML libraries
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

try:
    nltk.data.find('corpora/omw-1.4')
except LookupError:
    nltk.download('omw-1.4')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def preprocess_text(text):
    """
    Comprehensive text preprocessing function
    """
    if not isinstance(text, str):
        return ""

    # Convert to lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)

    # Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)

    # Remove HTML tags
    text = re.sub(r'<.*?>', '', text)

    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()

    # Tokenization
    tokens = word_tokenize(text)

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # Remove short words (less than 3 characters)
    tokens = [token for token in tokens if len(token) >= 3]

    return ' '.join(tokens)


def create_sample_dataset():
    """
    Create a sample dataset for training if no external dataset is available
    """
    # Sample fake news articles
    fake_news = [
        "Scientists discover that drinking water causes cancer in 99% of cases according to new study",
        "Breaking: Aliens have landed in New York City and are demanding pizza",
        "Government secretly controls weather using mind control satellites",
        "Local man discovers one weird trick that doctors hate - cures all diseases",
        "Celebrity spotted eating food, shocking revelation about human behavior",
        "New study shows that breathing air is actually harmful to your health",
        "Miracle cure discovered in grandmother's kitchen cabinet",
        "Politicians reveal they are actually lizard people in disguise",
        "Social media platform announces it will start charging users for thinking",
        "Breaking news: Gravity no longer works on Tuesdays",
        "Scientists prove that the earth is actually shaped like a donut",
        "Local woman loses 50 pounds by staring at pictures of salad",
        "Government admits that birds are not real, just surveillance drones",
        "New app can predict your future by analyzing your grocery receipts",
        "Researchers discover that sleeping is just practice for being dead"
    ]

    # Sample real news articles
    real_news = [
        "The Federal Reserve announced a 0.25% interest rate increase following their monthly meeting",
        "New climate report shows global temperatures rising faster than previously predicted",
        "Technology company reports quarterly earnings exceeding analyst expectations",
        "Local school district receives federal funding for new educational programs",
        "Healthcare workers continue vaccination efforts in rural communities",
        "City council approves budget for infrastructure improvements next fiscal year",
        "University researchers publish findings on renewable energy efficiency",
        "International trade negotiations continue between major economic partners",
        "Supreme Court hears arguments on important constitutional case",
        "Environmental protection agency announces new regulations for industrial emissions",
        "Stock market shows mixed results following economic data release",
        "Public health officials recommend updated guidelines for seasonal illness prevention",
        "Transportation department begins construction on new highway expansion project",
        "Educational institutions adapt to changing technology in classroom settings",
        "Agricultural department reports on crop yields and farming conditions"
    ]

    # Create DataFrame
    data = []

    # Add fake news
    for article in fake_news:
        data.append({
            'title': article[:50] + "...",
            'text': article,
            'label': 0  # 0 for fake
        })

    # Add real news
    for article in real_news:
        data.append({
            'title': article[:50] + "...",
            'text': article,
            'label': 1  # 1 for real
        })

    df = pd.DataFrame(data)
    return df


class NewsClassifier:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.pipeline = None
        self.model_info = {}

        # Ensure models directory exists
        os.makedirs("models", exist_ok=True)

    def load_data(self):
        """
        Load training data. In a real scenario, this would load from a large dataset.
        For this demo, we'll use a sample dataset.
        """
        logger.info("Loading training data...")

        # Try to load external dataset first, fallback to sample data
        try:
            # You can replace this with actual dataset loading
            # df = pd.read_csv('path_to_your_dataset.csv')
            df = create_sample_dataset()
            logger.info(f"Loaded {len(df)} articles for training")
            return df
        except Exception as e:
            logger.warning(f"Could not load external dataset: {e}")
            logger.info("Using sample dataset for demonstration")
            return create_sample_dataset()

    def prepare_features(self, df):
        """
        Prepare features for training
        """
        logger.info("Preparing features...")

        # Combine title and text
        df['combined_text'] = df['title'].fillna(
            '') + ' ' + df['text'].fillna('')

        # Preprocess text
        df['processed_text'] = df['combined_text'].apply(preprocess_text)

        # Remove empty texts
        df = df[df['processed_text'].str.len() > 0]

        return df

    def train_model(self, retrain=False):
        """
        Train the news classification model
        """
        try:
            logger.info("Starting model training...")

            # Load and prepare data
            df = self.load_data()
            df = self.prepare_features(df)

            # Split features and target
            X = df['processed_text']
            y = df['label']

            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )

            # Create TF-IDF vectorizer
            self.vectorizer = TfidfVectorizer(
                max_features=5000,
                ngram_range=(1, 2),
                min_df=2,
                max_df=0.95,
                stop_words='english'
            )

            # Create and train model pipeline
            self.model = LogisticRegression(
                random_state=42,
                max_iter=1000,
                C=1.0
            )

            # Create pipeline
            self.pipeline = Pipeline([
                ('tfidf', self.vectorizer),
                ('classifier', self.model)
            ])

            # Train the model
            logger.info("Training the model...")
            self.pipeline.fit(X_train, y_train)

            # Evaluate model
            train_score = self.pipeline.score(X_train, y_train)
            test_score = self.pipeline.score(X_test, y_test)

            # Make predictions for detailed metrics
            y_pred = self.pipeline.predict(X_test)

            # Calculate metrics
            metrics = {
                'train_accuracy': float(train_score),
                'test_accuracy': float(test_score),
                'classification_report': classification_report(y_test, y_pred, output_dict=True),
                'training_samples': len(X_train),
                'test_samples': len(X_test),
                'features_count': len(self.vectorizer.get_feature_names_out()) if hasattr(self.vectorizer, 'get_feature_names_out') else 'N/A'
            }

            # Store model info
            self.model_info = {
                'trained_at': datetime.now().isoformat(),
                'model_type': 'Logistic Regression with TF-IDF',
                'metrics': metrics
            }

            # Save model
            self.save_model()

            logger.info(
                f"Model training completed! Test accuracy: {test_score:.4f}")
            return metrics

        except Exception as e:
            logger.error(f"Error during model training: {str(e)}")
            raise

    def save_model(self):
        """
        Save the trained model and vectorizer
        """
        try:
            model_data = {
                'pipeline': self.pipeline,
                'model_info': self.model_info
            }
            joblib.dump(model_data, 'models/news_classifier.joblib')
            logger.info("Model saved successfully")
        except Exception as e:
            logger.error(f"Error saving model: {str(e)}")
            raise

    def load_model(self):
        """
        Load a pre-trained model
        """
        try:
            if os.path.exists('models/news_classifier.joblib'):
                model_data = joblib.load('models/news_classifier.joblib')
                self.pipeline = model_data['pipeline']
                self.model_info = model_data.get('model_info', {})

                # Extract components for compatibility
                self.model = self.pipeline.named_steps['classifier']
                self.vectorizer = self.pipeline.named_steps['tfidf']

                logger.info("Model loaded successfully")
                return True
            else:
                logger.warning("No saved model found")
                return False
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise

    def predict(self, text):
        """
        Predict if a news article is real or fake
        """
        try:
            if not self.pipeline:
                raise ValueError("Model not trained or loaded")

            # Preprocess text
            processed_text = preprocess_text(text)

            if not processed_text:
                # Default prediction for empty text
                return "real", 0.5, [0.5, 0.5]

            # Make prediction
            prediction = self.pipeline.predict([processed_text])[0]
            probabilities = self.pipeline.predict_proba([processed_text])[0]

            # Convert prediction to label
            prediction_label = "fake" if prediction == 0 else "real"
            confidence = float(max(probabilities))

            return prediction_label, confidence, [float(prob) for prob in probabilities]

        except Exception as e:
            logger.error(f"Error during prediction: {str(e)}")
            raise

    def get_model_info(self):
        """
        Get information about the current model
        """
        if not self.model_info:
            return {"status": "No model information available"}

        return self.model_info
