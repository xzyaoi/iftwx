# coding: utf-8

from datetime import datetime
from flask import Flask
from flask import request
import json
import requests
import uuid

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

# Coding Webhook
@app.route('/coding/<string:channelId>',methods=['POST'])
def coding_hook(channelId):
    if request.method =='POST':
        print ('Got request', request.data)
        data = json.loads(request.data)
        event = request.headers['X-Coding-Event']
        if event =='PUSH':
            print ('push')
    return ''

# Github Webhook
@app.route('/github/<string:channelId>',methods=['POST'])
def github_hook(channelId):
    if request.method == 'POST':
        print ('Got request header', request.headers)
        print ('Got request', request.data)
        data = json.loads(request.data)
        repo = data["repository"]["full_name"]
        ref = data["ref"].split('/',2)[-1]
        for commit in data['commits']:
            msg = commit['message']
            author = commit['committer']['name']
            url = commit['url']
            info = {
                "first":{
                    "value":"代码有新的提交"
                },
                "keyword1":{
                    "value":author
                },
                "keyword2":{
                    "value":repo
                },
                "keyword3":{
                    "value":ref
                },
                "keyword4":{
                    "value":msg
                },
                "remark":{
                    "value":"请注意查看"
                }
            }
            content = json.dumps(info,ensure_ascii=False,indent=2)
            r=requests.post("http://wechat.zhitantech.com/send",{"appid":"9FDEfuTrGZ","channelid":channelId,"content":content,"url":commit['url']})
    return ''

# Gitlab Webhook
@app.route('/gitlab/<string:channelId>', methods=['POST'])
def gitlab_hook(channelId):
    if request.method == 'POST':
        print ('Got request:', request.data)
        data = json.loads(request.data)
        if(data['event_name']=='repository_update'):
            # Repo Update Info
            return ''
        if(data['object_kind']=='push'):
        # gitlab hook data format https://docs.gitlab.com/ce/user/project/integrations/webhooks.html
            ref = data['ref'].split('/', 2)[-1]
            commits = data['commits']
            if commits and 'merge' in commits[-1]['message'].lower():
                return ''
            for commit in commits:
                info = {
                    "first":{
                        "value":"代码有新的提交"
                    },
                    "keyword1":{
                        "value":data['user_name'] 
                    },
                    "keyword2":{
                        "value":data['repository']['name'] 
                    },
                    "keyword3":{
                        "value":ref
                    },
                    "keyword4":{
                        "value":commit['message'] 
                    },
                    "remark":{
                        "value":"请注意查看"
                    }
                }
                content = json.dumps(info,ensure_ascii=False,indent=2)
                r=requests.post("http://wechat.zhitantech.com/send",{"appid":"9FDEfuTrGZ","channelid":channelId,"content":content,"url":commit['url']})
    return ''