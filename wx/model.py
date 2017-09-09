import os
import ssl
from wechatpy import WeChatClient
from config import WX_SETTINGS
from wechat import client
# Parse Config
from config import PARSE_SETTINGS
from parse_rest.connection import register

# Parse Object Definations
from parse_rest.user import User
os.environ["PARSE_API_ROOT"] = "https://cloud.yice.org.cn/zhulijun"
register(PARSE_SETTINGS['APP_ID'], PARSE_SETTINGS['MASTER_KEY'])