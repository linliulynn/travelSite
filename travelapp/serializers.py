from django.contrib.auth.models import User
from rest_framework import serializers
import json

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
