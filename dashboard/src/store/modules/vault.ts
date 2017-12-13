import { ActionTree } from 'vuex'
import * as types from '../mutation-types'
import { Parse } from '../../apis/index'
import { ParseUser }  from '../../models/user'
import { Channel }  from '../../models/channel'
import { Vault, Secret, CreateVaultPayload, CreateSecretPayload, RequestTokenPayload, ReadPasswordPayload } from '../../models/vault'
import user from './user'
import channel from './channel'
import { createPolicy, readPass, createPass } from '../../apis/vault.api'
import { singleSocket } from '../../apis/socket'

export interface State {
    my_vaults: Array<Vault>;
    attended_vaults: Array<Vault>;
    vaults_secrets: Array<Secret>;
}


const state: State = {
  my_vaults: [],
  attended_vaults: [],
  vaults_secrets:[],
}

const getters = {

}

function getVaultByChannel(_channel: Channel): any {
  return new Promise((resolve, reject) => {
    let vault_query = new Parse.Query(Vault)
    vault_query.equalTo('channel', _channel)
    vault_query.find({
      success: function(res: Vault) {
        resolve(res)
      },
      error: function(err: Error) {
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
          let channel_query = new Parse.Query(Channel)
          channel_query.get(payload.channel_id, {
            success: function(_channel: Channel) {
              let vault = new Vault()
              vault.set('channel', _channel)
              vault.set('createdBy', res)
              vault.set('name', payload.vault_name)
              vault.set('isPublic', payload.is_public)
              vault.save(null, {
                success: function(_vault: Vault) {
                  createPolicy(_channel.id, _vault.id)
                  resolve(_vault)
                },
                error: function(err: Error) {
                  console.warn(err)
                  reject(err)
                }
              })
            },
            error: function(err: Error) {
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
  getMyVaults({ commit }, secret = user.state.current_user.id) {
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
  getAttendedVaults({ commit }, secret = user.state.current_user.id) {
    return new Promise((resolve, reject) => {
      let attended_channels = channel.state.attended_channels
      let acquire_channels_promise: Array<any> = []
      for (let index = 0; index < attended_channels.length; index++) {
        let p_acquire = getVaultByChannel(attended_channels[index])
        acquire_channels_promise.push(p_acquire)
      }
      Promise.all(acquire_channels_promise).then(values => {
        commit(types.ATTENDED_VAULTS, values)
        resolve(values)
      })
    })
  },

  createSecret({ commit }, payload: CreateSecretPayload) {
    return new Promise((resolve, reject) => {
      if (typeof user.state.current_user === 'undefined' || user.state.current_user === null) {
        reject(new Error('user not logined'))
      }
      let vault_query = new Parse.Query(Vault)
      vault_query.get(payload.vault_id, {
        success: function(res: Vault) {
          let secret = new Secret()
          let createdBy = new ParseUser()
          let vault = new Vault()
          console.log(payload)
          console.log(payload.secret_name)
          console.log(res.toJSON())
          console.log(payload.vault_id)
          console.log(payload.secret_value)
          createPass(payload.secret_name,res.toJSON().channel.objectId,payload.vault_id, payload.secret_value)
          secret.set('vault', Vault)
          createdBy.set('id', user.state.current_user.id)
          vault.set('id', payload.vault_id)
          secret.set('createdBy', createdBy)
          secret.set('name', payload.secret_name)
          secret.set('vault', vault)
          secret.save(null, {
            success: function(_secret: Secret) {
              console.log('success')
              resolve(_secret)
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

  getSecretsbyVault({ commit }, vaultid:string) {
    return new Promise((resolve, reject) => {
      if (typeof user.state.current_user === 'undefined' || user.state.current_user === null) {
        reject(new Error('user not logined'))
      }
      let secret_query = new Parse.Query(Secret)
      let vault = new Vault()
      vault.set('id', vaultid)
      secret_query.equalTo('vault', vault)
      secret_query.find({
        success: function(res: Array<Secret>) {
          resolve(res)
          commit(types.SECRETS,res)
        },
        error: function(err: Error) {
          reject(err)
        }
      })
    })
  },

  applyForSecret({commit}, secretId:string) {
    let secret_query = new Parse.Query(Secret)
    secret_query.include("vault")
    secret_query.get(secretId,{
      success:function(res:any) {
        let pojo_res = res.toJSON()
        let vault_query = new Parse.Query(Vault)
        vault_query.include('createdBy')
        vault_query.get(pojo_res.vault.objectId,{
          success: function(vault:any) {
            let pojo_vault = vault.toJSON()
            let payload:RequestTokenPayload = {
              secret_name: pojo_res.name,
              reviewerWxId: pojo_vault.createdBy.wxOpenId,
              channelId: pojo_vault.channel.objectId,
              vaultId: pojo_vault.objectId,
              applyFrom: user.state.current_user.id,
            }
            singleSocket.send("requestToken",{data:payload})
          },
          error:function(err: Error) {
            console.error(err)
          }
        })
      },
      error:function(err: Error) {
        console.error(err)
      }
    })
  },
  getAuthResult({commit}) {
    return new Promise((resolve, reject) => {
      singleSocket.receive('auth_progress_success').then(function(res: any){
        console.log(res)
        resolve(res)
      })
    })
  },
  readPassword({commit}, payload:ReadPasswordPayload) {
    return new Promise((resolve, reject) => {
      readPass(payload.passTitle, payload.token,payload.vaultId,payload.channelId).then(function(res){
        resolve(res)
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
  },
  [types.SECRETS](_state: State, secrets: Array<Secret>) {
    _state.vaults_secrets = secrets
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
}
