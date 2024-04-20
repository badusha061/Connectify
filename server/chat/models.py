from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

class Conversation(models.Model):
        initiator = models.ForeignKey(User , related_name='convo_start', on_delete=models.CASCADE)
        receiver = models.ForeignKey(User , related_name='convo_participant', on_delete=models.CASCADE)
        start_time = models.DateTimeField( auto_now_add=True)


        def __str__(self) -> str:
                return f"sender {self.initiator.username} , reciver {self.receiver.username}"



class Message(models.Model):
        sender = models.ForeignKey(User, related_name='messge_sender', on_delete=models.CASCADE,null=True)
        text = models.CharField(max_length=200,blank=True)
        document = models.FileField(upload_to='chat/documents',blank=True)
        conversation_id = models.ForeignKey(Conversation, related_name='conversation', on_delete = models.CASCADE)
        timestamp = models.DateTimeField(auto_now_add=True)
        image = models.ImageField(upload_to='chat/images', blank=True)
        seen = models.BooleanField(default=False)

        class Meta:
                ordering = ('-timestamp',)


        def __str__(self) -> str:
                return self.sender.username
        

        

class Notification(models.Model):
        user = models.ForeignKey(User , on_delete=models.CASCADE, related_name="notifications")
        message = models.ForeignKey(Message, on_delete=models.CASCADE)
        timestamp = models.DateTimeField(auto_now_add=True)
        is_read = models.BooleanField(default=False)

        class Meat:
                ordering = ('-timestamp',)


        def __str__(self) -> str:
                return self.user.username
        



