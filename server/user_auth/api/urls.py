from django.urls import path
from .views import * 
from rest_framework_simplejwt.views import (
   TokenRefreshView,
)
urlpatterns = [
    path('token', CustomerTokenObtainPairView.as_view(), name='access-token'),
    path('token/refersh', TokenRefreshView.as_view(), name='refersh-token'),
    path('profile/<int:pk>/', UserProfile.as_view(), name='userProfile'),
    path('user', UserGet.as_view(), name='get-all-user'),
    path('test', Test.as_view(), name='test')
]

