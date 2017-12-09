#coding:utf-8
from flask import Flask, request
from flask_socketio import SocketIO, emit
import time
import json
from vault import v
from wxpush import pusher
app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('requestToken')
def createPassword(data):
    print(data)
    reviewerId = data['reviewerWxId']
    secretName = data['secret_name']
    vaultId = data['l8d3GZhIE1']
    channelId = data['channelId']
    p = pusher.Pusher()


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