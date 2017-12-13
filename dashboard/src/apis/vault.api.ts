import { Axios } from './axios'
import { create_pass_url, read_pass_url, create_policy_url } from './endpoints'

function createPass(passTitle: String, channelId: String, vaultId: String, password: String): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('creating pass')
    Axios.post(create_pass_url, {
      channelId: channelId,
      vaultId: vaultId,
      password: password,
      passtitle: passTitle,
    }).then(function(res) {
      console.log(res)
      resolve(res)
    }).then(function(err) {
      console.log(err)
      reject(err)
    })
  })
}

function readPass(passTitle: String, token: String, vaultId: String, channelId: String): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.post(read_pass_url, {
      channelId: channelId,
      vaultId: vaultId,
      passtitle: passTitle,
      token: token
    }).then(function(res) {
      console.log(res)
      resolve(res)
    }).then(function(err) {
      console.error(err)
      reject(err)
    })
  })
}

function createPolicy(channelId: String, vaultId: String): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.post(create_policy_url, {
      channelId: channelId,
      vaultId: vaultId,
    }).then(function(res) {
      console.log(res)
      resolve(res)
    }).then(function(err) {
      console.error(err)
      reject(err)
    })
  })
}

export {
  createPass,
  readPass,
  createPolicy
}
