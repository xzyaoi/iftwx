import user from './user';
import * as types from '../mutation-types';
import { Parse, Axios } from '../../apis/index'
import { acquire_qrcode_url } from '../../apis/endpoints'
import { ActionTree } from 'vuex'
import { Channel, CreateChannelPayload } from '../../models/channel'
import { ParseUser } from '../../models/user';
import { App } from '../../models/app'


interface State {
  current_channel: Channel;
  my_channels: Array<Channel>;
  attended_channels: Array<Channel>;
}

const state: State = {
  current_channel: new Channel(),
  my_channels: [],
  attended_channels: []
}

const getters = {

}

const actions: ActionTree<State, object> = {
  getChannels({ commit }, secret = user.state.current_user.id) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(Channel)
      let user_query = new Parse.Query(ParseUser)
      user_query.get(secret, {
        success: function(res: ParseUser) {
          query.equalTo('createdBy', res)
          query.find({
            success: function(results: Array<Channel>) {
              resolve(results)
              commit(types.CHANNELS, results)
            },
            error: function(err: Error) {
              console.log(err)
              reject(err)
            }
          })
        },
        error: function(err: Error) {
          reject(err)
        }
      })
    })
  },
  createChannel({ commit }, payload: CreateChannelPayload) {
    return new Promise((resolve, reject) => {
      let user_query = new Parse.Query(ParseUser)
      user_query.get(user.state.current_user.id, {
        success: function(res: ParseUser) {
          let app_query = new Parse.Query(App)
          app_query.get(payload.app_id, {
            success: function(app: App) {
              let channel = new Channel()
              channel.set('app', app)
              channel.set('name', payload.channel_name)
              channel.set('createdBy', res)
              channel.set('follower', [])
              channel.save(null, {
                success: function(_channel: Channel) {
                  resolve(_channel)
                },
                error: function(err: Error) {
                  console.warn(err)
                  reject(err)
                }
              })
            }
          })
        },
        error: function(err: Error) {
          console.warn(err)
          reject(err)
        }
      })
    })
  },
  acquireChannelQRCode({ commit }, channelId: string) {
    return new Promise((resolve, reject) => {
      Axios.post(acquire_qrcode_url, {
        channelId: channelId
      }).then(function(result) {
        resolve(result)
      }).then(function(err) {
        reject(err)
      })
    })
  },
  getAttendedChannels({ commit }, user_ctx: ParseUser = user.state.current_user) {
    return new Promise((resolve, reject) => {
      let user_query = new Parse.Query(ParseUser)
      user_query.equalTo('wxOpenId', user_ctx.toJSON().wxOpenId)
      user_query.first({
        success: function(res: ParseUser) {
          let query = new Parse.Query(Channel)
          query.equalTo('follower', user_ctx.toJSON().wxOpenId)
          query.notEqualTo('createdBy', res)
          query.find({
            success: function(results: Array<Channel>) {
              resolve(results)
              commit(types.ATTENDED_CHANNELS, results)
            },
            error: function(err: Error) {
              console.log(err)
              reject(err)
            }
          })
        },
        error: function(err: Error) {
          reject(err)
        }
      })
    })
  }
}

const mutations = {
  [types.CHANNELS](_state: State, channels: Array<Channel>) {
    _state.my_channels = channels
  },
  [types.ATTENDED_CHANNELS](_state: State, channels: Array<Channel>) {
    _state.attended_channels = channels
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
