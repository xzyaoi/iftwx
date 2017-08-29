# -*- coding: utf-8 -*-

from gevent import monkey
monkey.patch_all()

import os

import leancloud

 from app import app
from cloud import engine

APP_ID = 'x5G1gBu1xaNkCe21RvLOVgl5-gzGzoHsz'
APP_KEY = 'wA0Tx0kQJgLNpF43WT1wrIPn'
MASTER_KEY = '5Cvw6QXIkogziyLCGCCRnlpN'
PORT = 80

leancloud.init(APP_ID, app_key=APP_KEY, master_key=MASTER_KEY)
# 如果需要使用 master key 权限访问 LeanCLoud 服务，请将这里设置为 True
leancloud.use_master_key(False)

# 需要重定向到 HTTPS 可去除下一行的注释。
# app = leancloud.HttpsRedirectMiddleware(app)
app = engine.wrap(app)
application = app

if __name__ == '__main__':
    run()