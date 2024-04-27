import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from chat.models import Conversation , Message
from asgiref.sync import async_to_sync


class Chat(AsyncWebsocketConsumer):
    async def connect(self):
        print('connected')
        return super().connect()
    
    async def disconnect(self, code):
        print('disconnected')
        return super().disconnect(code)
    

    async def receive(self, text_data=None):
        if text_data == None:
            return False
        
        text_data_json = json.loads('text_data')
        text = text_data_json['json']
        sender = text_data_json['sender']
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': text,
                'sender': sender
            }
        )


        return await super().receive(text_data)
    

    async def chat_message(self,event):
        text = event["message"]
        sender = event["sender"]

        self.send(text_data=json.dump({
            'text':text,
            'sender':sender
        }))

    
    

    
    


    