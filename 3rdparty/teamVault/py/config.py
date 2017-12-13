#coding:utf-8
VAULT_URL = 'http://localhost:8200'
ROOT_TOKEN = 'c720ce1a-6537-7ebf-0a15-0583f12b4f56'
UNSEAL_KEY = '6GOYrElj44jPwWpYRDBMBCPx99SpUOyui+2vColo8Mw='

base_url = 'https://cloud.yice.org.cn/zhulijun/classes/'
user_request_url = base_url +'_User'
channel_request_url = base_url +'Channel'
vault_request_url = base_url +'Vault'
sess_request_url = base_url +'Request'
request_headers = {
    'X-Parse-Application-Id' : 'zhulijun-app-id',
    "Content-Type": "application/json"
}