import Vue from 'vue'
import Vuex from 'vuex'
import createPersist, { createStorage } from 'vuex-localstorage'
import * as mutations from './mutations'
import * as actions from './actions'
import createLogger from '../utils/logger'

import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {
        netStatus: '',
        loadingFlag: false,
    },
    mutations: mutations.default,
    actions,
    modules: {
        user,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});