import { POJ } from '../apis/parse'
import { ParseUser } from './user'

class Channel extends POJ {
  readonly className: string
  constructor(className?: string, options?: any) {
    super('Channel', options)
    this.className = 'Channel'
  }
}

export {
  Channel
}
