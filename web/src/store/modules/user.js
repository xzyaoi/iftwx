import * as types from '../mutation-types.js'
import router from '@/router'
import { Parse, axios } from '@/service/index'
import store from '@/store'

var UserInfo = Parse.Object.extend('userInfo')
var UserInfo_query = new Parse.Query(UserInfo)
const state = {
    current_user: {},
    requireAuth: true,
    requireNotice: false
}

const getters = {}

const actions = {
    login({ commit }, user_data) {
        // Insert your own login methods
    },
    logout({ commit }) {
        commit('LOG_OUT')
    }
}

const mutations = {
    [types.LOG_IN](state, current_user) {
        state.current_user = current_user
        state.requireAuth = false
    },
    [types.LOG_OUT](state) {
        state.current_user = {}
        state.requireAuth = true
        router.replace('login')
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}