import { Axios } from './axios'
import { create_pass_url, read_pass_url, create_policy_url } from './endpoints'

function createPass(passTitle: String, channelId: String, vaultName: String, password: String, token: String): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.post(create_pass_url, {
      channelId: channelId,
      vaultName: vaultName,
      password: password,
      passtitle: passTitle,
      token: token
    }).then(function(res) {
      console.log(res)
      resolve(res)
    }).then(function(err) {
      console.log(err)
      reject(err)
    })
  })
}

function readPass(passTitle: String, token: String, vaultName: String, channelId: String): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.post(read_pass_url, {
      channelId: channelId,
      vaultName: vaultName,
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

function createPolicy(channelId: String, vaultName: String): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.post(create_policy_url, {
      channelId: channelId,
      vaultName: vaultName,
    })
  }).then(function(res) {
    console.log(res)
    resolve(res)
  }).then(function(err) {
    console.error(err)
    reject(err)
  })
}

export {
  createPass,
  readPass,
  createPolicy
}