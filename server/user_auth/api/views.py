from .serializer import UserSerializer , CustomerTokenObtainPairSerialzer
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView



class UserRegistration(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CustomerTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomerTokenObtainPairSerialzer
    

