// this file include parse server config
import Parse from 'parse'
import { APP_ID } from './base.config'

Parse.initialize(APP_ID)
Parse.serverURL = "https://cloud.yice.org.cn/zhulijun"

export default Parse