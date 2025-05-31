@echo off
echo 🤖 Smart News Classifier - Quick Start
echo =====================================
echo.

echo 🔍 Checking if virtual environment exists...
if not exist "venv\" (
    echo ❌ Virtual environment not found!
    echo Please run setup.py first: python setup.py
    pause
    exit /b 1
)

echo ✅ Virtual environment found
echo.

echo 🐍 Starting backend server...
start "Backend Server" cmd /k "venv\Scripts\activate && cd backend && python app.py"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo ⚛️ Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo 🎉 Both servers are starting!
echo 📍 Frontend: http://localhost:3000
echo 📍 Backend API: http://localhost:8000
echo 📖 API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause > nul 