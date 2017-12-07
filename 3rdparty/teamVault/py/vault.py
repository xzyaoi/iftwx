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

    def loginWithDefaultToken(self):
        self.client = config.ROOT_TOKEN

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

    def writeSecret(self, channelId, vaultName, secretName, secret, lease=None):
        pname = self.getPolicyName(channelId, vaultName)
        if lease is None:
            self.client.write(pname+secretName,value=secret)
        else:
            self.client.write(pname+secretName,value=secret,lease=lease)

    def deleteSecret(self, name):
        self.client.delete(name)

    def readSecret(self,channelId, vaultName, secretName):
        pname = self.getPolicyName(channelId, vaultName)
        return self.client.read(pname)

    def getPolicyName(channelId,vaultName):
        return channelId+vaultName

    def createPolicy(self, channelId, vaultName):
        template = Templite("""
            path "sys" {
                policy = "deny"
            }

            path "secret/{{channelId}}/{{vaultName}}/*" {
                policy = "write"
            }

            path "secret/{{channelId}}/{{vaultName}}/*" {
                policy = "read"
            }
        """)
        t = template.render({"channelId":channelId, "vaultName":vaultName})
        self.client.set_policy(self.getPolicyName(channelId,vaultName), t)

    def deletePolicy(self,channelId,vaultName):
        self.client.delete_policy(self.getPolicyName(channelId,vaultName))

    def getPolicy(self, channelId, vaultName, needParse):
        return self.client.get_policy(self.getPolicyName(channelId,vaultName), parse=needParse)
    
    def isSealed(self):
        return self.client.is_sealed()

    def seal(self):
        self.client.seal()

    def unseal(self, token):
        self.client.unseal(token)

    def generateToken(self,channelId,vaultName,lease="1h"):
        return self.client.create_token(policies=[self.getPolicyName(channelId,vaultName)], lease=lease)

    def revokeToken(token):
        self.client.revoke_token(token)

v = Vault()
print(v.isAuthenticated())