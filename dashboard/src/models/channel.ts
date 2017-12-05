import { POJ } from '../apis/parse'

class Channel extends POJ {
  readonly className: string
  constructor(className?: string, options?: any) {
    super('Channel', options)
    this.className = 'Channel'
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
