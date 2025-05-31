#!/bin/bash

echo "🤖 Smart News Classifier - Quick Start"
echo "====================================="
echo

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Please run setup.py first: python setup.py"
    exit 1
fi

echo "✅ Virtual environment found"
echo

# Function to start backend
start_backend() {
    echo "🐍 Starting backend server..."
    source venv/bin/activate
    cd backend
    python app.py
}

# Function to start frontend
start_frontend() {
    echo "⚛️ Starting frontend server..."
    cd frontend
    npm start
}

# Check if we should run in parallel or sequential mode
if command -v gnome-terminal &> /dev/null; then
    # GNOME Terminal (Ubuntu/Debian)
    echo "🚀 Starting servers in separate terminals..."
    gnome-terminal -- bash -c "source venv/bin/activate; cd backend; python app.py; exec bash"
    sleep 3
    gnome-terminal -- bash -c "cd frontend; npm start; exec bash"
elif command -v osascript &> /dev/null; then
    # macOS Terminal
    echo "🚀 Starting servers in separate terminals..."
    osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && source venv/bin/activate && cd backend && python app.py"'
    sleep 3
    osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && cd frontend && npm start"'
else
    # Fallback: run in background
    echo "🚀 Starting backend server in background..."
    (start_backend) &
    BACKEND_PID=$!
    
    echo "⏳ Waiting for backend to start..."
    sleep 5
    
    echo "🚀 Starting frontend server..."
    start_frontend
    
    # Cleanup function
    cleanup() {
        echo
        echo "🛑 Stopping servers..."
        kill $BACKEND_PID 2>/dev/null
        exit 0
    }
    
    # Set trap for cleanup
    trap cleanup SIGINT SIGTERM
fi

echo
echo "🎉 Servers are starting!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo
echo "Press Ctrl+C to stop servers" 