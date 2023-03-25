from fileinput import filename
import re
from django.shortcuts import render

from face_recog.models import TrainMedia
from face_recog.views import TrainMediaSerializer
from .models import Media
from rest_framework import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import requests

import face_recognition
import os
from config_mongo.db import conn
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


def get_valid_indices(results):
    indices = []
    for i in range(len(results)):
        if results[i] < 0.6:
            indices.append(i)
    return indices


def face_recog(filename):
    path = os.path.join(BASE_DIR, "mediafiles", "images", filename)
    image = face_recognition.load_image_file(path)
    try:
        image_encoding = face_recognition.face_encodings(image)[0]
        collection = list(map(lambda x: {
                        "filename": x['filename'], "image_encoding": x['image_encoding']}, conn.encodedImageDB.encodedImage.find({})))
        know_image_encodings = [np.array(item['image_encoding'])
                                for item in collection]
        results = list(face_recognition.face_distance(
            know_image_encodings, image_encoding))
        print(results)
    
        indices = get_valid_indices(results)
        return [{"filename": collection[index]["filename"], "tolerance": results[index]} for index in indices]
    except ValueError:
        return 
    except IndexError:
        return 


class MyModelSerializer(serializers.ModelSerializer):

    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Media
        fields = ['id', 'title', 'text',
                  'filename', 'description', 'image_url']
        read_only_fields = ('text', 'image_url', 'filename')
        # extra_kwargs = {
        #     'security_question': {'write_only': True},
        #     'security_question_answer': {'write_only': True},
        #     'password': {'write_only': True}
        # }


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.order_by('-creation_date')
    serializer_class = MyModelSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        print(serializer.data)
        filename = serializer.data["filename"]
        results = face_recog(filename)
        headers = self.get_success_headers(serializer.data)

        if results:
            print(results)
            matched_people = []
            for result in results:
                trainMedia = TrainMedia.objects.get(filename=result['filename'])
                matched_people.append(
                    {**TrainMediaSerializer(trainMedia).data, "tolerance": result["tolerance"]})

            return Response({**serializer.data, "matched_people": matched_people}, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({**serializer.data, "matched_people": []}, status=status.HTTP_201_CREATED, headers=headers)



    def perform_create(self, serializer):
        serializer.save()
