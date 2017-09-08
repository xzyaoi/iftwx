from flask import Flask
from flask import request
from wechatpy.utils import check_signature
from wechatpy.exceptions import InvalidSignatureException
from config import WX_SETTINGS
from message import handle_message
app = Flask(__name__)

@app.route("/",methods=['GET', 'POST'])
def hello():
    if request.method == 'GET':
        signature = request.args.get('signature')
        timestamp = request.args.get('timestamp')
        nonce = request.args.get('nonce')
        echo_str = request.args.get('echostr', '')
        try:
            check_signature(WX_SETTINGS['WX_SIGN_TOKEN'], signature, timestamp, nonce)
        except InvalidSignatureException:
            return 'cannot verify'
        return echo_str
    elif request.method == 'POST':
        return handle_message(request.data)
    else:
        pass
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
