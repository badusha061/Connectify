from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    image = models.ImageField (upload_to="userProfile", blank=True, null=True)


    def __str__(self) -> str:
        return self.user.username
    


