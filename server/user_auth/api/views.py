from .serializer import UserSerializer , CustomerTokenObtainPairSerialzer , UserProfileSerialzer
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView , ListAPIView , UpdateAPIView , RetrieveUpdateAPIView
from user_auth.models import Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
import os
from bardapi import Bard
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai 
import re
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated , AllowAny
from django.shortcuts import get_object_or_404

class UserRegistration(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()



class CustomerTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomerTokenObtainPairSerialzer



# @permission_classes(IsAuthenticated)
class UserProfile(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerialzer
    queryset = Profile.objects.all()
    def get_object(self):
            user_intance = self.kwargs['pk']
            return Profile.objects.get(user = user_intance)
    

# @permission_classes(IsAuthenticated)
class UserGet(ListAPIView):
    serializer_class = UserProfileSerialzer
    queryset = Profile.objects.all()



    

class Test(APIView):
    def get(self,*args, **kwargs):
        
        GEMINI_API_KEY ="AIzaSyAb_IrNzZ_zjxAS6b0jVV5s9mx86YF8FUc"
        genai.configure(api_key = GEMINI_API_KEY)
        generation_config = {"temperature":0.9, "top_p":1,"top_k":1,"max_output_tokens":2048}

        model = genai.GenerativeModel(("gemini-pro"), generation_config = generation_config)

        response = model.generate_content(["how to make tea"])
        cleaned_response = re.sub(r'\*|\n', ' ', response.text)

        print(cleaned_response)

        return Response(data=cleaned_response)

        