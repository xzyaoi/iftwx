<template>
  <md-stepper>
  <md-step>
    <secret></secret>
  </md-step>
  <md-step>
    <codefrom></codefrom>
  </md-step>
  <md-step>
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

