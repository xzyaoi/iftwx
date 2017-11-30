import { ActionTree } from 'vuex'
import * as types from '../mutation-types'
import { Parse } from '../../apis/index'
import { ParseUser }  from '../../models/user'

export interface State {
    sessionToken: string;
}


const state: State = {
  sessionToken: ''
}

const getters = {

}

const actions: ActionTree<State, object> = {
  getToken({ commit }, secret) {

  }
}

const mutations = {
  [types.SESSION_TOKEN](_state: State, session: string) {
    _state.sessionToken = session
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
