#coding:utf-8
VAULT_URL = 'http://localhost:8200'
ROOT_TOKEN = '2000a0eb-ca67-2674-e0d7-896e22db90d4'
UNSEAL_KEY = 'NUpucqQkgmWnjC+Zd5zzU26COwejLwQPSLac8Y3IPmI='

base_url = 'https://cloud.yice.org.cn/zhulijun/classes/'
user_request_url = base_url +'_User'
channel_request_url = base_url +'Channel'
vault_request_url = base_url +'Vault'
sess_request_url = base_url +'Request'
request_headers = {
    'X-Parse-Application-Id' : 'zhulijun-app-id'
}