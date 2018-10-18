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