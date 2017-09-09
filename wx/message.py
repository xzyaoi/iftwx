#coding: utf-8
from wechatpy import parse_message
from wechatpy.replies import TextReply
from wechatpy.replies import TransferCustomerServiceReply
import sys

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
        return self.text_reply('收到你发来的消息了，内容是: %s' % self.message.content)

    def handle_unknown(self):
        return self.text_reply(
            '助 \n'
            '理 \n'
            '君 \n'
        )

    def handle_unknown_event(self):
        return self.handle_unknown()

    def handle_subscribe_event(self):
        # TODO: Update subscribe status
        # self.user.subscribe = True
        # self.user.save(update_fields=['subscribe'])
        return self.text_reply(
            '助 \n'
            '理 \n'
            '君 \n'
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
                '\U0001F648哎呀，看起来微信的语音转文字功能又双叒叕罬蝃抽风了，请重试一遍，或者直接发文字给我~'
            )
        #TODO Do Different Operations
        return self.handle_text()

def handle_message(msg):
    user_message = parse_message(msg)
    print user_message
    return WechatMessage(user_message).handle()
