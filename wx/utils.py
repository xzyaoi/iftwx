# Global Imports

import os
import ssl
from wechatpy import WeChatClient
from config import WX_SETTINGS

# Wechat Config
client = WeChatClient(WX_SETTINGS['WX_APPID'], REST_API_KEY = None,WX_SETTINGS['WX_APPSECRET'])

# Parse Config
from config import PARSE_SETTINGS
from parse_rest.connection import register

# Parse Object Definations
from parse_rest.user import User
os.environ["PARSE_API_ROOT"] = "https://cloud.yice.org.cn/zhulijun"
register(PARSE_SETTINGS['APP_ID'], PARSE_SETTINGS['MASTER_KEY'])

def put_follower_into_db():
    followers = client.user.get_followers()
    for each in followers['data']['openid']:
        u = User.signup(each, "123456", wxOpenId=each)
        print u