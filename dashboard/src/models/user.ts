import * as Parse from 'parse'

class ParseUser extends Parse.User {
  constructor(className?: string, options?: any) {
    super(className, options)
    this.className = '_User'
  }
  set id(id: string) {
    this.id = id
  }
  get id(): string {
    return this.id
  }
  /**
    string wxOpenId
     * @return void
     */
  set wxOpenId(wxOpenId: string) {
    this.wxOpenId = wxOpenId
  }
  /**
    void
     * @return string wxOpenId
     */
  get wxOpenId(): string {
    return this.wxOpenId
  }
  /**
    bool isSubscribe
     * @return void
     */
  set isSubscribe(isSubscribe: boolean) {
    this.isSubscribe = isSubscribe
  }
  /**
    void
     * @return bool isSubscribe
     */
  get isSubscribe(): boolean {
    return this.isSubscribe
  }
  /**
     *
     */
  set sex(sex: number) {
    if (sex < 0 || sex > 2) {
      throw new Error('Sex must be 0, 1 or 2');
    }
    this.sex = sex
  }
  /**
     *
     */
  get sex(): number {
    return this.sex
  }
  /**
     * @return Unique Object Id
     */
  get objectId(): string {
    return this.objectId
  }
}

export {
  ParseUser
}