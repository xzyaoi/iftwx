import * as Parse from 'parse'

class ParseUser extends Parse.User {
  constructor(className?: string, options?: any) {
    super(className, options)
    this.className = '_User'
  }
}

export {
  ParseUser
}
