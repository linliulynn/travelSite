from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
import json

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey
        fields = '__all__'

