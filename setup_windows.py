#!/usr/bin/env python3
"""
Windows-specific setup script for Smart News Classifier
Handles common Windows installation issues
"""

import os
import sys
import subprocess
import platform


def run_command(command, description, ignore_errors=False):
    """Run a command and handle errors"""
    print(f"\n{description}...")
    try:
        result = subprocess.run(command, shell=True,
                                check=True, capture_output=True, text=True)
        print(f"{description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        if ignore_errors:
            print(f"{description} had issues but continuing...")
            return True
        print(f"{description} failed:")
        print(f"Error: {e.stderr}")
        return False


def check_python_version():
    """Check if Python version is 3.8 or higher"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("Python 3.8 or higher is required")
        print(
            f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"Python {version.major}.{version.minor}.{version.micro} detected")
    return True


def check_node_version():
    """Check if Node.js is installed"""
    try:
        result = subprocess.run(
            "node --version", shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"Node.js {version} detected")
            return True
    except:
        pass

    print("Node.js not found. Please install Node.js 16 or higher")
    return False


def setup_backend_windows():
    """Set up the Python backend with Windows-specific handling"""
    print("\nSetting up Python backend for Windows...")

    # Create virtual environment
    venv_command = "python -m venv venv"
    if not run_command(venv_command, "Creating virtual environment"):
        return False

    # Upgrade pip first
    pip_cmd = "venv\\Scripts\\pip"
    upgrade_pip = f"{pip_cmd} install --upgrade pip"
    run_command(upgrade_pip, "Upgrading pip", ignore_errors=True)

    # Install wheel first
    install_wheel = f"{pip_cmd} install wheel"
    run_command(install_wheel, "Installing wheel", ignore_errors=True)

    # Try to install packages one by one to identify issues
    packages = [
        "fastapi==0.104.1",
        "uvicorn==0.24.0",
        "numpy>=1.24.0",
        "pandas>=2.0.0",
        "nltk==3.8.1",
        "python-multipart==0.0.6",
        "requests==2.31.0",
        "joblib>=1.3.0"
    ]

    # Install basic packages first
    for package in packages:
        install_cmd = f"{pip_cmd} install {package}"
        if not run_command(install_cmd, f"Installing {package}"):
            print(
                f"Failed to install {package}, trying alternative method...")
            # Try with --only-binary flag
            alt_cmd = f"{pip_cmd} install --only-binary=all {package}"
            if not run_command(alt_cmd, f"Installing {package} (binary only)", ignore_errors=True):
                print(f"Could not install {package}")

    # Special handling for scikit-learn
    print("\nInstalling scikit-learn...")
    sklearn_commands = [
        f"{pip_cmd} install --only-binary=all scikit-learn>=1.3.0",
        f"{pip_cmd} install scikit-learn>=1.3.0",
        f"{pip_cmd} install --find-links https://download.pytorch.org/whl/torch_stable.html scikit-learn>=1.3.0"
    ]

    sklearn_installed = False
    for cmd in sklearn_commands:
        if run_command(cmd, "Installing scikit-learn", ignore_errors=True):
            sklearn_installed = True
            break

    if not sklearn_installed:
        print("Could not install scikit-learn. Trying conda-forge...")
        print("Please try installing Anaconda/Miniconda and run:")
        print("conda install -c conda-forge scikit-learn")
        print("Then rerun this setup script.")

    print(f"\nTo activate the virtual environment, run:")
    print("   venv\\Scripts\\activate")

    return True


def setup_frontend():
    """Set up the React frontend"""
    print("\nSetting up React frontend...")

    # Change to frontend directory
    if not os.path.exists("frontend"):
        print("Frontend directory not found")
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
            print(f"Created directory: {directory}")


def test_installation():
    """Test if the installation was successful"""
    print("\nTesting installation...")

    test_script = """
import sys
sys.path.insert(0, 'venv/Lib/site-packages')

try:
    import fastapi
    print("FastAPI imported successfully")
except ImportError as e:
    print(f"FastAPI import failed: {e}")

try:
    import sklearn
    print("scikit-learn imported successfully")
except ImportError as e:
    print(f"scikit-learn import failed: {e}")

try:
    import pandas
    print("pandas imported successfully")
except ImportError as e:
    print(f"pandas import failed: {e}")

try:
    import nltk
    print("NLTK imported successfully")
except ImportError as e:
    print(f"NLTK import failed: {e}")
"""

    # Write test script to file
    with open("test_imports.py", "w") as f:
        f.write(test_script)

    # Run test with virtual environment Python
    test_cmd = "venv\\Scripts\\python test_imports.py"
    run_command(test_cmd, "Testing package imports", ignore_errors=True)

    # Clean up test file
    if os.path.exists("test_imports.py"):
        os.remove("test_imports.py")


def print_next_steps():
    """Print instructions for running the application"""
    print("\nSetup completed!")
    print("\nNext steps:")
    print("\n1. Activate the virtual environment:")
    print("   venv\\Scripts\\activate")

    print("\n2. Test the backend:")
    print("   cd backend")
    print("   python -c \"import sklearn, fastapi, pandas; print('All packages working!')\"")

    print("\n3. Start the backend server:")
    print("   python app.py")

    print("\n4. In a new terminal, start the frontend:")
    print("   cd frontend")
    print("   npm start")

    print("\n5. Open your browser and go to:")
    print("   http://localhost:3000")

    print("\nAPI Documentation will be available at:")
    print("   http://localhost:8000/docs")

    print("\nIf you encounter issues with scikit-learn:")
    print("   1. Install Visual Studio Build Tools from:")
    print("      https://visualstudio.microsoft.com/visual-cpp-build-tools/")
    print("   2. Or install Anaconda and use conda instead of pip")


def main():
    """Main setup function"""
    print("Smart News Classifier Setup (Windows)")
    print("=" * 45)

    # Check if we're on Windows
    if platform.system() != "Windows":
        print("This script is designed for Windows. Use setup.py for other platforms.")
        return

    # Check prerequisites
    if not check_python_version():
        sys.exit(1)

    if not check_node_version():
        sys.exit(1)

    # Create directories
    create_directories()

    # Setup backend
    if not setup_backend_windows():
        print("Backend setup had issues")
        print("You may need to install Visual Studio Build Tools or use Anaconda")

    # Test installation
    test_installation()

    # Setup frontend
    if not setup_frontend():
        print("Frontend setup failed")
        sys.exit(1)

    # Print next steps
    print_next_steps()


if __name__ == "__main__":
    main()
