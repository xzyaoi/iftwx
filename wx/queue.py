from celery import Celery
from wechat import client
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

celery_app = Celery('zhulijun',broker='amqp://guest@localhost:5672//')

@celery_app.task
def send_template_message(openId,templateId,data,url=None,miniProgram=None):
    data=json.dumps(data)
    print data
    r=client.message.send_template(openId,templateId,data,url,miniProgram)
    print r
    return r
