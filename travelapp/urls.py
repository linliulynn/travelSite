from django.urls import path
from . import views
from django.conf.urls import url, include
from rest_framework import routers, generics
from rest_framework.urlpatterns import format_suffix_patterns
# from .views import UserViewSet
from .views import *
# router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)

# urlpatterns = [
#     # path('', views.index, name='index')
#     url(r'^', include(router.urls)),
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]

# urlpatterns=format_surfix_patterns(urlpatterns)

urlpatterns = [
    # path('', views.index, name='index')
    url(r'^users/$', UserList.as_view()),
    url(r'^users/login/$', LoginView.as_view()),
    url(r'^journeys/$',JourneyList.as_view()),
    url(r'^friends/$', FriendList.as_view()),
    url(r'friends/[0-9]+/$', FriendDetail.as_view()),
    url(r'^chats/$', ChatList.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns=format_suffix_patterns(urlpatterns)