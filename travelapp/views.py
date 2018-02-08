import json
from django.http import HttpResponse
from rest_framework import status , generics , mixins , viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login
from .serializers import *

def index(request):
    return HttpResponse("hello travelapp")

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

    # @detail_route(methods=['post'])
    # def sign_in(self, request, pk=None):
    #     user = UserSerializer(data=request.data)
    #     if (user in User.objects.all()):
    #         return Response({'status': 'user find'})
    #     else:
    #         return Response(user.errors,
    #                         status=status.HTTP_400_BAD_REQUEST)

class UserList(generics.ListCreateAPIView):
    queryset=User.objects.all()   
    serializer_class= UserSerializer     

class LoginView(generics.GenericAPIView):
    queryset=User.objects.all()   
    serializer_class= UserSerializer

    def post(self, request, format=None):
        data =json.loads(request.body.decode('utf-8'))

        username = data.get('username',None)
        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(username=username,email=email,password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                serializer = UserSerializer(user)

                return Response(serializer.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)