import requests
import base64
import time
import json
from config import AIUI_SETTINGS
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

base_url = 'https://api.xfyun.cn/v1/aiui/v1/text_semantic'

def md5(str):
    import hashlib
    m = hashlib.md5()   
    m.update(str)
    return m.hexdigest()

def semantic(text,userid):
    req_text = base64.b64encode(text)
    curtime = str(time.time()).split('.')[0]
    params = base64.b64encode(str({'scene':'main','userid':userid.encode("raw_unicode_escape")}))
    checksum=md5(AIUI_SETTINGS['ApiKey']+curtime+params+'text='+req_text)
    headers = {'X-Appid': AIUI_SETTINGS['APPID'],'X-CurTime':curtime,'X-Param':params,'X-CheckSum':checksum}
    payload={'text':req_text}
    r=requests.post(base_url,headers=headers,data=payload)
    return json.loads(r.text)