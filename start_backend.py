#!/usr/bin/env python3
"""
Backend startup script for Smart News Classifier
"""

import os
import sys
import subprocess
import signal
import time


def check_virtual_env():
    """Check if virtual environment is activated"""
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("Virtual environment detected")
        return True
    else:
        print("Virtual environment not detected")
        print("Please activate the virtual environment first:")
        print("   Windows: venv\\Scripts\\activate")
        print("   macOS/Linux: source venv/bin/activate")
        return False


def check_dependencies():
    """Check if required packages are installed"""
    required_packages = ['fastapi', 'uvicorn',
                         'scikit-learn', 'nltk', 'pandas']
    missing_packages = []

    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)

    if missing_packages:
        print(f"Missing packages: {', '.join(missing_packages)}")
        print("Please install requirements: pip install -r requirements.txt")
        return False

    print("All required packages are installed")
    return True


def setup_nltk_data():
    """Download required NLTK data"""
    print("Setting up NLTK data...")
    try:
        import nltk

        # Download required NLTK data
        nltk_downloads = ['punkt', 'stopwords', 'wordnet', 'omw-1.4']
        for item in nltk_downloads:
            try:
                nltk.data.find(
                    f'tokenizers/{item}' if item == 'punkt' else f'corpora/{item}')
            except LookupError:
                print(f"Downloading {item}...")
                nltk.download(item, quiet=True)

        print("NLTK data setup complete")
        return True
    except Exception as e:
        print(f"NLTK setup failed: {e}")
        return False


def start_server():
    """Start the FastAPI server"""
    print("\nStarting Smart News Classifier Backend...")
    print("Server will be available at: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("Press Ctrl+C to stop the server\n")

    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    if os.path.exists(backend_dir):
        os.chdir(backend_dir)

    try:
        # Start the server
        subprocess.run([
            sys.executable,
            'app.py'
        ], check=True)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"Server failed to start: {e}")
        return False
    except FileNotFoundError:
        print("app.py not found in backend directory")
        return False

    return True


def main():
    """Main function"""
    print("Smart News Classifier - Backend Startup")
    print("=" * 50)

    # Check virtual environment
    if not check_virtual_env():
        sys.exit(1)

    # Check dependencies
    if not check_dependencies():
        sys.exit(1)

    # Setup NLTK data
    if not setup_nltk_data():
        sys.exit(1)

    # Start server
    start_server()


if __name__ == "__main__":
    main()
