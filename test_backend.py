import requests
import time
import sys

def test_api():
    url = "http://localhost:8000/analyze"
    files = {'file': open('test_audio.wav', 'rb')}
    
    print("Waiting for server...")
    for _ in range(10):
        try:
            requests.get("http://localhost:8000/")
            break
        except:
            time.sleep(1)
            print(".", end="", flush=True)
    print("\nServer is up!")

    print("Sending request...")
    try:
        response = requests.post(url, files=files)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    test_api()
