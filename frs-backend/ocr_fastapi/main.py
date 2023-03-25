from fileinput import filename
from typing import Union
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import os
from pathlib import Path

import pytesseract
import PIL.Image


BASE_DIR = os.path.dirname(os.path.dirname(__file__))

print("Run Main")


app = FastAPI()


@app.get("/health-check")
def read_root():
    return {"message": "OK"}


class GetTextFromImageInput(BaseModel):
    filename: str


@app.post("/get_text_from_image")
def get_ocr_result(input: GetTextFromImageInput):
    path = os.path.join(BASE_DIR, "mediafiles", "images", input.filename)
    myconfig = r"--psm 3 --oem 3"
    # face recog
    text = pytesseract.image_to_string(
        PIL.Image.open(path), config=myconfig)
    return {"result": text}


if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, reload=True)
