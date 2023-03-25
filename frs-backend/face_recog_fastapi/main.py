from site import abs_paths
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from pathlib import Path
import face_recognition
from config_mongo.db import conn,encodedImageCol
from schemas_mongo.schemaEncodingDB import serializeDict,serializeList
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

""" 
print(BASE_DIR)
os.chdir(os.path.join(BASE_DIR, "..", "mediafiles", "train_images"))
files = os.listdir()

files_dict = []
 """
""" for file in files:
    print(file)
    try:
        image = face_recognition.load_image_file(file)
        image_encoding = face_recognition.face_encodings(image)[0]
        files_dict.append({
            "image": image,
            "image_encoding": image_encoding,
            "filename": file
        })
    except IndexError:
        continue """


# print(files)
# loop through all the known images get encoding -> Array


app = FastAPI()


@app.get("/health-check")
def read_root():
    return {"message": "OK"}


class MatchPersonInput(BaseModel):
    filename: str


@app.post("/match_person")
def get_ocr_result(input: MatchPersonInput):
    path = os.path.join(BASE_DIR, "..", "mediafiles", "images", input.filename)
    print(path)
    image = face_recognition.load_image_file(path)
    image_encoding = face_recognition.face_encodings(image)[0]
    collection =map(lambda x: {"filename": x['filename'], "image_encoding": x['image_encoding'] },conn.encodedImageDB.encodedImage.find({})) 
    know_image_encodings = [np.array(item['image_encoding']) for item in collection ]
    results = face_recognition.compare_faces(
        know_image_encodings, image_encoding
    )
    print(results)
    try:
        index = results.index(True)
<<<<<<< HEAD
        print(files_dict[index]["filename"])
        return {"result": files_dict[index]["filename"]}
    except ValueError:
        raise HTTPException(status_code=404, detail="Person not found")


@app.post("/add_image")
=======
        return {"result": conn.encodedImageDB.encodedImage[index]["filename"]}
    except ValueError:
        raise HTTPException(status_code=404, detail="Person not found")

""" @app.post("/add_image")
>>>>>>> d3be5ab6f6f9c16949bcbe18deb2d9713b47fb47
def add_image(input: MatchPersonInput):
    image = face_recognition.load_image_file(input.filename)
    image_encoding = face_recognition.face_encodings(image)[0]
    files_dict.append({
        "image": image,
        "image_encoding": image_encoding,
        "filename": input.filename
    })
    # print(files_dict[-1])
    return {"message": "image added"} """

@app.post("/add_image")
def add_image(input: MatchPersonInput):
    image = face_recognition.load_image_file(input.filename)
    image_encoding = face_recognition.face_encodings(image)[0]
    encodedImageCol.insert_one({
        "filename": input.filename,
        "image_encoding": image_encoding,
    })
    # print(files_dict[-1])
    return {"message": "image added"} 

# if __name__ == "__main__":
#     uvicorn.run("main:app", port=8888, reload=True)

# uvicorn face_recog_fastapi.main:app --reload --port 8888
# uvicorn main:app --reload --port 8888
