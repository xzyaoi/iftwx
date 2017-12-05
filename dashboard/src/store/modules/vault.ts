import { ActionTree } from 'vuex'
import * as types from '../mutation-types'
import { Parse } from '../../apis/index'
import { ParseUser }  from '../../models/user'
import { Channel }  from '../../models/channel'
import { Vault, Secret, CreateVaultPayload } from '../../models/vault'
import user from './user';

export interface State {
    my_vaults: Array<Vault>;
}


const state: State = {
  my_vaults: []
}

const getters = {

}

const actions: ActionTree<State, object> = {
  createVault({ commit }, payload: CreateVaultPayload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      let user_query = new Parse.Query(ParseUser)
      user_query.get(user.state.current_user.id, {
        success: function(res: ParseUser) {
          console.log(res)
          let channel_query = new Parse.Query(Channel)
          channel_query.get(payload.channel_id, {
            success: function(channel: Channel) {
              console.log(channel)
              let vault = new Vault()
              vault.set('channel', channel)
              vault.set('createdBy', res)
              vault.set('name', payload.vault_name)
              vault.set('isPublic', payload.is_public)
              vault.save(null, {
                success: function(_vault: Vault) {
                  resolve(_vault)
                },
                error: function(err: Error) {
                  console.warn(err)
                  reject(err)
                }
              })
            },
            error:function(err: Error) {
              console.log(err)
              reject(err)
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
  getVaults({commit}, secret = user.state.current_user.id) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(Vault)
      let user_query = new Parse.Query(ParseUser)
      user_query.get(secret, {
        success: function(res: ParseUser) {
          query.equalTo('createdBy', res)
          query.find({
            success: function(results: Array<Vault>) {
              resolve(results)
              commit(types.VAULTS, results)
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
  getAttendedVaults({commit}, secret = user.state.current_user.id) {

  }
}

const mutations = {
  [types.VAULTS](_state: State, vaults: Array<Vault>) {
    _state.my_vaults = vaults
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
