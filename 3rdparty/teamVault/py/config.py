#coding:utf-8
VAULT_URL = 'http://localhost:8200'
ROOT_TOKEN = '61691c85-a037-212f-d4de-8c81f087648c'
UNSEAL_KEY = 'cHYte9Rahxl7B0lF8rEMM4IKlNgWgXK9t2BU2/dIN/o='

base_url = 'https://cloud.yice.org.cn/zhulijun/classes/'
user_request_url = base_url +'_User'
channel_request_url = base_url +'Channel'
vault_request_url = base_url +'Vault'
sess_request_url = base_url +'Request'
request_headers = {
    'X-Parse-Application-Id' : 'zhulijun-app-id',
    "Content-Type": "application/json"
}