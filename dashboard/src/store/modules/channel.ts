import * as types from '../mutation-types'
import { Parse, axios } from '../../apis/index'
import { ActionTree } from 'vuex'

let Channel = Parse.Object.extend('Channel')

interface State {
  current_channel: null 
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