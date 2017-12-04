<template>
<div class="container">
      <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item>
        Team Vault
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        目录列表
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class="channel_container">
    <v-card-title>
      我的应用
      <v-spacer></v-spacer>
        <v-select
            v-model="selected_channel"
            label="选择一个频道"
            combobox
            :items="select_items"
            item-value="name"
            autocomplete
        ></v-select>
        <v-btn color="green darken-1" flat="flat">创建目录</v-btn>
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
import store from '../../store'
import router from '../../router'
import { Channel } from '../../models/channel'
import Vue from 'vue'
export default Vue.extend({
  data: ()=>({
    listedChannel: [],
    select_items:[],
    selected_channel: '',
    max25chars: (v:string) => v.length <= 25 || 'Input too long!',
    search: '',
    tmp: '',
    pagination: {},
    headers: [
          {
            text: '频道ID',
            align: 'left',
            sortable: false,
            value: 'objectId'
          },
          { text: '频道名', value: 'name', align:'left' },
          { text: '创建时间', value: 'createdAt', align:'left' },
          { text: '关注人数', value: 'follower', align:'left' }
        ],

  }),
  methods: {
    getChannels() {
      let self = this
      store.dispatch('getChannels').then(function(res){
        self.listedChannel = res.map(function(each:Channel){
          return each.toJSON()
        })
        self.select_items = res.map(function(each:Channel){
          return each.toJSON().name
        })
        console.log(self.listedChannel)
      })
    }
  },
  created () {
    this.getChannels()
  },

})

</script>

<style scopedSlots>
.channel_container {
  width:100%;
  margin-top:0px;
}
</style>
