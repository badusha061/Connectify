from rest_framework.serializers import ModelSerializer
from rest_framework  import serializers 
from django.contrib.auth.models import User  
from user_auth.models import Profile
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re 



class UserSerializer(ModelSerializer):
    password1 = serializers.CharField(
        write_only = True,
        min_length = settings.MIN_PASSWORD_LENGTH,
        error_messages = {
            "min_length":"password must be longer than {} characters".format(
                settings.MIN_PASSWORD_LENGTH
            )
        }
    )

    password2 = serializers.CharField(
        write_only = True,
        min_length = settings.MIN_PASSWORD_LENGTH,
        error_messages = {
            "min_length":"password must be longer than {} characters".format(
                settings.MIN_PASSWORD_LENGTH
            )
        }
    )
    password_pattern = r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"

    
    
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password1",
            "password2"
        )
        read_only_fields = ["id"]

    def validate(self , data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("passsword do not match")
        
        if not re.match(self.password_pattern, data["password1"]):
            raise serializers.ValidationError("password Must be strong")
        
        if len(data["username"])  < 3:
            raise serializers.ValidationError("Username must be 3 character")
        
        if len(data["username"]) > 20:
            raise serializers.ValidationError("Username cannot be more than 20 character")

        return data
    
    def create(self , validated_data):
        user = User(
            username = validated_data["username"],
        )
        user.set_password(validated_data["password1"])
        user.save()
        Profile.objects.create(user = user)
        return user


class CustomerTokenObtainPairSerialzer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_admin'] =user.is_superuser
        token['id'] = user.id
        token['username'] = user.username
        token['is_active'] = user.is_active
        return token
    

class UserProfileSerialzer(ModelSerializer):
    user  = UserSerializer()
    class Meta:
        model = Profile
        fields = ['id','user','image']
