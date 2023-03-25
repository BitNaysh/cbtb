from typing import List
from rest_framework.generics import CreateAPIView, GenericAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes

from user.serializers import CustomUserRegistrationSerializer, CustomUserSerializer, CustomUserUpdateSerializer


from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserCreateView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # send email with refresh token


class CustomUserDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get(self, request):
        return Response(
            CustomUserSerializer(request.user).data
        )


class CustomUserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserUpdateSerializer
    http_method_names: List[str] = ['patch']

    def update(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            data = serializer.save()
            return Response(data)

        else:
            return Response({"message": "failed", "details": serializer.errors})
