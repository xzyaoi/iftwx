import * as types from './mutation-types';

const mutations = {
  [types.NET_STATUS](state: any, netStatus: string) {
    state.netStatus = netStatus;
  },

  [types.LOADING_FLAG](state: any, loadingFlag: boolean) {
    state.loadingFlag = loadingFlag;
  },
};

export default mutations;