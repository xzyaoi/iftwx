<template>
<v-card class="channel_container">
    <v-card-title>
      我的频道
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
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
</template>

<script lang="ts">
import store from '../../store'
import router from '../../router'
import { Channel } from '../../models/channel'
import Vue from 'vue'
export default Vue.extend({
  data: ()=>({
    listedChannel: [],
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
        console.log(res)
        self.listedChannel = res.map(function(each:Channel){
          return each.toJSON()
        })
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
