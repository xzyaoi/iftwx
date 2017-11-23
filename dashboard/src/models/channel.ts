import { POJ } from '../apis/parse'
import { ParseUser } from './user'

class Channel extends POJ {
  constructor(className?: string, options?: any) {
    super(className, options)
    this.className = 'Channel'
  }

  set createdBy(createdBy: ParseUser) {
    this.createdBy = createdBy
  }
  get createdBy(): ParseUser {
    return this.createdBy
  }
}

export {
  Channel
}