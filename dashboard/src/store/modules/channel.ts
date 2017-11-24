import user from './user';
import * as types from '../mutation-types';
import { Parse, axios } from '../../apis/index'
import { ActionTree } from 'vuex'
import { Channel } from '../../models/channel'
import { ParseUser } from '../../models/user';
import store from '../index'

interface State {
  current_channel: Channel,
  my_channels: Array<Channel>
}

const state: State = {
  current_channel: new Channel(),
  my_channels: []
}

const getters = {
  getChannels(state: State): Array<Channel> {
    return state.my_channels
  }
}


const actions: ActionTree<State, object> = {
  getChannels({ commit }, secret=user.state.current_user.id) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(Channel)
      let user_query = new Parse.Query(ParseUser)
      user_query.get(secret, {
        success: function(res:ParseUser){
          query.equalTo('createdBy', res)
          query.find({
            success: function(results: Array<Channel>) {
              resolve(results)
              commit(types.CHANNELS, results)
            }
          })
        },
        error: function(err:any){
          reject("user not found")
        }
      })
    })
  }
}

const mutations = {
  [types.CHANNELS](_state: State, channels: Array<Channel>) {
    _state.my_channels = channels
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
