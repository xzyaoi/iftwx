#coding:utf-8
from config import VAULT_URL,ROOT_TOKEN
import hvac

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class Vault(metaclass=Singleton):
    def __init__(self):
        self.client = hvac.Client(url=VAULT_URL,token=ROOT_TOKEN)
    def isInitialized(self):
        return self.client.is_initialized()
    def listPolicies(self):
        return self.client.list_policies()
    def isAuthenticated(self):
        return self.client.isAuthenticated()
    def writeSecret(self, name, secret):
        self.client.write(name,value=secret)
    def deleteSecret(self, name):
        self.client.delete(name)
    def readSecret(self,name):
        return self.client.read(name)
    def createPolicy(self, policyName, channelId, appName):
        policy = """
            path "sys" {
            policy = "deny"
            }

            path "" {
            policy = "write"
            }

            path "secret/foo" {
            policy = "read"
            }
        """
v = Vault()

print (v.listPolicies())
v.writeSecret('secret/password','starlabs')
print (v.readSecret('secret/password'))
v.deleteSecret('secret/password')