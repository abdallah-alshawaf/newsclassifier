# 🤖 Smart News Classifier

An end-to-end machine learning web application that detects fake news using advanced NLP techniques and modern web technologies.

![Smart News Classifier](https://img.shields.io/badge/ML-News%20Classification-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## 🌟 Features

- **Advanced NLP Pipeline**: Text preprocessing with tokenization, lemmatization, and TF-IDF vectorization
- **Machine Learning Model**: Logistic Regression classifier with high accuracy
- **Real-time Classification**: Instant fake news detection with confidence scores
- **Modern UI**: Beautiful React frontend with animations and responsive design
- **Model Management**: View performance metrics and retrain models
- **REST API**: FastAPI backend with comprehensive endpoints
- **Transparency**: Detailed probability breakdowns and processing metrics

## 🏗️ Architecture

```
Smart News Classifier/
├── backend/                 # Python FastAPI backend
│   ├── app.py              # Main FastAPI application
│   ├── ml_pipeline.py      # ML model and preprocessing
│   └── models/             # Trained model storage
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json        # Frontend dependencies
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-news-classifier
   ```

2. **Set up the backend**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   # Make sure virtual environment is activated
   cd backend
   python app.py
   ```
   The API will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   # In a new terminal
   cd frontend
   npm start
   ```
   The web app will be available at `http://localhost:3000`

## 🔧 API Endpoints

### Classification
- `POST /classify` - Classify a news article
  ```json
  {
    "title": "Article title",
    "content": "Article content"
  }
  ```

### Model Management
- `GET /model-info` - Get model performance metrics
- `POST /train` - Train or retrain the model
- `GET /health` - Health check endpoint

### Example Usage

```python
import requests

# Classify an article
response = requests.post('http://localhost:8000/classify', json={
    "title": "Breaking News: Important Event",
    "content": "This is the full article content..."
})

result = response.json()
print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']:.2%}")
```

## 🧠 Machine Learning Pipeline

### 1. Text Preprocessing
- **Cleaning**: Remove URLs, emails, HTML tags, special characters
- **Normalization**: Convert to lowercase, handle whitespace
- **Tokenization**: Split text into individual words
- **Stop Word Removal**: Remove common words that don't add meaning
- **Lemmatization**: Reduce words to their root form

### 2. Feature Extraction
- **TF-IDF Vectorization**: Convert text to numerical features
- **N-gram Analysis**: Capture both individual words and phrases (1-2 grams)
- **Feature Selection**: Use top 5,000 most informative features

### 3. Model Training
- **Algorithm**: Logistic Regression with L2 regularization
- **Cross-validation**: Ensure robust performance
- **Metrics**: Accuracy, Precision, Recall, F1-score

### 4. Prediction
- **Real-time**: Instant classification of new articles
- **Confidence Scores**: Probability distributions for transparency
- **Preprocessing**: Same pipeline applied to new data

## 📊 Model Performance

The model achieves high accuracy through:
- Comprehensive text preprocessing
- Balanced training data
- Feature engineering with TF-IDF
- Regularized logistic regression
- Cross-validation for robustness

Performance metrics are available in the web interface under "Model Info".

## 🎨 Frontend Features

### Modern UI/UX
- **Responsive Design**: Works on desktop and mobile
- **Animations**: Smooth transitions with Framer Motion
- **Glass Morphism**: Modern backdrop blur effects
- **Interactive Elements**: Hover effects and loading states

### Pages
- **Home**: Main classification interface with example articles
- **Model Info**: Real-time performance metrics and retraining
- **About**: Project overview and technical details

### Components
- **Header**: Navigation with active state indicators
- **Classification Form**: Input fields with validation
- **Results Display**: Color-coded predictions with metrics
- **Loading States**: Spinner animations during processing

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **scikit-learn**: Machine learning library
- **NLTK**: Natural language processing
- **Pandas**: Data manipulation
- **Uvicorn**: ASGI server

### Frontend
- **React**: Component-based UI library
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **React Router**: Client-side routing

### Development
- **Git**: Version control
- **Virtual Environment**: Python dependency isolation
- **npm**: Node.js package management
- **CORS**: Cross-origin resource sharing

## 📈 Usage Examples

### Example 1: Real News
```
Title: "Federal Reserve Announces Interest Rate Decision"
Content: "The Federal Reserve announced a 0.25% interest rate increase..."
Result: REAL NEWS (95.2% confidence)
```

### Example 2: Fake News
```
Title: "Scientists Discover Water Causes Cancer"
Content: "A shocking new study reveals that drinking water causes cancer..."
Result: FAKE NEWS (87.8% confidence)
```

## 🔄 Model Retraining

The application supports model retraining through the web interface:

1. Navigate to "Model Info" page
2. Click "Retrain Model" button
3. Confirm the action
4. Wait for training to complete
5. View updated performance metrics

## 🚀 Deployment

### Production Setup

1. **Backend Deployment**
   ```bash
   # Install production dependencies
   pip install gunicorn
   
   # Run with Gunicorn
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.app:app
   ```

2. **Frontend Build**
   ```bash
   cd frontend
   npm run build
   # Serve the build folder with a web server
   ```

### Environment Variables
```bash
# Backend
PYTHONPATH=.
MODEL_PATH=models/
LOG_LEVEL=INFO

# Frontend
REACT_APP_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **scikit-learn** for machine learning capabilities
- **NLTK** for natural language processing
- **FastAPI** for the modern web framework
- **React** for the frontend framework
- **The open-source community** for inspiration and tools

## 📞 Support

If you have any questions or issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Built with ❤️ for fighting misinformation through AI** 