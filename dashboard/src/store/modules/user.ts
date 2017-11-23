import { Commit, ActionTree } from 'vuex'
import * as types from '../mutation-types.js'
import router from '../../router'
import { Parse, axios } from '../../apis/index'
import store from '../../store'
import { ParseUser }  from '../../models/user'

export interface State {
    current_user: ParseUser,
}


const state: State = {
  current_user: new ParseUser()
}

const getters = {}

const actions: ActionTree<State, object> = {
  logIn({ commit }, secret) {
    let query = new Parse.Query(ParseUser)
    return query.get(secret, {
      success: function(result: ParseUser) {
        console.log(result)
      },
      error: function(err: any) {

      }
    })
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