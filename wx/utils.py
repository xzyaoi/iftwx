# Global Imports

import os
import ssl
from wechat import client

# Parse Config
from config import PARSE_SETTINGS
from parse_rest.connection import register

# Parse Object Definations
from parse_rest.user import User
os.environ["PARSE_API_ROOT"] = "https://cloud.yice.org.cn/zhulijun"
register(PARSE_SETTINGS['APP_ID'], PARSE_SETTINGS['MASTER_KEY'])

def put_follower_into_db():
    followers = client.user.get_followers()
    openids = followers['data']['openid']
    users = client.user.get_batch(openids)
    for each in users:
        subscribe=False
        if(each['subscribe']==1):
            subscribe=True
        u = User.signup(each['openid'], "123456", wxOpenId=each['openid'], province=each['province'],subscribe_time=each['subscribe_time'],headimgurl=each['headimgurl'],isSubscribe=subscribe,city=each['city'],language=each['language'],remark=each['remark'],tags=each['tagid_list'],groupid=each['groupid'],sex=each['sex'],country=each['country'],nickName=each['nickname'])
    print 'Finished'