#coding:utf-8
from flask import Flask, request
from flask_socketio import SocketIO, emit
import requests
import time
import json
from vault import v
# from wxpush import pusher
import config
from urllib import parse
from templite import Templite

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('requestToken')
def requestToken(data):
    data = data['data']
    print(data)
    print(request.sid)
    reviewerId = data['reviewerWxId']
    secretName = data['secret_name']
    vaultId = data['vaultId']
    channelId = data['channelId']
    applyFrom = data['applyFrom']
    # p = pusher.Pusher()
    # Query user, channel, vault info first
    # user
    user_query_payload = parse.quote('"objectId"')+":"+parse.quote('"'+applyFrom+'"')
    user_query_response = requests.get(config.user_request_url+'?where={'+user_query_payload+"}", headers = config.request_headers)
    user_data = json.loads(user_query_response.text)
    # channel
    channel_query_payload = parse.quote('"objectId"')+":"+parse.quote('"'+channelId+'"')
    channel_query_response = requests.get(config.channel_request_url+'?where={'+channel_query_payload+"}", headers = config.request_headers)
    channel_data = json.loads(channel_query_response.text)
    # vault
    vault_query_payload = parse.quote('"objectId"')+":"+parse.quote('"'+vaultId+'"')
    vault_query_response = requests.get(config.vault_request_url+'?where={'+vault_query_payload+"}", headers = config.request_headers)
    vault_data = json.loads(vault_query_response.text)
    # Make Brief Intro
    brief_template = Templite("""
        您好，{{username}} 正在申请 {{channelName}}/{{vaultName}} 的 {{secretName}}。 请查看。
    """)
    brief = brief_template.render({'username':user_data['results'][0]['nickName'], 'channelName':channel_data['results'][0]['name'], 'vaultName':vault_data['results'][0]['name'], 'secretName':secretName})
    print(brief)
    # Send Socket ID and etc into Database for further Audit
    sessPayload = {
        "appliance":
            {"__type":"Pointer","className":"_User","objectId":user_data['results'][0]['objectId']},
        "channel":
            {"__type":"Pointer","className":"Channel","objectId":channel_data['results'][0]['objectId']},
        "sessId":request.sid,
        "vault":
            {"__type":"Pointer","className":"Vault","objectId":vault_data['results'][0]['objectId']},
        "secretName":secretName,
        "brief":brief
    }
    print(sessPayload)
    sessPayload = json.dumps(sessPayload).replace("'",'"')
    print(sessPayload)
    res = requests.post(config.sess_request_url,headers = config.request_headers,data = sessPayload)
    print(res.status_code)
    print(res.text)
    # Build URL

    # Send Notification
    # p.single_send(reviewerId,brief)

@app.route('/createPass', methods=['POST'])
def createPassword():
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        password = data['password']
        vaultName = data['vaultName']
        channelId = data['channelId']
        passtitle = data['passtitle']
        token = data['token']
        v.logOut()
        print(token)
        v.auth(token)
        v.writeSecret(channelId,vaultName,passtitle,password)
        v.revokeToken(token)
    return 'success'

@app.route('/readPass', methods=['POST'])
def readPassword():
    passcode = ''
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        vaultName = data['vaultName']
        channelId = data['channelId']
        passtitle = data['passtitle']
        token = data['token']
        v.logOut()
        v.auth(token)
        passcode = v.readSecret(channelId, vaultName, passtitle)
        v.revokeToken(token)
    return json.dumps(passcode)

@app.route('/createPolicy', methods=['POST'])
def createPolicy():
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        channelId = data['channelId']
        vaultName = data['vaultName']
        v.loginWithDefaultToken()
        v.createPolicy(channelId,vaultName)
    return 'success'

# This Acquire Token API should only be called from Wechat or authorized user
# The Generated Token will be expired after 1 hour by default
# This method is the so called * dangerous operation *
# Be careful when you are using this API
@app.route('/acquireToken', methods=['POST'])
def acquireToken():
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        channelId = data['channelId']
        vaultName = data['vaultName']
        v.loginWithDefaultToken()
        token = v.generateToken(channelId, vaultName)
    return json.dumps(token)

if __name__ == "__main__":
    socketio.run(app)