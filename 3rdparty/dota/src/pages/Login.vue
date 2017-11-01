<template>
<div class="login_container">
      <img  class="center_img" src="http://www.esportsonly.com/assets/Uploads/Articles/dota2_logo_trans.png"></img>
      <v-btn color="primary" dark v-on:click="login()">
        </br>
        <i class="fa fa-steam" aria-hidden="true"></i>
          通过 STEAM 账号登录
      </v-btn>
</div>
</template>

<script>
import { steam_login_url } from "@/service/apis";
import { axios } from "@/service";
export default {
  name: "app",
  data() {
    return {

    };
  },
  methods: {
    login() {
      // Axios to get the Login Path
      axios.post(steam_login_url, {}).then(function(result) {
        console.log(result)
        location.href = result.data.result;
      });
    }
  }
};
</script>

<style>
.center_img {
  margin-top:0px;
  width:100%;
  height:100%;
}
.login_container {
  width:100%;
}
</style>
