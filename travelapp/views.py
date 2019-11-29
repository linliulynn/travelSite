import base64
import json
from django.http import HttpResponse
from rest_framework import status , generics , mixins , viewsets
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.views import APIView

from django.core.files.base import ContentFile
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login
from .serializers import *
from .models import *

def index(request):
    return HttpResponse("hello travelapp")

class UserList(generics.ListCreateAPIView):
    queryset=User.objects.all()   
    serializer_class=UserSerializer 

class LoginView(generics.GenericAPIView):
    queryset=User.objects.all()   
    serializer_class=UserSerializer

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

class JourneyList(generics.ListCreateAPIView):
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer

    # def post(self, request, format=None):
    # #     filename = request.data['journey_img']['filename'] 
    # #     print (filename)
    #     value = request.data
    # #     journey_img = ContentFile(value, filename)
    #     serializer = JourneySerializer(data=request.data)
         
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatList(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body.decode('utf-8'))
        chat_serializer = ChatSerializer(data=request.data)
        chat = chat_serializer.save()
        context = {'chat_id': chat.id}
        users = []
        for name in request.data['user_ids']:
            users.append(User.objects.get(username=name)['id'])
            chatUsers_serializer = ChatUsersSerializer()
    
    def get(self, request, format=None):
        chatusers = ChatUsers.objects.all()
        serializer_class = ChatUsersSerializer(chatusers, many=True)
        return Response(serializer_class.data)
        
class FriendList(APIView):

    def post(self, request, format=None):
        data = json.loads(request.body.decode('utf-8'))
        friend_serializer = FriendSerializer(data=request.data)
        if friend_serializer.is_valid():
            friend_serializer.save()
            return Response(friend_serializer.data, status=status.HTTP_201_CREATED)
        return Response(friend_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        friends = ChatClient.objects.all()
        serializer_class = FriendSerializer(friends, many=True)
        return Response(serializer_class.data)

class FriendDetail(APIView):

    def get(self, request, format=None):
        id = request.path.split('/')[-2]
        queryset = User.objects.filter(id = id)
        serializer = FriendDetailSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer.data)
