// this file include axios http request
import axios from 'axios'
import { APP_ID } from './base.config'

axios.defaults.headers.post['X-Parse-Application-Id'] = APP_ID
axios.defaults.headers.post['Accept'] = 'application/json'

export default axios