import { POJ } from '../apis/parse'

class Channel extends POJ {
  readonly className: string
  constructor(className?: string, options?: any) {
    super('Channel', options)
    this.className = 'Channel'
  }
  get name(): string {
    return this.name
  }
  set name(name: string) {
    this.name = name
  }
  get objectId(): string {
    return this.objectId
  }
  set objectId(objectId: string) {
    this.objectId = objectId
  }
}

interface CreateChannelPayload {
  channel_name: string;
  app_id: string;
}

export {
  Channel,
  CreateChannelPayload,
}
