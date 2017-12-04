<template>
<div class="container">
      <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item>
        频道管理
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        创建频道
      </v-breadcrumbs-item>
    </v-breadcrumbs>
<v-stepper v-model="create_step" vertical class="create_channel_container">
    <v-stepper-step step="1" v-bind:complete="create_step > 1">
      选择一个应用
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card flat>
        <v-btn
          :color="selected_app==='github'?'primary':'blue-grey'"
          class="white--text"
          @click="chooseApp('github')"
        >
        Github
        <v-icon right dark>fa-github</v-icon>
        </v-btn>
        <v-btn
          :color="selected_app==='gitlab'?'primary':'blue-grey'"
          class="white--text"
          @click="chooseApp('gitlab')"
        >
        Gitlab
        <v-icon right dark>fa-gitlab</v-icon>
        </v-btn>
        <v-btn
          :color="selected_app==='travis'?'primary':'blue-grey'"
          class="white--text"
          @click="chooseApp('travis')"
        >
        Travis
        <v-icon right dark>fa-code</v-icon>
        </v-btn>
        <v-btn
          :color="selected_app==='coding'?'primary':'blue-grey'"
          class="white--text"
          @click="chooseApp('coding')"
        >
        Coding
        <v-icon right dark>fa-code</v-icon>
        </v-btn>
        <v-btn
          :color="selected_app==='sdk'?'primary':'blue-grey'"
          class="white--text"
          @click="chooseApp('sdk')"
        >
        SDK
        <v-icon right dark>fa-code</v-icon>
        </v-btn>
        <v-text-field
          name="channelName"
          label="频道名称"
          v-model="channel_name"
          id="ChannelName"
        ></v-text-field>
      </v-card>
      <v-btn color="primary" @click="next(2)">继续</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" v-bind:complete="create_step > 2">设置Webhook<small>或使用<a href="/sdk">SDK</a></small></v-stepper-step>
    <v-stepper-content step="2">
      <v-card flat v-if="selected_app !== 'sdk'">
        您的Webhook地址: {{channel_hook}}</br>
        具体使用方法请参照 <a href="https://blog.zhitantech.com/zhulijun-get-notifications/">使用帮助</a>
      </v-card>
      <v-card flat v-if="selected_app === 'sdk'">
        您的频道ID为: {{channel_id}}</br>
        具体使用方法请参照 <a href="https://github.com/zhitantech/wxpush-sdk-py/">使用帮助</a></br>
        请遵照相关法律法规进行消息推送。
      </v-card>
      <v-btn color="primary" @click.native="next(3)">继续</v-btn>
      <v-btn flat @click.native="previous(1)">上一步</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" v-bind:complete="create_step > 3">获取二维码</v-stepper-step>
    <v-stepper-content step="3">
      <v-card flat>
        扫描如下二维码即可关注 {{channel_name}} </br>
        <img :src="channel_qrcode_url" alt="助理君.png" title="助理君.png"></img>
        </br>
        并可分享给朋友
      </v-card>
      <v-btn flat @click.native="previous(2)">上一步</v-btn>
    </v-stepper-content>
  </v-stepper>
  </div>
</template>

<script lang="ts">
import { Parse } from '../../apis/parse'
import Vue from 'vue'
import { Channel, CreateChannelPayload } from '../../models/channel'
export default Vue.extend({
  data: ()=>({
    create_step:1,
    selected_app:'',
    channel_name:'',
    channel_id:'',
    channel_hook:'',
    channel_qrcode_url:''
  }),
  methods:{
    chooseApp(appName: string) {
      if(appName === this.selected_app){
        this.selected_app = ''
      } else {
        this.selected_app = appName
      }
    },
    next(step: number) {
      if(step === 2){
        this.createChannel()
      } else if (step === 3){
        this.getQRCode()
      }
      this.create_step = step
    },
    previous(step: number) {
      this.create_step = step
    },
    createChannel() {
      let app_id = ''
      let self = this
      if( this.selected_app === 'github' || this.selected_app === 'gitlab'){
        app_id = '9FDEfuTrGZ'
      } else if (this.selected_app === 'travis') {
        app_id = 'MZieRFdSbL'
      } else if (this.selected_app === 'ztodo') {
        app_id = 'CdT0tHYNTD'
      } else {
        app_id = 'dLy5IeZT9H'
      }
      let channel_payload : CreateChannelPayload = {
        channel_name: this.channel_name,
        app_id: app_id
      }
      this.$store.dispatch('createChannel', channel_payload).then(function(res: Channel){
        console.log(res)
        self.channel_id = res.id
        self.channel_hook = 'https://zt-webhook.herokuapp.com/'+ self.selected_app+'/'+ self.channel_id
      })
    },
    getQRCode(){
      let self = this
      if(this.channel_id!='') {
        this.$store.dispatch('acquireChannelQRCode',this.channel_id).then(function(res: any){
          self.channel_qrcode_url = res.data.result
        })
      } else {
        console.error('[error]: Channel ID Not Provided')
      }
    }
  }
})
</script>

<style scopedSlots>

.create_channel_container {
  width:100%;
}

</style>
