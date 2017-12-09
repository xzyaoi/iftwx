import { POJ } from '../apis/parse'

class Vault extends POJ {
  readonly className: string
  constructor(className?: string, options?: any) {
    super('Vault', options)
    this.className = 'Vault'
  }
  get objectId(): string {
    return this.objectId
  }
}

class Secret extends POJ {
    readonly className: string
    constructor(className?: string, options?: any) {
      super('Secret', options)
      this.className = 'Secret'
    }
}

interface CreateVaultPayload {
  vault_name: string;
  channel_id: string;
  is_public: boolean;
}

interface CreateSecretPayload {
  secret_name: string;
  vault_id: string;
}

interface RequestTokenPayload {
  secret_name: string;
  reviewerWxId: string;
  channelId: string;
  vaultId: string;
}

export {
  Vault,
  Secret,
  CreateVaultPayload,
  CreateSecretPayload,
  RequestTokenPayload
}
