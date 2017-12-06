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
                <v-select
                  v-model="create_selected_channel"
                  label="选择一个保险柜*"
                  combobox
                  :items="select_items_name"
                  item-value="name"
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="密码标题" required v-model="vault_name"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          * 为必填项
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="is_create_dialog_open = false">放弃</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submitSecret()">完成</v-btn>
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
        <v-select
            v-model="selected_channel"
            label="选择一个频道"
            combobox
            :items="select_items_name"
            item-value="name"
            autocomplete
        ></v-select>
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
import router from "../../router"
import { Channel } from "../../models/channel"
import { Vault, CreateVaultPayload } from "../../models/vault"
export default Vue.extend({
  data: () => ({
    listedVault: [],
    select_items: [],
    select_items_name:[],
    selected_channel: "",
    is_create_dialog_open : false,
    is_public: false,
    vault_name:'',
    create_selected_channel:'',
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
    submitVault() {
      if(this.create_selected_channel === "") {
        return;
      }
      let channel_id = ''
      let vault_items:Array<any> = this.select_items
      for(let index in vault_items) {
        if (vault_items[index].name === this.create_selected_channel) {
          channel_id = vault_items[index].objectId
        }
      }
      this.is_create_dialog_open = false
      let create_vault_payload: CreateVaultPayload = {
        vault_name: this.vault_name,
        channel_id:channel_id,
        is_public: this.is_public
      }
      store.dispatch("createVault", create_vault_payload).then(function(res){
        console.log(res)
      })
    },
    getChannels() {
      let self = this;
      store.dispatch("getVaults").then(function(res) {
        self.listedVault = res.map(function(each: Channel) {
          return each.toJSON()
        });
        self.select_items = res.map(function(each: Channel) {
          return each.toJSON()
        });
        self.select_items_name = res.map(function(each: Channel) {
          return each.toJSON().name
        });
      });
    }
  },
  created() {
    this.getChannels();
  }
});
</script>

<style scopedSlots>
.channel_container {
  width: 100%;
  margin-top: 0px;
}
</style>
