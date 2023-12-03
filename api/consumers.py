import json

from channels.generic.websocket import WebsocketConsumer



class Live_OANDA_DATA(WebsocketConsumer):
    def connect(self):
        print("TRYING TO CONNECT")
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        self.send(text_data=json.dumps({"message": message}))