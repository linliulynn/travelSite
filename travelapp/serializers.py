from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
import json
from datetime import datetime
from django.utils import timezone

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

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatClient
        fields = ['user_id', 'friend_id']

    def creat(self, validated_data):
        friend = ChatClient(
            user_id = validated_data['user_id'],
            friend_id = validated_data['friend_id']
        )
        friend.save()
        return friend

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class FriendRetrieveSerializer(serializers.ModelSerializer):
    friend_id = UserNameSerializer(many=False, read_only=True)
    class Meta:
        model = ChatClient
        fields = ['user_id', 'friend_id']

class FriendDetailSerializer(serializers.ModelSerializer):
    user_set = FriendRetrieveSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'user_set']

class ChatSerializer(serializers.Serializer):
    def create(self, validated_data):
        chat = Chat(
            created_at = timezone.now()
        )
        chat.save()
        return chat

class ChatUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatUsers
        fields = ['user_id', 'chat_id']

    def create(self, valiated_data):
        user_id = valiated_data['user_id']
        chat_id = valiated_data['chat_id']
        chatuser = ChatUsers(
            user_id_id = user_id,
            chat_id_id = chat_id
        )
        chatuser.save()
        return chatuser
