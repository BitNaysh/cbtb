from user.serializers import CustomUserSerializer
import email
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import AccessToken


# verify email route

User = get_user_model()


class VerifyUserEmailSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)


class VerifyUserEmailView(GenericAPIView):
    serializer_class = VerifyUserEmailSerializer

    def post(self, request, format=None):
        serializer = VerifyUserEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = "admin@example.com"
            user = User.objects.get(email=email)
            if user:
                user.is_active = True
                user.save()
                return Response(
                    CustomUserSerializer(user).data
                )
            else:
                return Response(
                    {"message": f"user with the id {request.data['user_id']} does not exist"},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {"message": "failed", "details": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
