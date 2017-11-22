const Parse = require('parse');

import { serviceParseToken, ztodoParseToken } from './base.conf'

Parse.initialize(serviceParseToken.APP_ID)
Parse.serverURL = serviceParseToken.REQUEST_URL
