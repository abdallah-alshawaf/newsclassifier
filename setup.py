#!/usr/bin/env python3
"""
Smart News Classifier Setup Script
Automates the setup process for the project
"""

import os
import sys
import subprocess
import platform


def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True,
                                check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e.stderr}")
        return False


def check_python_version():
    """Check if Python version is 3.8 or higher"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        print(
            f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} detected")
    return True


def check_node_version():
    """Check if Node.js is installed"""
    try:
        result = subprocess.run(
            "node --version", shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"✅ Node.js {version} detected")
            return True
    except:
        pass

    print("❌ Node.js not found. Please install Node.js 16 or higher")
    return False


def setup_backend():
    """Set up the Python backend"""
    print("\n🐍 Setting up Python backend...")

    # Create virtual environment
    venv_command = "python -m venv venv"
    if not run_command(venv_command, "Creating virtual environment"):
        return False

    # Determine activation command based on OS
    if platform.system() == "Windows":
        activate_cmd = "venv\\Scripts\\activate"
        pip_cmd = "venv\\Scripts\\pip"
    else:
        activate_cmd = "source venv/bin/activate"
        pip_cmd = "venv/bin/pip"

    # Install requirements
    install_cmd = f"{pip_cmd} install -r requirements.txt"
    if not run_command(install_cmd, "Installing Python dependencies"):
        return False

    print(f"\n📝 To activate the virtual environment, run:")
    if platform.system() == "Windows":
        print("   venv\\Scripts\\activate")
    else:
        print("   source venv/bin/activate")

    return True


def setup_frontend():
    """Set up the React frontend"""
    print("\n⚛️ Setting up React frontend...")

    # Change to frontend directory
    if not os.path.exists("frontend"):
        print("❌ Frontend directory not found")
        return False

    # Install npm dependencies
    install_cmd = "cd frontend && npm install"
    if not run_command(install_cmd, "Installing Node.js dependencies"):
        return False

    return True


def create_directories():
    """Create necessary directories"""
    directories = ["backend/models", "logs"]

    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"✅ Created directory: {directory}")


def print_next_steps():
    """Print instructions for running the application"""
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("\n1. Start the backend server:")
    if platform.system() == "Windows":
        print("   venv\\Scripts\\activate")
    else:
        print("   source venv/bin/activate")
    print("   cd backend")
    print("   python app.py")

    print("\n2. In a new terminal, start the frontend:")
    print("   cd frontend")
    print("   npm start")

    print("\n3. Open your browser and go to:")
    print("   http://localhost:3000")

    print("\n🔗 API Documentation will be available at:")
    print("   http://localhost:8000/docs")


def main():
    """Main setup function"""
    print("🤖 Smart News Classifier Setup")
    print("=" * 40)

    # Check prerequisites
    if not check_python_version():
        sys.exit(1)

    if not check_node_version():
        sys.exit(1)

    # Create directories
    create_directories()

    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed")
        sys.exit(1)

    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed")
        sys.exit(1)

    # Print next steps
    print_next_steps()


if __name__ == "__main__":
    main()
