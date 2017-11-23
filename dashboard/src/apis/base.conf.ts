/**
 * @ Authors: Zhulijun Developers (Xiaozhe Yao et al) & Shenzhen Zhitan Technology Inc.
 * @ TLDR: The content of this file is confidential, do not reveal it in any public occasion.
 *
 * This file includes like Parse App Secret, Wechat Secret and so on.
 * Be noticed that whenever you are delivering code, you need to delete this file first.
 * If you see this file without any authentication, you may have insulted the right of the developer and it's company.
 * It will be regarded as an illegal behaviour.
 */

interface WechatToken {
  readonly ZTODO_MINA_ID: string;
  readonly ZTODO_MINA_SECRET: string;
  readonly SERVICE_APP_ID: string;
  readonly SERVICE_APP_SECRET: string;
}

interface ParseToken {
  readonly REQUEST_URL: string;
  readonly APP_ID: string;
  readonly MASTER_KEY?: string;
}

let wechatToken: WechatToken = {
  ZTODO_MINA_ID: 'wxf26f47e8b08cf1a3',
  ZTODO_MINA_SECRET: 'd13807388c0c198714507dc6fa59e398',
  SERVICE_APP_ID: 'wx1e47d3e921e8c9f7',
  SERVICE_APP_SECRET: '675e32e48a0c59416768d8d5ab400cf5'
}

let serviceParseToken: ParseToken = {
  REQUEST_URL: 'https://cloud.yice.org.cn/zhulijun/',
  APP_ID: 'zhulijun-app-id',
}

let ztodoParseToken: ParseToken = {
  /**
   * Please be noticed that for capability reasons,
   * USE axios to get ZTodo related data if possible
   * but the interface is exported only if you need to use.
   * Before you use it, you need to re-initialize the parse instance.
   */
  REQUEST_URL: 'https://cloud.yice.org.cn/ztodo/',
  APP_ID: 'ztodo-app-id'
}

export {
  wechatToken,
  serviceParseToken,
  ztodoParseToken,
}