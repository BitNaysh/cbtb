import face_recognition 
import os
from db import conn
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
import numpy as np

# path = os.path.join(BASE_DIR, "..", "mediafiles", "images", input.filename)
# print(path)
def face_recog(filename):
    image = face_recognition.load_image_file(filename)
    image_encoding = face_recognition.face_encodings(image)[0]
    collection =map(lambda x: {"filename": x['filename'], "image_encoding": x['image_encoding'] },conn.encodedImageDB.encodedImage.find({})) 
    know_image_encodings = [np.array(item['image_encoding']) for item in collection ]
    results = face_recognition.compare_faces(
        know_image_encodings, image_encoding
    )
    return results