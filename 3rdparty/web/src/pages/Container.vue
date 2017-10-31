<template>
  <div>
    <md-stepper @change="onNext">
      <md-step md-label="创建频道" md-button-continue="下一步" md-button-back="上一步">
          <p>关注助理君，发送secret得到密钥</br><img src="https://i.loli.net/2017/09/16/59bc037c05027.jpg" alt="qrcode_for_gh_fd92a353916b_258.jpg" title="qrcode_for_gh_fd92a353916b_258.jpg" />
</br></p>          
          <md-input-container>
            <label>Secret</label>
            <md-input v-model="secret"></md-input>
          </md-input-container>
          <md-input-container>
            <label>频道名称</label>
            <md-input v-model="channelName"></md-input>
          </md-input-container>
      </md-step>
      <md-step md-label="设置Webhook" md-button-continue="下一步" md-button-back="上一步">
        <div>
          <p>{{channelLink}}</p>
          </br>
          <md-button class="md-raised" @click="showGithubLink()">
            <md-icon md-iconset="fa fa-github"></md-icon>&nbsp;Github</md-button>
          <md-button class="md-raised" @click="showGitlabLink()">
            <md-icon md-iconset="fa fa-gitlab"></md-icon>&nbsp;Gitlab</md-button>
          <p>在Github或Gitlab的项目设置页中，将链接复制至图中Payload URL处，按如下方式设置:</br><img src="https://i.loli.net/2017/09/16/59bc027392ecc.png" alt="助理君.png" title="助理君.png" />
          </br>
          </p>
        </div>
      </md-step>
      <md-step md-label="关注&分享" md-button-continue="下一步" md-button-back="上一步">
        <p>扫描二维码即可订阅</br><img :src="qrcode" alt="助理君.png" title="助理君.png" /></br>并可分享给朋友</p>
      </md-step>
    </md-stepper>
    <md-dialog-alert :md-content="alertContent" :md-ok-text="alertOk" ref="alertDialog">
    </md-dialog-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      secret: '',
      channelName: '',
      channelLink: '',
      alertContent: 'content',
      alertOk: '好的',
    }
  },
  components: {
  },
  computed: {
    channel: function() {
      return this.$store.state.user.current_channel
    },
    qrcode:function(){
      return this.$store.state.user.qrcode_url
    }
  },
  methods: {
    showGithubLink: function() {
      if (this.channel.objectId) {
        this.channelLink = 'https://zt-webhook.herokuapp.com/github/' + this.channel.objectId
      }
      else {
        this.alertContent = "您输入的参数有误，请检查您的secret是否有误。"
        this.openDialog('alertDialog')
      }
    },
    showGitlabLink: function() {
      if (this.channel.objectId) {
        this.channelLink = 'https://zt-webhook.herokuapp.com/gitlab/' + this.channel.objectId
      }
      else {
        this.alertContent = "您输入的参数有误，请检查您的secret是否有误。"
        this.openDialog('alertDialog')
      }
    },
    onNext: function(num) {
      if (num == 1) {
        this.submitChannel()
      }
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    submitChannel: function() {
      if (this.secret && this.channelName) {
        var userData = {
          secret: this.secret,
          channelName: this.channelName
        }
        this.$store.dispatch('createChannel', userData)
      }
    }
  }
}
</script>

<style>

</style>

