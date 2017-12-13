#coding:utf-8
VAULT_URL = 'http://wechat.zhitantech.com:8200'
ROOT_TOKEN = "648e1254-b873-dd67-73b9-0a81401020e4"
UNSEAL_KEY = "lFi7ehveB7b7+smaqX4Yl3nm2XUe6KPoXVQdieVdORk="

base_url = 'https://cloud.yice.org.cn/zhulijun/classes/'
user_request_url = base_url +'_User'
channel_request_url = base_url +'Channel'
vault_request_url = base_url +'Vault'
sess_request_url = base_url +'Request'
request_headers = {
    'X-Parse-Application-Id' : 'zhulijun-app-id',
    "Content-Type": "application/json"
}