<template>
<div>
<p>关注助理君，发送secret得到密钥</p>
  <md-input-container>
    <label>Secret</label>
    <md-input v-model="secret"></md-input>
  </md-input-container>
</div>
</template>

<script>
export default {
data(){
  return {
    secret :''
  }
}
}
</script>

<style>

</style>
