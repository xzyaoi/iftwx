<template>
<div class="container">
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
        <v-btn color="blue darken-1" flat="flat" @click="createVault">创建密码</v-btn>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="listedVault"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.objectId }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.createdAt }}</td>
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
import { Vault, CreateVaultPayload,CreateSecretPayload } from "../../models/vault"
export default Vue.extend({
  data: () => ({
    listedVault: [],
    select_items: [],
    select_items_name:[],
    selected_channel: "",
    is_create_dialog_open : false,
    secret_title:'',
    secret_value:'',
    vault_name:'',
    visible_pass:false,
    max25chars: (v: string) => v.length <= 25 || "太长啦",
    search: "",
    tmp: "",
    pagination: {},
    headers: [
      {
        text: "保险柜ID",
        align: "left",
        sortable: false,
        value: "objectId"
      },
      { text: "保险柜名", value: "name", align: "left" },
      { text: "创建时间", value: "createdAt", align: "left" },
    ]
  }),
  methods: {
    createVault() {
      this.is_create_dialog_open = true
    },
    submitSecrets() {
      this.is_create_dialog_open = false
      let payload: CreateSecretPayload = {
        vault_id:this.$route.params.vault_id,
        secret_name: this.secret_title
      }
      store.dispatch("createSecret",payload).then(function(res) {
        console.log(res)
      })
    },
    getSecrets() {
      let self = this
    },
    getVaultName() {
      for(let index in vaultStore.state.my_vaults){
        if(vaultStore.state.my_vaults[index].id === this.$route.params.vault_id) {
          this.vault_name = vaultStore.state.my_vaults[index].toJSON().name
        }
      }
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
