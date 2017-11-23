import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import * as mutations from './mutations'

import channel from './modules/channel'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {
        netStatus: '',
        loadingFlag: false,
    },
    mutations: mutations.default,
    modules: {
        channel,
    },
    strict: debug,
});