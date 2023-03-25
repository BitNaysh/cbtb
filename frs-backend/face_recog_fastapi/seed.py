import pymongo
import os
import face_recognition as fr

CWD_Path = os.getcwd()
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

client = pymongo.MongoClient("localhost", 27017)
client.face_recognition.train_images.delete_many({})
print("deleted all")

path = os.path.join(CWD_Path, "..", "mediafiles", "train_images")
os.chdir(path)

for file in os.listdir():
    image = fr.load_image_file(file)
    image_encoding = fr.face_encodings(image)

    if not len(image_encoding):
        print(image_encoding[0][:5])
        client.face_recognition.train_images.insert_one(
            {
                "filename": file,
                "image_encoding": list(image_encoding[0])
            }
        )
