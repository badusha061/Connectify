from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class ChatBoat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.TimeField(auto_now_add=True)


    def __str__(self) -> str:
        return self.user.username