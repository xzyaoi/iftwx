# coding: utf-8

from datetime import datetime

from flask import Flask
from flask import request 
import json
from wx import *

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)

@app.route('/',methods=['GET'])
def init_wx():
    bot.file_helper.send('Hello from wxpy!')

# 动态路由
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
                message = u'{name} push to repo {repo}/{ref} \n check: {gitlab_url} \n {message}'.format(
                    name=data['user_name'],
                    repo=data['repository']['name'],
                    ref=ref,
                    message=commit['message'],
                    gitlab_url=commit['url'])
                print message
    return ''