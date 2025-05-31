#!/usr/bin/env python3
"""
API Test Script for Smart News Classifier
Tests the backend API endpoints to ensure everything is working correctly
"""

import requests
import json
import time
import sys

API_BASE_URL = "http://localhost:8000"


def test_health_endpoint():
    """Test the health check endpoint"""
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"Health check passed: {data['status']}")
            print(f"   Model status: {data.get('model_status', 'unknown')}")
            return True
        else:
            print(f"Health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"Health check failed: {e}")
        return False


def test_classification_endpoint():
    """Test the classification endpoint with sample data"""
    print("\nTesting classification endpoint...")

    # Test data
    test_articles = [
        {
            "title": "Federal Reserve Announces Interest Rate Decision",
            "content": "The Federal Reserve announced a 0.25% interest rate increase following their monthly meeting. The decision comes amid ongoing concerns about inflation and economic stability.",
            "expected": "real"
        },
        {
            "title": "Scientists Discover Water Causes Cancer",
            "content": "A shocking new study reveals that drinking water causes cancer in 99% of cases. Researchers at a made-up university claim that H2O molecules directly attack healthy cells.",
            "expected": "fake"
        }
    ]

    for i, article in enumerate(test_articles, 1):
        print(f"\nTesting article {i}: {article['title'][:50]}...")

        try:
            response = requests.post(
                f"{API_BASE_URL}/classify",
                json={
                    "title": article["title"],
                    "content": article["content"]
                },
                timeout=30
            )

            if response.status_code == 200:
                data = response.json()
                prediction = data["prediction"]
                confidence = data["confidence"]

                print(f"Classification successful:")
                print(f"   Prediction: {prediction.upper()}")
                print(f"   Confidence: {confidence:.2%}")
                print(f"   Expected: {article['expected'].upper()}")

                if prediction == article["expected"]:
                    print("   Prediction matches expected result!")
                else:
                    print("   Prediction differs from expected result")

            else:
                print(f"Classification failed: {response.status_code}")
                print(f"   Response: {response.text}")
                return False

        except requests.exceptions.RequestException as e:
            print(f"Classification request failed: {e}")
            return False

    return True


def test_model_info_endpoint():
    """Test the model info endpoint"""
    print("\nTesting model info endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/model-info", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("Model info retrieved successfully:")

            if "model_type" in data:
                print(f"   Model type: {data['model_type']}")

            if "metrics" in data:
                metrics = data["metrics"]
                if "test_accuracy" in metrics:
                    print(f"   Test accuracy: {metrics['test_accuracy']:.2%}")
                if "training_samples" in metrics:
                    print(
                        f"   Training samples: {metrics['training_samples']}")

            return True
        else:
            print(f"Model info failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"Model info request failed: {e}")
        return False


def wait_for_server():
    """Wait for the server to be ready"""
    print("Waiting for server to be ready...")
    max_attempts = 30

    for attempt in range(max_attempts):
        try:
            response = requests.get(f"{API_BASE_URL}/health", timeout=2)
            if response.status_code == 200:
                print("Server is ready!")
                return True
        except requests.exceptions.RequestException:
            pass

        print(f"   Attempt {attempt + 1}/{max_attempts}...")
        time.sleep(2)

    print("Server did not become ready in time")
    return False


def main():
    """Main test function"""
    print("Smart News Classifier API Test Suite")
    print("=" * 45)

    # Wait for server to be ready
    if not wait_for_server():
        print("\nCannot connect to server. Make sure the backend is running:")
        print("   python start_backend.py")
        print("   or")
        print("   cd backend && python app.py")
        sys.exit(1)

    # Run tests
    tests_passed = 0
    total_tests = 3

    if test_health_endpoint():
        tests_passed += 1

    if test_classification_endpoint():
        tests_passed += 1

    if test_model_info_endpoint():
        tests_passed += 1

    # Print results
    print("\n" + "=" * 45)
    print(f"Test Results: {tests_passed}/{total_tests} tests passed")

    if tests_passed == total_tests:
        print("All tests passed! The API is working correctly.")
        return True
    else:
        print("Some tests failed. Please check the server logs.")
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
