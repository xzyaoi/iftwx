<template>
<div class="container">
  <v-layout row justify-center>
    <v-dialog v-model="is_create_dialog_open" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">创建保险柜</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="保险柜名称" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-checkbox label="是否公开" v-model="is_public" light></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
          <small>* 为必填项</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="is_create_dialog_open = false">放弃</v-btn>
          <v-btn color="blue darken-1" flat @click.native="is_create_dialog_open = false">完成</v-btn>
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
        保险柜列表
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  <v-card class="channel_container">
  <v-card-title>
    我的保险柜
      <v-spacer></v-spacer>
        <v-select
            v-model="selected_channel"
            label="选择一个频道"
            combobox
            :items="select_items"
            item-value="name"
            autocomplete
        ></v-select>
        <v-btn color="blue darken-1" flat="flat" @click="createVault">创建保险柜</v-btn>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="listedChannel"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.objectId }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.createdAt }}</td>
        <td class="text-xs-left">{{ props.item.follower.length }}</td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script lang="ts">
import store from "../../store";
import router from "../../router";
import { Channel } from "../../models/channel";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    listedChannel: [],
    select_items: [],
    selected_channel: "",
    is_create_dialog_open : false,
    is_public: false,
    max25chars: (v: string) => v.length <= 25 || "Input too long!",
    search: "",
    tmp: "",
    pagination: {},
    headers: [
      {
        text: "频道ID",
        align: "left",
        sortable: false,
        value: "objectId"
      },
      { text: "频道名", value: "name", align: "left" },
      { text: "创建时间", value: "createdAt", align: "left" },
      { text: "关注人数", value: "follower", align: "left" }
    ]
  }),
  methods: {
    createVault() {
      this.is_create_dialog_open = true
    },
    getChannels() {
      let self = this;
      store.dispatch("getChannels").then(function(res) {
        self.listedChannel = res.map(function(each: Channel) {
          return each.toJSON();
        });
        self.select_items = res.map(function(each: Channel) {
          return each.toJSON().name;
        });
        console.log(self.listedChannel);
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
