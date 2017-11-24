import Axios from 'axios'
import { serviceParseToken } from './base.conf'

Axios.defaults.headers.post['X-Parse-Application-Id'] = serviceParseToken.APP_ID
Axios.defaults.headers.post['Accept'] = 'application/json'

export {
  Axios
}