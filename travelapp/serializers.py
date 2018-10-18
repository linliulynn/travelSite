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
    owner = serializers.PrimaryKeyRelatedField
    class Meta:
        model = Journey
        fields = '__all__'

    def create(self, validated_data):
        owner = validated_data['owner']
        user = UserSerializer(owner)
        journey = Journey(
            journey_img = validated_data['journey_img'],
            latitude = validated_data['latitude'],
            longitude = validated_data['longitude'],
            description = validated_data['description'],
            owner = validated_data['owner']
        )
        journey.save()
        return journey

