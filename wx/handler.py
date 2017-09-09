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
        slots=None
        remind_time=None
        remind_content=None
        for each in remind_obj['data']['semantic']:
            if each['intent']=='CREATE':
                slots=each['slots']
                break
        for each in slots:
            if each['name']=='content':
                remind_content=each['value']
            elif each['name'] == 'datetime':
                remind_time = each['normValue']['suggestDatetime']
            
        remind_user = User.Query.get(wxOpenId=openid)
        origintText = remind_obj['data']['text']
        isRepeat = False
        repeatFrequency = None
        try:
            for each in remind_obj['data']['semantic'][0]['slots']:
                if(each['name']=='repeat'):
                    isRepeat = True
                    repeatFrequency = each['value']
        except Exception:
            pass
        reminder = Reminder(remindTime=remind_time,remindUser=remind_user,remindContent=remind_content, createdBy=remind_user, origin=origintText,isRepeat=isRepeat,repeatFrequency=repeatFrequency)
        reminder.save()
        return True
    except Exception:
        print 'cannot save reminder handler'
        return False
