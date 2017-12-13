let functions_base_url = 'https://cloud.yice.org.cn/zhulijun/functions'
let acquire_qrcode_url = functions_base_url + '/acquire_qrcode'
let vault_base_url = 'https://ztvault.herokuapp.com/'
let create_pass_url = vault_base_url + 'createPass'
let read_pass_url = vault_base_url + 'readPass'
let create_policy_url = vault_base_url + 'createPolicy'

export {
  acquire_qrcode_url,
  create_pass_url,
  read_pass_url,
  create_policy_url
}
