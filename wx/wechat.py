from wechatpy import WeChatClient
from config import WX_SETTINGS

# Wechat Config
client = WeChatClient(WX_SETTINGS['WX_APPID'], WX_SETTINGS['WX_APPSECRET'])