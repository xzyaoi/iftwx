from parse_rest.user import User
from parse_rest.connection import register
from config import PARSE_SETTINGS
import os
from wechat import client
os.environ["PARSE_API_ROOT"] = "https://cloud.yice.org.cn/zhulijun"
register(PARSE_SETTINGS['APP_ID'], PARSE_SETTINGS['MASTER_KEY'])

class WXUser(object):
    def __init__(self,openid):
        self.user = User.Query.get(wxOpenId=openid)
    @property
    def data(self):
        return self.user

def addUser(openid):
    print 'adding user'
    print openid
    each = client.user.get(openid)
    try:
        each = User.Query.get(wxOpenId=each['openid'])
    except Exception:
        subscribe=False
        if(each['subscribe']==1):
            subscribe=True
        u = User.signup(each['openid'], "123456", wxOpenId=each['openid'], province=each['province'],subscribe_time=each['subscribe_time'],headimgurl=each['headimgurl'],isSubscribe=subscribe,city=each['city'],language=each['language'],remark=each['remark'],tags=each['tagid_list'],groupid=each['groupid'],sex=each['sex'],country=each['country'],nickName=each['nickname'])
        print u