import { ActionTree } from 'vuex'
import * as types from '../mutation-types'
import { Parse } from '../../apis/index'
import { ParseUser }  from '../../models/user'

export interface State {
    current_user: ParseUser;
}


const state: State = {
  current_user: new ParseUser()
}

const getters = {
  current_user(state: State): ParseUser {
    return state.current_user
  }
}

const actions: ActionTree<State, object> = {
  logIn({ commit }, secret) {
    let query = new Parse.Query(ParseUser)
    return query.get(secret, {
      success: function(result: ParseUser) {
        console.log(result)
        commit(types.LOG_IN, result)
      },
      error: function(err: any) {
        console.log(err)
      }
    })
  }
}

const mutations = {
  [types.LOG_IN](_state: State, user: ParseUser) {
    _state.current_user = user
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
