import os
import json
import tensorflow as tf
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D # type: ignore
from tensorflow.keras.applications import MobileNetV2 # type: ignore
from tensorflow.keras.models import Model # type: ignore

def generate_placeholder():
    # The 38 PlantVillage Classes
    classes = [
        "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
        "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
        "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
        "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
        "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
        "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
        "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
        "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
        "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
        "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
        "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
    ]

    # Save class indices
    class_indices = {c: str(i) for i, c in enumerate(classes)}
    with open("ai-ml/models/class_indices.json", "w") as f:
        json.dump(class_indices, f, indent=4)

    print("Building dummy MobileNetV2...")
    base_model = MobileNetV2(weights=None, include_top=False, input_shape=(224, 224, 3))
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    predictions = Dense(38, activation='softmax')(x)
    model = Model(inputs=base_model.input, outputs=predictions)
    
    print("Saving dummy model...")
    model.save("ai-ml/models/disease_model.h5")
    print("Done!")

if __name__ == "__main__":
    generate_placeholder()
