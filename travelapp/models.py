from django.db import models
from django.core.validators import EmailValidator

# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=20, unique=True)
    user_email = models.EmailField()
    password = models.CharField(max_length=25,)

    def __str__(self):
        return self.user_name