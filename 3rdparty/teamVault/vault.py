#coding:utf-8
from config import VAULT_URL, ROOT_TOKEN, UNSEAL_KEY
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
        self.client = hvac.Client(url=VAULT_URL)

    def auth(self,token):
        self.client = token

    def logOut(self):
        self.client.logOut()

    def isInitialized(self):
        return self.client.is_initialized()

    def listPolicies(self):
        return self.client.list_policies()

    def isAuthenticated(self):
        return self.client.is_authenticated()

    def writeSecret(self, name, secret, lease=None):
        if lease is None:
            self.client.write(name,value=secret)
        else:
            self.client.write(name,value=secret,lease=lease)

    def deleteSecret(self, name):
        self.client.delete(name)

    def readSecret(self,name):
        return self.client.read(name)

    def getPolicyName(channelId,appName):
        return channelId+appName

    def createPolicy(self, channelId, appName):
        template = Templite("""
            path "sys" {
                policy = "deny"
            }

            path "secret/{{channelId}}/{{appName}}/*" {
                policy = "write"
            }

            path "secret/{{channelId}}/{{appName}}/*" {
                policy = "read"
            }
        """)
        t = template.render({"channelId":channelId, "appName":appName})
        print(t)
        self.client.set_policy(self.getPolicyName(channelId,appName), t)

    def deletePolicy(self,channelId,appName):
        self.client.delete_policy(self.getPolicyName(channelId,appName))

    def getPolicy(self, channelId, appName, needParse):
        return self.client.get_policy(self.getPolicyName(channelId,appName), parse=needParse)
    
    def isSealed(self):
        return self.client.is_sealed()

    def seal(self):
        self.client.seal()

    def unseal(self, token):
        self.client.unseal(token)

    def generateToken(self,channelId,appName,lease="1h"):
        return self.client.create_token(policies=[self.getPolicyName(channelId,appName)], lease=lease)

    def revokeToken(token):
        self.client.revoke_token(token)

v = Vault()
print(v.isAuthenticated())