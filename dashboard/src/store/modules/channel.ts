import * as types from '../mutation-types.js'
import router from '../../router'
import { Parse, axios } from '../../apis/index'
import store from '../../store'

let Channel = Parse.Object.extend('Channel')
let App = Parse.Object.extend('App')

const state = {
  current_channel: {},
  qrcode_url: ''
}

const getters = {}

const actions = {

}

const mutations = {

}
export default {
  state,
  getters,
  actions,
  mutations,
}