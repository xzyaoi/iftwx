#coding:utf-8
from flask import Flask, render_template
import socketio
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
sio = socketio.Server()

@sio.on('create_password', namespace='/secret')
def createPassword(sid, data):
    print("message ",data)
    sio.emit('reply', room=sid)

@app.route('/createPass', methods=['POST'])
def mcircle_hook():
    return ''