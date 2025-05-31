
# 📰 Smart News Classifier

An end-to-end machine learning web application that detects fake news using advanced NLP techniques and modern web technologies.

![Smart News Classifier](https://img.shields.io/badge/ML-News%20Classification-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

---

## 🌟 Features

-  **Advanced NLP Pipeline**: Tokenization, lemmatization, TF-IDF
-  **ML Model**: Logistic Regression with L2 regularization
- **Real-Time Classification**: Instant predictions with confidence scores
- **Modern UI**: Responsive React frontend with glassmorphism & animations
-  **Model Dashboard**: View metrics, retrain model from browser
-  **FastAPI REST API**: Clean, auto-documented endpoints
-  **Transparency**: Display of probabilities and prediction confidence

---

## 🏗️ Architecture

```
smart-news-classifier/
├── backend/
│   ├── app.py              # FastAPI application
│   ├── ml_pipeline.py      # NLP + ML logic
│   └── models/             # Trained model files
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level views
│   │   └── App.js
│   └── package.json
├── requirements.txt
└── README.md
```

---

## 🚀 Quick Start

### 🔧 Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### 📥 Installation

```bash
git clone https://github.com/abdallah-alshawaf/newsclassifier
cd smart-news-classifier
```

#### 🐍 Set up the backend

```bash
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
python setup_windows.py
> Run `fix_sklearn.py` if you encounter `sklearn` compatibility or path issues after initial setup. 

# macOS/Linux
source venv/bin/activate
python setup.py

# Install dependencies
pip install -r requirements.txt
```

#### ⚛️ Set up the frontend

```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Running the App

### ✅ One-click (auto)

```bash
# Windows
start.bat

# macOS/Linux
./start.sh
```

### 🔄 Manual start

```bash
# Terminal 1 (Backend)
source venv/bin/activate      # or venv\Scripts\activate on Windows
cd backend
python app.py

# Terminal 2 (Frontend)
cd frontend
npm start
```

---

## 🌐 Access the App

- Web App: http://localhost:3000  
- API Docs: http://localhost:8000/docs

---

## 🔧 API Endpoints

### `/classify` – Classify a news article  
```json
{
  "title": "Breaking News",
  "content": "Full article content here..."
}
```

### `/train` – Retrain the ML model  
### `/model-info` – Get current model metrics  
### `/health` – API health check  

#### 💡 Example Usage
```python
import requests

response = requests.post("http://localhost:8000/classify", json={
    "title": "Example Title",
    "content": "Example content goes here..."
})

data = response.json()
print(f"Prediction: {data['prediction']}")
print(f"Confidence: {data['confidence']:.2%}")
```

---

## 🧠 ML Pipeline Details

### 1. Preprocessing
- Clean HTML, URLs, special chars
- Tokenize and lemmatize with NLTK
- Remove stopwords
- Normalize case and whitespace

### 2. Feature Extraction
- TF-IDF vectorization (1–2 n-grams)
- Top 5000 features used

### 3. Model Training
- Logistic Regression with L2 penalty
- Cross-validation and metrics logging

### 4. Prediction
- Same preprocessing applied
- Output includes class and probability

---

## 📈 Model Performance

- Robust metrics via cross-validation  
- Balanced training dataset  
- Viewable in UI via **Model Info** tab

---

## 🎨 Frontend Features

### Design Highlights

- Responsive layout (desktop & mobile)
- Glassmorphism UI with blur effects
- Smooth animations with Framer Motion

### Pages

- 🏠 **Home** – News classification form  
- 📊 **Model Info** – View metrics + retrain  
- 📘 **About** – Learn how it works

### Components

- Classification form + validation  
- Confidence color-coded result panel  
- Header navigation with active highlights

---

## 🛠️ Technology Stack

| Layer       | Tools & Frameworks                               |
|-------------|--------------------------------------------------|
| **Backend** | FastAPI, scikit-learn, NLTK, Pandas, Uvicorn     |
| **Frontend**| React, Styled Components, Framer Motion, Axios   |
| **ML**      | TF-IDF, Logistic Regression                      |
| **DevTools**| Python venv, npm, Bash/Batch scripts, CORS       |

---

## 🧪 Usage Examples

### 🟢 Real News

```
Title: "Fed Raises Interest Rates"
Content: "The Federal Reserve announced a 0.25% rate hike..."
Result: REAL NEWS (95.2% confidence)
```

### 🔴 Fake News

```
Title: "Aliens Found Living in Antarctica"
Content: "A secret NASA report confirms alien life was discovered..."
Result: FAKE NEWS (89.7% confidence)
```

---

## 🔄 Retrain the Model

1. Go to the **Model Info** page  
2. Click **Retrain Model**  
3. Wait for the training to complete  
4. Refresh metrics and re-test

---

## 🌐 Website Layout

![screencapture-localhost-3000-2025-05-31-04_51_09](https://github.com/user-attachments/assets/c1e4d027-4ccc-4b30-9804-53cd6c447f20)
