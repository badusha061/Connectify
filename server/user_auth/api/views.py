from .serializer import UserSerializer , CustomerTokenObtainPairSerialzer , UserProfileSerialzer
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from user_auth.models import Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED

class UserRegistration(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()



class CustomerTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomerTokenObtainPairSerialzer



class UserProfile(APIView):
    def post(self, *args, **kwargs):
        user_instance = User.objects.get(id = self.kwargs['userid'])
        print('the user instance',user_instance)
        profile_instance = Profile.objects.get_or_create(user = user_instance)
        return Response(status= HTTP_201_CREATED)