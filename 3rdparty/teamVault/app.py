# coding: utf-8

from datetime import datetime
from flask import Flask
from flask import request
import json
import requests
import uuid
import time
import hvac
app = Flask(__name__)

@app.route('/',methods=['GET'])
def basefunction():
    return 'Welcome'

# ZTodo Webhook
@app.route('/ztodo', methods=['POST'])
def ztodo_hook():
    return ''

# Smart Circle Webhook
@app.route('/mc', methods=['POST'])
def mcircle_hook():
    return ''

# SDK Webhook
@app.route('/sdk/<string:channelId>', methods=['POST'])
def sdk_hook(channelId):
    if request.method == 'POST':
        print ('Got request:', request.data)
        data = json.loads(request.data)
        info = {
            "first":{
                "value":data['title']
            },
            "keyword1":{
                "value":data['sender']
            },
            "keyword2":{
                "value":data['content']
            },
            "keyword3":{
                "value":time.strftime("%Y-%m-%d %H:%M:%S")
            },
            "remark":{
                "value":"请注意查看"
            }
        }
        content = json.dumps(info,ensure_ascii=False,indent=2)
        r=requests.post("http://wechat.zhitantech.com/send",{"appid":"dLy5IeZT9H","channelid":channelId,"content":content,"url":"https://blog.zhitantech.com"})
    return ''