<template>
<v-stepper v-model="create_step" vertical class="create_channel_container">
    <v-stepper-step step="1" v-bind:complete="create_step > 1">
      选择一个应用
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card height="200px" flat>
        <v-btn
          color="blue-grey"
          class="white--text"
        >
        Github
        <v-icon right dark>fa-github</v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="white--text"
        >
        Gitlab
        <v-icon right dark>fa-gitlab</v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="white--text"
        >
        Travis
        <v-icon right dark>fa-code</v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="white--text"
        >
        Coding
        <v-icon right dark>fa-code</v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="white--text"
        >
        SDK
        <v-icon right dark>fa-code</v-icon>
        </v-btn>
        <v-text-field
          name="channelName"
          label="频道名称"
          id="ChannelName"
        ></v-text-field>
      </v-card>
      <v-btn color="primary" @click.native="create_step = 2">继续</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" v-bind:complete="create_step > 2">设置Webhook<small>或使用<a href="/sdk">SDK</a></small></v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click.native="create_step = 3">继续</v-btn>
      <v-btn flat @click.native="create_step = 1">取消</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" v-bind:complete="create_step > 3">获取二维码</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click.native="create_step = 4">继续</v-btn>
      <v-btn flat @click.native="create_step = 2">取消</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script lang="ts">
import { Parse } from '../../apis/parse'
import Vue from 'vue'
export default Vue.extend({
  data: ()=>({
    create_step:1
  })
})
</script>

<style scopedSlots>

.create_channel_container {
  width:100%;
}

</style>
