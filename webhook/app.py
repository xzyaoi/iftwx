# coding: utf-8

from datetime import datetime
from flask import Flask
from flask import request
import json
import requests
import leancloud
import sys
import uuid
reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)

@app.route('/register',methods=['POST'])
def register():
    if request.method == 'POST':
        print request.data
        user = leancloud.User()
        user.set_username(request.form['username'])
        user.set_password(request.form['password'])
        user.set_email(request.form['email'])
        user.set('sendkey',str(uuid.uuid4()))
        user.set('sendfrom',request.form['sendfrom'])
        user.sign_up()
        print 'signed up'
        return ''

@app.route('/',methods=['GET'])

# ZTodo Webhook
@app.route('/ztodo', methods=['POST'])
def ztodo_hook():
    return ''
# Smart Circle Webhook
@app.route('/mc', methods=['POST'])

def mcircle_hook():
    return ''
# Gitlab Webhook
@app.route('/gitlab', methods=['POST'])
def gitlab_hook():
    if request.method == 'POST':
        channelId = 'DTDcyyQP9t'
        print 'Got request:', request.data
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
                content = u'{"first":{"value":"代码有新的提交"},"keyword1":{"value":{name}},"keyword2":{"value":{repo}},"keyword3":{"value":ref},"keyword4":{"value":{message}}, "remark":{"value":"请及时查看"}}'.format(
                    name=data['user_name'],
                    repo=data['repository']['name'],
                    ref=ref,
                    message=commit['message'],
                    gitlab_url=commit['url'])

                r=requests.post("http://wechat.zhitantech.com/send",{"appid":"9FDEfuTrGZ","channelid":"DTDcyyQP9t","content":content,"url":commit['url']})
    return ''