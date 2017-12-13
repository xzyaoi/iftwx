<template>
<div class="container">
  <v-layout row justify-center>
    <v-dialog v-model="is_request_dialog_open" max-width="500px">
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-progress-circular indeterminate v-bind:size="70" v-bind:width="3" color="primary"></v-progress-circular>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>密码请求状态</v-list-tile-title>
              <v-list-tile-sub-title>{{check_password_status}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if=" request_serial!=='' ">
          <v-list-tile>
            <p v-if=" request_serial!=='' ">请求序号：{{ request_serial }}</p>
          </v-list-tile>
          <v-list-tile>
            <p v-if=" request_token!=='' ">请求令牌：{{ request_token }}</p>
          </v-list-tile>
          <v-list-tile>
            <p v-if=" read_password!=='' ">返回密码：<B>{{ read_password }}</B></p>
          </v-list-tile>
        </v-list>
        <v-list v-if=" request_serial=='' ">
          <v-list-tile>
          等待管理员通过
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="is_request_dialog_open = false">放弃</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  <v-layout row justify-center>
    <v-dialog v-model="is_create_dialog_open" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">创建密码</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="密码标题" required v-model="secret_title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="值" required
                  :append-icon="visible_pass ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visible_pass = !visible_pass)"
                  :type="visible_pass ? 'password' : 'text'"
                  v-model="secret_value"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          * 为必填项
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="is_create_dialog_open = false">放弃</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submitSecrets()">完成</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  <v-breadcrumbs>
    <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item>
        Team Vault
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        {{vault_name}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  <v-card class="channel_container">
  <v-card-title>
    {{vault_name}}
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
        <v-btn color="blue darken-1" flat="flat" @click="createSecret()">创建密码</v-btn>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="listedSecrets"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.objectId }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.createdAt }}</td>
        <td class="text-xs-left"><v-btn flat color="primary" @click="viewPassword(props.item.objectId, props.item.name)">查看</v-btn></td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        从第 {{ pageStart }} 个到第 {{ pageStop }} 个
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script lang="ts">
import Vue from "vue"
import store from "../../store"
import vaultStore from '../../store/modules/vault'
import router from "../../router"
import { Channel } from "../../models/channel"
import { Vault, Secret, CreateVaultPayload, CreateSecretPayload, ReadPasswordPayload } from "../../models/vault"
export default Vue.extend({
  data: () => ({
    listedSecrets: [],
    select_items: [],
    select_items_name:[],
    check_password_status: "启动连接",
    request_serial:'',
    request_token:'',
    selected_channel: "",
    is_create_dialog_open : false,
    is_request_dialog_open : false,
    secret_title:'',
    secret_value:'',
    vault_name:'',
    visible_pass:false,
    max25chars: (v: string) => v.length <= 25 || "太长啦",
    search: "",
    tmp: "",
    pagination: {},
    view_password_title:'',
    view_channel_id:'',
    read_password:'',
    headers: [
      {
        text: "密码ID",
        align: "left",
        sortable: false,
        value: "objectId"
      },
      { text: "密码标题", value: "name", align: "left" },
      { text: "创建时间", value: "createdAt", align: "left" },
    ]
  }),
  methods: {
    createSecret() {
      this.is_create_dialog_open = true
    },
    viewPassword(objectId: string, passTitle:string) {
      this.is_request_dialog_open = true
      this.view_password_title = passTitle
      this.initSocketWatcher()
      this.check_password_status = '等待管理员确认'
      store.dispatch('applyForSecret',objectId)
    },
    submitSecrets() {
      this.is_create_dialog_open = false
      let payload: CreateSecretPayload = {
        vault_id: this.$route.params.vault_id,
        secret_name: this.secret_title,
        secret_value:this.secret_value
      }
      store.dispatch("createSecret",payload).then(function(res) {
        console.log(res)
      })
    },
    getSecrets() {
      let self = this
      store.dispatch("getSecretsbyVault",this.$route.params.vault_id).then(function(res){
        self.listedSecrets = res.map(function(each: Secret) {
          return each.toJSON()
        })
      })
    },
    getVaultName() {
      for(let index in vaultStore.state.my_vaults) {
        if(vaultStore.state.my_vaults[index].id === this.$route.params.vault_id) {
          this.vault_name = vaultStore.state.my_vaults[index].toJSON().name
          this.view_channel_id = vaultStore.state.my_vaults[index].toJSON().channel.objectId
        }
      }
    },
    readPassword() {
      let self = this
      let payload: ReadPasswordPayload = {
        passTitle: this.view_password_title,
        channelId: this.view_channel_id,
        vaultId: this.$route.params.vault_id,
        token: this.request_token,
      }
      store.dispatch('readPassword',payload).then(function(res){
        console.log(res)
        self.check_password_status = '请求成功'
        self.read_password = res.data.data.value
      })
    },
    initSocketWatcher() {
      let self = this
      store.dispatch('getAuthResult').then(function(res) {
        console.log(res)
        self.request_token = res.auth.client_token
        self.request_serial = res.request_id
        self.check_password_status = '请求密码中'
        self.readPassword()
      })
    }
  },
  created() {
    this.getSecrets()
    this.getVaultName()
  }
});
</script>

<style scopedSlots>
.channel_container {
  width: 100%;
  margin-top: 0px;
}
</style>
