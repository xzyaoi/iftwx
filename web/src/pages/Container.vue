<template>
  <md-stepper>
  <md-step md-label="获取密钥" md-button-continue="下一步" md-button-back="上一步">
    <secret></secret>
  </md-step>
  <md-step md-label="设置Webhook" md-button-continue="下一步" md-button-back="上一步">
    <codefrom></codefrom>
  </md-step>
  <md-step md-label="分享" md-button-continue="下一步" md-button-back="上一步">
    <qrcode></qrcode>
  </md-step>
</md-stepper>

</template>

<script>
import Secret from '@/pages/Secret'
import Codefrom from '@/pages/Codefrom'
import QRCode from '@/pages/QRCode'

export default {
components:{
  'secret' : Secret,
  'codefrom' : Codefrom,
  'qrcode': QRCode
}
}
</script>

<style>

</style>

