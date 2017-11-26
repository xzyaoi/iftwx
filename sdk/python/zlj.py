import requests
import json
class Zhulijun(object):
    def __init__(self, channelId):
        self.channelId = channelId
    def send():
        pass 

payload = {'title': 'TensorFlow消息提醒', 'sender': 'TensorFlow','content':'Epoch:1 loss=7.960 acc=0.499'}
headers = {'content-type': 'application/json'}
r = requests.post("https://zt-webhook.herokuapp.com/sdk/Pgq6uMTRBX", data=json.dumps(payload))
print(r.text)