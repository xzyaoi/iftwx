#coding: utf-8
from wechatpy import parse_message
from wechatpy.replies import TextReply
from wechatpy.replies import TransferCustomerServiceReply
from aiui import *
from user import *
from handler import *
from model import App
from model import Channel
import sys
import json
reload(sys)
sys.setdefaultencoding('utf-8')

class WechatMessage(object):
    def __init__(self, message):
        self.message = message
        # TODO: User getter 
        # self.user = get_user_model().objects.get_or_fetch(message.source)
    
    @property
    def json_msg(self):
        return json.dumps(self.message._data, ensure_ascii=False, indent=2)
    
    def text_reply(self,reply_str):
        return TextReply(
            content=reply_str[:800],  # WeChat can only accept 2048 bytes of char
            message=self.message,
        ).render()

    def handle(self):
        handler = getattr(self, 'handle_%s' % self.message.type.lower(), self.handle_unknown)
        return handler()
    
    def handle_event(self):
        handler = getattr(self, 'handle_%s_event' % self.message.event.lower(), self.handle_unknown_event)
        return handler()
    
    def handle_text(self):
        semantic_result = semantic(self.message.content, self.message.source)
        try:
            if(semantic_result['data']['service']=='scheduleX'):
                if reminder_handler(semantic_result,self.message.source):
                    return self.text_reply(semantic_result['data']['answer']['text'])
                else:
                    return self.text_reply('你发来的消息: %s , 我暂时无法理解哦' % self.message.content)
        except Exception,e:
            print repr(e)
            pass
        return self.text_reply('你发来的消息: %s , 我暂时无法理解哦' % self.message.content)

    def handle_unknown(self):
        return self.text_reply(
            '助 \n'
            '理 \n'
            '君'
        )

    def handle_unknown_event(self):
        return self.handle_unknown()

    def handle_subscribe_event(self):
        # TODO: Update subscribe status
        addUser(self.message.source)
        return self.text_reply(
            '助 \n'
            '理 \n'
            '君'
            % self.user.get_full_name()
        )

    def handle_unsubscribe_event(self):
        #TODO: Update subscribe status
        # self.user.subscribe = False
        # self.user.save(update_fields=['subscribe'])
        return self.text_reply("Bye")

    def handle_voice(self):
        self.message.content = getattr(self.message, 'recognition', '')
        if not self.message.content:
            return self.text_reply(
                '识别失败，请重新发送'
            )
        return self.handle_text()

def handle_message(msg):
    user_message = parse_message(msg)
    return WechatMessage(user_message).handle()


def handle_template(appId,channelId,content,miniProgram=None,url=None):
    from queue import send_template_message
    # Get template id from appId
    push_app = App.Query.get(objectId=appId)
    templateId = push_app.templateId
    channel = Channel.Query.get(objectId=channelId)
    if not channel.app.objectId==appId:
        return 'appid and channelId is not match'
    # Query receiver openid
    receiver = channel.follower
    for each in receiver:
        result = send_template_message.delay(each,templateId,content,url,miniProgram)
        print result
    # Unpack Content
    # Queue it
    return 'success'