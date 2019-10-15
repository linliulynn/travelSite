from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
import json
from datetime import datetime

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

# class ChatSerializer(serializers.Serializer):
#     def create(self, validated_data):
#         chat = Chat(
#             created_at = datetime.now()
#         )
#         chat.save()
#         return chat

# class ChatClientSerializer(serializers.Serializer):
#     def create(self, valiated_data):
#         chat_id = self.context['chat_id']
#         chats = ChatClient.objects.create(chat_id=chat_id)
#         chats.save()
#         user_id = self.context['user_id']
#         chats.user_id.add(*user_id)
#         chats.save()
#         return chats
