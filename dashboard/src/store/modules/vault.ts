import { ActionTree } from 'vuex'
import * as types from '../mutation-types'
import { Parse } from '../../apis/index'
import { ParseUser }  from '../../models/user'
import { Channel }  from '../../models/channel'
import { Vault, Secret, CreateVaultPayload, CreateSecretPayload } from '../../models/vault'
import user from './user';
import channel from './channel'
export interface State {
    my_vaults: Array<Vault>;
    attended_vaults: Array<Vault>;
}


const state: State = {
  my_vaults: [],
  attended_vaults:[]
}

const getters = {

}

function getVaultByChannel(channel:Channel):any {
  return new Promise((resolve, reject)=>{
    let vault_query = new Parse.Query(Vault)
    vault_query.equalTo('channel',channel)
    vault_query.find({
      success:function(res:Vault){
        resolve(res)
      },
      error:function(err:Error) {
        reject(err)
      }
    })
  })
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
  getMyVaults({commit}, secret = user.state.current_user.id) {
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
    return new Promise((resolve, reject)=>{
      let attended_channels = channel.state.attended_channels
      let acquire_channels_promise:Array<any> = []
      for (let index in attended_channels) {
        let p_acquire = getVaultByChannel(attended_channels[index])
        acquire_channels_promise.push(p_acquire)
      }
      Promise.all(acquire_channels_promise).then(values=>{
        commit(types.ATTENDED_VAULTS,values)
        resolve(values)
      })
    })
  },

  createSecret({commit},payload:CreateSecretPayload) {
    return new Promise((resolve, reject) => {
      if(typeof user.state.current_user === 'undefined' || user.state.current_user === null ){
        reject('user not logined')
      }
      let vault_query = new Parse.Query(Vault)
      vault_query.equalTo('objectId',payload.vault_id)
      vault_query.find({
        success: function(res:Vault){
          let secret = new Secret()
          let createdBy = new ParseUser()
          let vault = new Vault()
          secret.set('vault',Vault)
          createdBy.set('id',user.state.current_user.id)
          vault.set('id',payload.vault_id)
          secret.set("createdBy" , createdBy)
          secret.set("name",payload.secret_name)
          secret.set("vault",vault)
          secret.save(null, {
            success: function(_secret:Secret){
              resolve(_secret)
            },
            error: function(err: Error) {
              reject(err)
            }
          })
        },
        error: function(err:Error){
          reject(err)
        }
      })
    })
  }
}

const mutations = {
  [types.VAULTS](_state: State, vaults: Array<Vault>) {
    _state.my_vaults = vaults
  },
  [types.ATTENDED_VAULTS](_state: State, vaults: Array<Vault>) {
    _state.attended_vaults = vaults
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
