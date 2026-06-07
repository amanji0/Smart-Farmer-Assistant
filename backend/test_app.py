from fastapi.testclient import TestClient
from main import app
client = TestClient(app)
print("App loaded successfully!")
