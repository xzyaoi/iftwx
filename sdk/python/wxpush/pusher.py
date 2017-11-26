import requests
import json
class Pusher():
    def __init__(self, channelId, sender):
        self.channelId = channelId
        self.sender = sender
    def send(self, title, content):
        payload = {'title': title, 'sender': self.sender,'content':content}
        headers = {'content-type': 'application/json'}
        r = requests.post("https://zt-webhook.herokuapp.com/sdk/"+self.channelId, data=json.dumps(payload))
        return r