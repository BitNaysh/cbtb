from db import conn,encodedImageDB,encodedImageCol
import os
from pathlib import Path
import face_recognition

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

print(BASE_DIR)
os.chdir(os.path.join(BASE_DIR,  "mediafiles", "train_images"))
files = os.listdir()

for file in files:
    print(file)
    try:
        image = face_recognition.load_image_file(file)
        image_encoding = face_recognition.face_encodings(image) # ([], [])
        encodedImageCol.insert_one({
            "filename": file,
            "image_encoding": list(image_encoding[0])
        })
    except IndexError:
        continue