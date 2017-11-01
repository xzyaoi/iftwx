import * as types from '../mutation-types.js'
import router from '@/router'
import { Parse, axios } from '@/service/index'
import store from '@/store'

const state = {
    user_data: {}
}

const getters = {}

const actions = {
    login({ commit }, user_data) {
        commit(types.LOGIN, user_data)
    },
    logout({ commit }) {},

}

const mutations = {
    [types.LOGIN](state, user_data) {
        state.user_data = user_data
        router.replace("/main")
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}