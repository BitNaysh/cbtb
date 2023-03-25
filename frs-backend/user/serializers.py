from email.policy import default
from functools import partial
from importlib.metadata import requires
from operator import imod
from rest_framework import serializers
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class CustomUserUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)

    def validate(self, data):
        return data

    def update(self, instance, validated_data):
        self.is_valid(raise_exception=True)
        serializer = CustomUserSerializer(
            instance, data=validated_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.data


class CustomUserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=False)
    password = serializers.RegexField(
        regex=r'((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$', min_length=8, write_only=True)
    confirm_password = serializers.RegexField(
        regex=r'((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$', min_length=8, write_only=True)

    def validate_email(self, email):
        existing = User.objects.filter(email=email).first()
        if existing:
            raise serializers.ValidationError("Someone with that email "
                                              "address has already registered. Was it you?")
        return email

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError("Please enter a password and "
                                              "confirm it.")
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return data

    def create(self, validated_data):
        self.is_valid(raise_exception=True)
        serializer = CustomUserSerializer(data=validated_data)
        serializer.is_valid()
        serializer.save()
        return serializer.data
