#coding:utf-8
import config
import hvac
from templite import Templite

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class Vault(metaclass=Singleton):
    def __init__(self):
        self.client = hvac.Client(url=config.VAULT_URL)

    def loginWithDefaultToken(self):
        self.client.token = config.ROOT_TOKEN

    def auth(self,token):
        self.client.token = token
        print(self.isAuthenticated())

    def logOut(self):
        self.client.logout()

    def isInitialized(self):
        return self.client.is_initialized()

    def listPolicies(self):
        return self.client.list_policies()

    def isAuthenticated(self):
        return self.client.is_authenticated()

    def writeSecret(self, channelId, vaultId, secretName, secret, lease=None):
        pname = self.getPolicyName(channelId, vaultId)
        try:
            if lease is None:
                self.client.write(pname+'/'+secretName,value=secret,lease='1h')
            else:
                self.client.write(pname+'/'+secretName,value=secret,lease=lease)
            return 'success'
        except:
            return 'failed'

    def deleteSecret(self, name):
        self.client.delete(name)

    def readSecret(self,channelId, vaultId, secretName):
        try:
            pname = self.getPolicyName(channelId, vaultId)
            print(pname+'/'+secretName)
            return self.client.read(pname+'/'+secretName)
        except:
            result = {
                'err': True,
                'reason': 'Denied'
            }
            print(result)
            return result

    def getPolicyName(self, channelId, vaultId):
        return 'secret/'+channelId+'/'+vaultId

    def createPolicy(self, channelId, vaultId):
        template = Templite("""
            path "sys" {
                policy = "deny"
            }

            path "secret/{{channelId}}/{{vaultId}}/*" {
                policy = "write"
            }

            path "secret/{{channelId}}/{{vaultId}}/*" {
                policy = "read"
            }
        """)
        t = template.render({"channelId":channelId, "vaultId":vaultId})
        self.client.set_policy(self.getPolicyName(channelId,vaultId), t)

    def deletePolicy(self,channelId,vaultId):
        self.client.delete_policy(self.getPolicyName(channelId,vaultId))

    def getPolicy(self, channelId, vaultId, needParse):
        return self.client.get_policy(self.getPolicyName(channelId,vaultId), parse=needParse)
    
    def isSealed(self):
        return self.client.is_sealed()

    def seal(self):
        self.client.seal()

    def unseal(self, token):
        self.client.unseal(token)

    def generateToken(self,channelId,vaultId,lease="1h"):
        return self.client.create_token(policies=[self.getPolicyName(channelId,vaultId)], lease=lease)

    def revokeToken(self,token):
        self.client.token = config.ROOT_TOKEN
        self.client.revoke_token(token)

v = Vault()
print(v.isAuthenticated())