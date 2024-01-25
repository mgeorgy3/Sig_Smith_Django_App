import json
import requests
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

import pprint as pp


class Live_OANDA_DATA(WebsocketConsumer):
    
    def connect(self):
        print("TRYING TO CONNECT")

        self.Please_Close = False


        self.accept()
        self.oanda_stream()
        

        


    def oanda_stream(self):

        print("IN OANDA STREAM")

        base_url = "https://stream-fxpractice.oanda.com/v3/accounts/101-001-24608229-001/pricing/stream"
        params = {
            "instruments" : "USD_NOK"
        }
        payload = {}
        headers = {
            'Authorization': 'Bearer 5df72a7b015f65d651bb94b5c3debf17-4f936395133828cfc5c83d8b2220d062',
        }

        #response = requests.request("GET", base_url, headers=headers, params=params)

        #print("WTF")

        #print(response)

        s = requests.Session()

        while True:
            resp = s.get(base_url, params=params, headers=headers, stream=True)
            if self.Please_Close:
                s.close()
                break
            for line in resp.iter_lines():
                if line:
                    print("Type of Line", type(line))
                    self.send(OANDA_Output=line)


        # with s.get(base_url, params=params, headers=headers, stream=True) as resp:
            
        #     for line in resp.iter_lines():
        #         if self.Please_Close:
        #             s.close()
        #             break
        #         if line:
        #             print("Type of Line", type(line))
        #             self.send(OANDA_Output=line)
        
        #s.close()
    
        self.send("I Really Want this to work")
        

    
    def disconnect(self, close_code):
        print("Disconnect")

        return super().disconnect(close_code)
    

    def receive(self, text_data = None, bytes_data = None):
        self.Please_Close = True

        print("SOMETHING WAS RECIEVED")
        text_data_json = json.loads(text_data)
        print("SOMETHING WAS RECIEVED", text_data_json)
        self.Please_Close = True

        #self.send(text_data=json.dumps({"message": message}))
    
    def send(self, OANDA_Output):
        #text_data = "{ 'rules' : SENDING DATA}"
        print(type(OANDA_Output))
        Output_Text = json.loads(OANDA_Output)
        json_data = json.dumps(Output_Text)
        pp.pprint(Output_Text)
        #print("Output", OANDA_Output)
        super().send(text_data=json_data)
        
