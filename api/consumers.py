import json
import requests
from channels.generic.websocket import WebsocketConsumer



class Live_OANDA_DATA(WebsocketConsumer):
    def connect(self):
        print("TRYING TO CONNECT")

        self.oanda_stream()

        self.accept()

        

    def oanda_stream(self):

        base_url = "https://stream-fxpractice.oanda.com/v3/accounts/101-001-24608229-001/pricing/stream"
        params = {
            "instruments" : "USD_NOK"
        }
        payload = {}
        headers = {
            'Authorization': 'Bearer 5df72a7b015f65d651bb94b5c3debf17-4f936395133828cfc5c83d8b2220d062',
        }

        #response = requests.request("GET", base_url, headers=headers, params=params)

        #print(response.text)

        s = requests.Session()

        with s.get(base_url, params=params, headers=headers, stream=True) as resp:
            for line in resp.iter_lines():
                if line:
                    print(line)
                    self.close(close_code="Fuck it")
                    pass

    def disconnect(self, close_code):
        print("Disconnect")

        return super().disconnect(close_code)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["HELLO FRONTEND"]

        self.send(text_data=json.dumps({"message": message}))
    
    def send(self, text_data=None, bytes_data=None, close=False):
        text_data = "{ 'rules' : SENDING DATA}"
        print(text_data)
        return super().send(text_data, bytes_data, close)