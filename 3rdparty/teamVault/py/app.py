#coding:utf-8
from flask import Flask, request
import socketio
import time
import json
from vault import v

app = Flask(__name__)
sio = socketio.Server()

@sio.on('create_password', namespace='/secret')
def createPassword(sid, data):
    sio.emit('reply', room=sid)

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

@app.route('/acquireToken', methods=['POST'])
def acquireToken():
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        channelId = data['channelId']
        vaultName = data['vaultName']
        v.loginWithDefaultToken()
        token = v.generateToken(channelId,vaultName)
    return json.dumps(token)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
