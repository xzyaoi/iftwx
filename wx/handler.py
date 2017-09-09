import os
from config import PARSE_SETTINGS
from wechat import client
from parse_rest.datatypes import Object
from parse_rest.user import User
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

os.environ["PARSE_API_ROOT"] = "https://cloud.yice.org.cn/zhulijun"

class Reminder(Object):
    pass

def reminder_handler(remind_obj,openid):
    try:
        remind_time = remind_obj['data']['semantic'][0]['slots'][0]['normValue']['suggestDatetime']
        remind_user = User.Query.get(wxOpenId=openid)
        content = remind_obj['data']['text']
        isRepeat = False
        repeatFrequency = None
        try:
            for each in remind_obj['data']['semantic'][0]['slots']:
                if(each['name']=='repeat'):
                    isRepeat = True
                    repeatFrequency = each['value']
        except Exception:
            pass
        reminder = Reminder(remindTime=remind_time,remindUser=remind_user, createdBy=remind_user, origin=origintext,isRepeat=isRepeat,repeatFrequency=repeatFrequency)
        reminder.save()
        return True
    except Exception:
        return False
