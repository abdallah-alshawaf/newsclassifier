#!/usr/bin/env python3
"""
Quick fix for scikit-learn installation issues on Windows
"""

import subprocess
import sys
import os


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


def main():
    print("🔧 Fixing scikit-learn installation on Windows")
    print("=" * 50)

    # Check if virtual environment exists
    if not os.path.exists("venv"):
        print("❌ Virtual environment not found. Please run setup first.")
        return

    pip_cmd = "venv\\Scripts\\pip"

    # Upgrade pip first
    run_command(f"{pip_cmd} install --upgrade pip", "Upgrading pip")

    # Install/upgrade setuptools and wheel
    run_command(f"{pip_cmd} install --upgrade setuptools wheel",
                "Installing build tools")

    # Try different methods to install scikit-learn
    methods = [
        (f"{pip_cmd} install --only-binary=all scikit-learn",
         "Installing scikit-learn (binary only)"),
        (f"{pip_cmd} install --prefer-binary scikit-learn",
         "Installing scikit-learn (prefer binary)"),
        (f"{pip_cmd} install --find-links https://download.pytorch.org/whl/torch_stable.html scikit-learn",
         "Installing from PyTorch index"),
        (f"{pip_cmd} install https://files.pythonhosted.org/packages/py3/s/scikit_learn/scikit_learn-1.3.0-py3-none-any.whl",
         "Installing specific wheel")
    ]

    for command, description in methods:
        if run_command(command, description):
            print("✅ scikit-learn installed successfully!")
            break
    else:
        print("\n❌ All installation methods failed.")
        print("\n🔧 Alternative solutions:")
        print("1. Install Visual Studio Build Tools:")
        print("   https://visualstudio.microsoft.com/visual-cpp-build-tools/")
        print("\n2. Use Anaconda instead:")
        print("   conda create -n classifier python=3.9")
        print("   conda activate classifier")
        print("   conda install scikit-learn pandas fastapi uvicorn nltk")
        print("\n3. Use Python from Microsoft Store (often has better compatibility)")
        return

    # Test the installation
    test_cmd = f"venv\\Scripts\\python -c \"import sklearn; print('scikit-learn version:', sklearn.__version__)\""
    run_command(test_cmd, "Testing scikit-learn import")

    print("\n🎉 scikit-learn should now be working!")
    print("You can now run the main application.")


if __name__ == "__main__":
    main()
