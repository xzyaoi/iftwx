#coding:utf-8
VAULT_URL = 'http://localhost:8200'
ROOT_TOKEN = 'b4cbe16e-1d32-75a4-2b2c-412199f560c5'
UNSEAL_KEY = 'ZuxmYhqeCPJS4+ugc9vh2csnwWHsi0FMr86LurSTD7I='

base_url = 'https://cloud.yice.org.cn/zhulijun/classes/'
user_request_url = base_url +'_User'
channel_request_url = base_url +'Channel'
vault_request_url = base_url +'Vault'
sess_request_url = base_url +'Request'
request_headers = {
    'X-Parse-Application-Id' : 'zhulijun-app-id',
    "Content-Type": "application/json"
}