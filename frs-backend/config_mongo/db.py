from pymongo import MongoClient

conn = MongoClient("mongodb://localhost:27017/")

encodedImageDB = conn["encodedImageDB"]
encodedImageCol = encodedImageDB["encodedImage"]

