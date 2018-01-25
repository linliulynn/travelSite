# from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status , generics , mixins , viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User 
from .serializers import *

def index(request):
    return HttpResponse("hello travelapp")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def perform_create(self, serializer):
    #     console.log(self.request.data)     
    #     serializer.save(user=self.request.user)

        