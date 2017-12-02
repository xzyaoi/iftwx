#coding:utf-8
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import time
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return 'indexindex'

@socketio.on('my event')
def test_message(message):
    print(message)

if __name__ == '__main__':
    socketio.run(app)
    socketio.emit('resp 1', {'data': 'got it!'})
    time.sleep(5)
    socketio.emit('resp 2', {'data': '5 sec passed!'})