# coding: utf-8

from datetime import datetime
from flask import Flask
from flask import request
import json
import requests
import leancloud
import sys
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
                message = u'{name}推送了新的代码到{repo}的{ref}分支 \n 点此链接进入:{gitlab_url} \n 改动信息:{message}'.format(
                    name=data['user_name'],
                    repo=data['repository']['name'],
                    ref=ref,
                    message=commit['message'],
                    gitlab_url=commit['url'])
                r = requests.get('https://pushbear.ftqq.com/sub?sendkey=804-6507b40121c173ce5caac52b4ed35436&text=代码有新的更新&desp='+message)
    return ''