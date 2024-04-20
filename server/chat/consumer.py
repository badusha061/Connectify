import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from chat.models import Conversation , Message

class Chat(AsyncWebsocketConsumer):
    def connect(self):
        print('connected')
        return super().connect()
    
    def disconnect(self, code):
        print('disconnected')
        return super().disconnect(code)
    


    