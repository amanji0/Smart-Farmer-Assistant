"""
Plant Disease Detection Model Training Script (Multi-Dataset Merge)
===================================================================
This script is designed to run on Kaggle. It allows you to merge multiple 
huge datasets (like the 54k PlantVillage + 87k New Plant Diseases) into a single 
mega-dataset for training, without duplicating files!

INSTRUCTIONS FOR KAGGLE:
1. Create a Kaggle Notebook.
2. Click "Add Input" and add BOTH datasets:
   - Search & Add: "PlantVillage Dataset"
   - Search & Add: "New Plant Diseases Dataset"
3. Paste this code into a cell.
4. Turn on the GPU (Accelerator -> GPU) and Run the cell!
"""

import os
import json
import shutil
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator # type: ignore
from tensorflow.keras.applications import MobileNetV2 # type: ignore
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout # type: ignore
from tensorflow.keras.models import Model # type: ignore
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau # type: ignore

# ─── Configuration ───
# List the paths to all the datasets you added to Kaggle.
# Ensure the paths point to the directory containing the class folders (e.g. 'Apple___healthy').
DATASET_DIRS = [
    "/kaggle/input/plantvillage-dataset/color",
    "/kaggle/input/new-plant-diseases-dataset/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train"
]

# We will combine them into this temporary folder
COMBINED_DIR = "/kaggle/working/combined_dataset"
OUTPUT_MODEL_NAME = "disease_model.h5"
OUTPUT_CLASSES_NAME = "class_indices.json"

IMG_SIZE = (224, 224)
BATCH_SIZE = 64 # Increased for larger dataset
EPOCHS = 20

def merge_datasets(dataset_paths, output_dir):
    """
    Creates a unified dataset by creating symbolic links from multiple Kaggle 
    input directories into a single working directory. This avoids copying GBs of data!
    """
    print(f"🔗 Merging {len(dataset_paths)} datasets into {output_dir}...")
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)
    
    total_images = 0
    
    for d_path in dataset_paths:
        if not os.path.exists(d_path):
            print(f"⚠️ WARNING: Path not found: {d_path}. Skipping.")
            continue
            
        print(f"Scanning {d_path}...")
        for class_name in os.listdir(d_path):
            class_dir = os.path.join(d_path, class_name)
            if not os.path.isdir(class_dir): continue
            
            # Create the class folder in the combined directory if it doesn't exist
            out_class_dir = os.path.join(output_dir, class_name)
            os.makedirs(out_class_dir, exist_ok=True)
            
            # Create symlinks for every image
            for img_file in os.listdir(class_dir):
                if not img_file.lower().endswith(('.png', '.jpg', '.jpeg')): continue
                
                src = os.path.join(class_dir, img_file)
                # Ensure unique filename to prevent overwriting when merging
                dst = os.path.join(out_class_dir, f"{os.path.basename(d_path)}_{img_file}")
                
                try:
                    os.symlink(src, dst)
                    total_images += 1
                except FileExistsError:
                    pass
                    
    print(f"✅ Successfully merged! Total training images available: {total_images}")
    return output_dir

def build_model(num_classes):
    print(f"Building MobileNetV2 Base Model for {num_classes} classes...")
    base_model = MobileNetV2(
        weights='imagenet', 
        include_top=False, 
        input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)
    )
    
    # Freeze the base model to train only the top layers first
    base_model.trainable = False
    
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def main():
    print("Step 1: Merging Datasets...")
    final_dataset_path = merge_datasets(DATASET_DIRS, COMBINED_DIR)
    
    # Check if merge was successful
    if not os.path.exists(final_dataset_path) or len(os.listdir(final_dataset_path)) == 0:
        print("❌ Error: No data found to train on. Check your DATASET_DIRS paths.")
        return

    print("\nStep 2: Initializing Data Generators with Augmentation...")
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.1,
        height_shift_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        validation_split=0.2 
    )

    train_generator = train_datagen.flow_from_directory(
        final_dataset_path,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    validation_generator = train_datagen.flow_from_directory(
        final_dataset_path,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    # Save class indices
    class_indices = {v: k for k, v in train_generator.class_indices.items()}
    with open(OUTPUT_CLASSES_NAME, "w") as f:
        json.dump(class_indices, f, indent=4)
    print(f"✅ Saved class mapping to {OUTPUT_CLASSES_NAME}")

    callbacks = [
        ModelCheckpoint(OUTPUT_MODEL_NAME, monitor='val_accuracy', save_best_only=True, verbose=1),
        EarlyStopping(monitor='val_accuracy', patience=4, restore_best_weights=True),
        ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, min_lr=1e-6)
    ]

    model = build_model(train_generator.num_classes)
    
    print("\n🚀 Starting Mega-Training on Combined Datasets...")
    history = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=validation_generator,
        callbacks=callbacks
    )

    print(f"\n🎉 Training Complete! The best model is saved as: {OUTPUT_MODEL_NAME}")
    print("Download this file and place it in ai-ml/models/ in your project!")

if __name__ == "__main__":
    main()
