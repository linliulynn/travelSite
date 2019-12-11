from django.db import models
from django.contrib.auth.models import User
# from django.core.validators import EmailValidator

# Create your models here.
# class User(models.Model):
#     user_name = models.CharField(max_length=20, unique=True)
#     user_email = models.EmailField()
#     password = models.CharField(max_length=25,)

#     def __str__(self):
#         return self.user_name

class Journey(models.Model):
    journey_img = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    description = models.CharField(max_length=100)
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    
class Chat(models.Model):
    created_at = models.DateTimeField()

class ChatUsers(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatuser_set')
    chat_id = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat_set')

class Message(models.Model):
    chat_id = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat_set')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message_set')
    created_at = models.DateTimeField()
    content = models.TextField()

class ChatClient(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_set')
    friend_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_set')