import * as types from '../mutation-types'
import { Parse, axios } from '../../apis/index'
import { ActionTree } from 'vuex'


interface State {
  current_channel: 
}

const state = {
  current_channel: {},
  qrcode_url: ''
}

const getters = {}

const actions: ActionTree<State, object> = {
  getMyChannel({ commit }, secret) {
    /**
     * get all my channels
     */
  }
}

const mutations = {

}
export default {
  state,
  getters,
  actions,
  mutations,
}