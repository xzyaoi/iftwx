const Parse = require('parse');

import { serviceParseToken } from './base.conf'

Parse.initialize(serviceParseToken.APP_ID)
Parse.serverURL = serviceParseToken.REQUEST_URL

import { Object as POJ } from 'parse';

export {
  Parse,
  POJ
}