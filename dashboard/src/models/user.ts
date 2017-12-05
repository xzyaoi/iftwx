import * as Parse from 'parse'

class ParseUser extends Parse.User {
  constructor(className?: string, options?: any) {
    super(className, options)
    this.className = '_User'
  }
  get wxOpenId():string {
    return this.wxOpenId
  }
  set wxOpenId(wxOpenId:string) {
    this.wxOpenId = wxOpenId
  }
}

export {
  ParseUser
}
