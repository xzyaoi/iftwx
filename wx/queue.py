from celery import Celery
from wechat import client
celery_app = Celery('zhulijun',broker='amqp://guest@localhost:5672//')

@celery_app.task
def send_template_message(openId,templateId,data,url=None,miniProgram=None):
    r=client.message.send_template(openId,templateId,data,url,miniProgram)
    print r
    return r
