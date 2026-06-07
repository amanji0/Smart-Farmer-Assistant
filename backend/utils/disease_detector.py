import os
import json
import numpy as np
from PIL import Image
import io

try:
    import tensorflow as tf
    from tensorflow.keras.models import load_model # type: ignore
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "ai-ml", "models")
DISEASE_MODEL_PATH = os.path.join(MODEL_DIR, "disease_model.h5")
CLASS_INDICES_PATH = os.path.join(MODEL_DIR, "class_indices.json")

# Dictionary fallback for treatments (to decouple ML from domain knowledge)
DISEASE_INFO = {
    'Tomato___Septoria_leaf_spot': {'treatment': 'Apply copper-based fungicide every 7-10 days.', 'prevention': 'Avoid overhead watering. Rotate crops annually.'},
    'Potato___Late_blight': {'treatment': 'Apply mancozeb or chlorothalonil fungicide.', 'prevention': 'Plant certified disease-free seed potatoes.'},
    'Corn_(maize)___Common_rust_': {'treatment': 'Apply triazole-based fungicide at early infection stage.', 'prevention': 'Plant resistant hybrid varieties.'},
    'Tomato___healthy': {'treatment': 'No treatment needed.', 'prevention': 'Maintain current good practices.'},
    # ... we will provide a generic fallback for others below
}

class DiseaseDetector:
    def __init__(self):
        self.model = None
        self.class_indices = {}
        self.index_to_class = {}
        self.load_artifacts()

    def load_artifacts(self):
        if not TF_AVAILABLE:
            print("⚠️ TensorFlow not installed. DiseaseDetector disabled.")
            return

        if os.path.exists(DISEASE_MODEL_PATH):
            try:
                self.model = load_model(DISEASE_MODEL_PATH)
                print("✅ Disease model loaded successfully.")
            except Exception as e:
                print(f"⚠️ Error loading disease model: {e}")

        if os.path.exists(CLASS_INDICES_PATH):
            try:
                with open(CLASS_INDICES_PATH, "r") as f:
                    self.class_indices = json.load(f)
                    # Kaggle flow_from_directory gives { "class_name": index }
                    # We need { index: "class_name" }
                    if isinstance(list(self.class_indices.values())[0], int):
                        self.index_to_class = {v: k for k, v in self.class_indices.items()}
                    else:
                        # Fallback if indices are strings
                        self.index_to_class = {int(v): k for k, v in self.class_indices.items()}
            except Exception as e:
                print(f"⚠️ Error loading class indices: {e}")

    def predict(self, image_bytes: bytes) -> dict:
        if not self.model or not self.index_to_class:
            return {
                "disease": "System Initialization Error",
                "confidence": 0.0,
                "treatment": "Model not loaded.",
                "prevention": "Please ensure the .h5 model and class_indices.json are present."
            }

        try:
            # Preprocess image
            image = Image.open(io.BytesIO(image_bytes))
            image = image.convert("RGB")
            image = image.resize((224, 224))
            
            # Convert to array and normalize
            img_array = np.array(image) / 255.0
            img_array = np.expand_dims(img_array, axis=0) # Add batch dimension
            
            # Predict
            predictions = self.model.predict(img_array)
            class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][class_idx]) * 100
            
            disease_class = self.index_to_class.get(class_idx, "Unknown")
            
            # Format the display name (e.g., "Tomato___Early_blight" -> "Tomato: Early Blight")
            display_name = disease_class.replace("___", ": ").replace("_", " ")
            
            info = DISEASE_INFO.get(disease_class, {
                'treatment': 'Consult a local agricultural expert for targeted fungicide recommendations.',
                'prevention': 'Ensure proper spacing, crop rotation, and avoid overhead watering.'
            })

            # Check if it's healthy
            if "healthy" in disease_class.lower():
                info['treatment'] = "No treatment necessary! Your crop looks healthy."
                info['prevention'] = "Continue maintaining good agricultural practices."

            return {
                "disease": display_name,
                "confidence": round(confidence, 2),
                "treatment": info['treatment'],
                "prevention": info['prevention'],
                "raw_class": disease_class
            }
        except Exception as e:
            print(f"Prediction Error: {e}")
            return {
                "disease": "Analysis Failed",
                "confidence": 0.0,
                "treatment": f"Error parsing image: {str(e)}",
                "prevention": "Try uploading a clearer photo."
            }

# Singleton instance
detector = DiseaseDetector()
