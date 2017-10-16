# Global Imports
#coding: utf-8
import os
import ssl
from wechat import client
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

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
        try:
            u = User.signup(each['openid'], "123456", wxOpenId=each['openid'], province=each['province'],subscribe_time=each['subscribe_time'],headimgurl=each['headimgurl'],isSubscribe=subscribe,city=each['city'],language=each['language'],remark=each['remark'],tags=each['tagid_list'],groupid=each['groupid'],sex=each['sex'],country=each['country'],nickName=each['nickname'])
        except Exception:
            pass
    print 'Finished'

def add_menu():
    client.menu.create({
    "button":[
        {
            "name":"我的",
            "sub_button":[
                {
                    "type":"click",
                    "name":"日程",
                    "key":"ZLJ_CALENDAR"
                },
                {
                    "type":"click",
                    "name":"信息",
                    "key":"ZLJ_MESSAGE"
                },
                {
                    "type":"click",
                    "name":"设置",
                    "key":"ZLJ_SETTINGS"
                }
            ]
        },
        {
            "name":"服务",
            "sub_button":[
                {
                    "type":"miniprogram",
                    "name":"ZTodo",
                    "url":"https://cloud.yice.org.cn/dev/ztodo",
                    "pagepath":"pages/task/index",
                    "appid":"wxf26f47e8b08cf1a3"
                },
                {
                    "type":"miniprogram",
                    "name":"小圈活动",
                    "url":"https://cloud.yice.org.cn/cms",
                    "pagepath":"pages/Circle",
                    "appid":"wx96e79f4686faf895"
                },
                {
                    "type":"miniprogram",
                    "name":"新闻助手",
                    "url":"https://cloud.yice.org.cn/dev/wxapp/#/show/4SHUdAE3Vx",
                    "pagepath":"pages/timeline_tab/timeline",
                    "appid":"wxa07ab1d2924a4874"
                }
            ]
        },
        {
            "name":"关于我们",
            "sub_button":[
                {
                    "type":"view",
                    "name":"介绍",
                    "url":"http://www.soso.com/"
                },
                {
                    "type":"view",
                    "name":"合作伙伴",
                    "url":"http://v.qq.com/"
                },
                {
                    "type":"view",
                    "name":"感谢",
                    "url":"http://v.qq.com/"
                }
            ]
        }
    ]
})