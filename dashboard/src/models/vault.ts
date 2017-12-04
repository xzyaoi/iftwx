import { POJ } from '../apis/parse'

class Vault extends POJ {
  readonly className: string
  constructor(className?: string, options?: any) {
    super('Vault', options)
    this.className = 'Vault'
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

export {
  Vault,
  Secret,
  CreateVaultPayload
}
