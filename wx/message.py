from wechatpy import parse_message
from wechatpy.replies import TextReply
from wechatpy.replies import TransferCustomerServiceReply
class WechatMessage(object):
    def __init__(self, message):
        self.message = message
        # TODO: User getter 
        self.user = get_user_model().objects.get_or_fetch(message.source)
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
    def handle_subscribe_event(self):
        self.user.subscribe = True
        self.user.save(update_fields=['subscribe'])
        return self.text_reply(
            '助'
            '理'
            '君'
            % self.user.get_full_name()
        )
def handle_message(msg):
    user_message = parse_message(msg)

