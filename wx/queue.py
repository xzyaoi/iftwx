from celery import Celery
from wechat import client
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

celery_app = Celery('zhulijun',broker='amqp://guest@localhost:5672//')

CELERY_CONFIG = {
    'CELERY_TIMEZONE': 'Asia/Shanghai',
    'CELERY_ENABLE_UTC': True,
    'CELERY_TASK_SERIALIZER': 'json',
    'CELERY_RESULT_SERIALIZER': 'json',
    'CELERY_ACCEPT_CONTENT': ['json'],
    'CELERYD_MAX_TASKS_PER_CHILD': 1,
    'CELERYBEAT_SCHEDULE': CELERYBEAT_SCHEDULE     # 启动beat，传入相关参数.
}

@celery_app.task
def send_template_message(openId,templateId,data,url=None,miniProgram=None):
    data=json.loads(data)
    r=client.message.send_template(openId,templateId,data,url,miniProgram)
    return r

@celery_app.task
def send_activity_notice(mobile,activityTitle):
    