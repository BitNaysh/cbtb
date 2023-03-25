from urllib import response
from django.shortcuts import render
from .models import TrainMedia
from rest_framework import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import face_recognition
import os
from config_mongo.db import conn
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# path = os.path.join(BASE_DIR, "..", "mediafiles", "train_images", input.filename)
# print(path)


def face_recog_add_image(filename):
    path = os.path.join(BASE_DIR, "mediafiles", "train_images", filename)
    image = face_recognition.load_image_file(path)
    
    image_encoding = face_recognition.face_encodings(image)[0]
    conn.encodedImageDB.encodedImage.insert_one({
        "filename": filename,
        "image_encoding": list(image_encoding),
    })




class TrainMediaSerializer(serializers.ModelSerializer):

    image_url = serializers.ImageField(required=False)

    class Meta:
        model = TrainMedia
        fields = ['id', 'name', 'address', 'description',
                  'filename', 'image_url']
        read_only_fields = ('image_url', 'filename')


class TrainMediaViewSet(viewsets.ModelViewSet):
    queryset = TrainMedia.objects.order_by('-creation_date')
    serializer_class = TrainMediaSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # send request to fastapi server
        filename = serializer.data["filename"]
        headers = self.get_success_headers(serializer.data)
        try:
            face_recog_add_image(filename)
            return Response({**serializer.data, "person_added": True}, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response({**serializer.data, "person_added": False}, status=status.HTTP_201_CREATED, headers=headers)

        """ url = "http://127.0.0.1:8888/add_image"
        headers = self.get_success_headers(serializer.data) 

        try:
            res = requests.post(
            url, json={
                "filename": filename
            })
            print(res.content)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)  
        except:"""

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
