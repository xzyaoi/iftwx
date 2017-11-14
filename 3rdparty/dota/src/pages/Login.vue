<template>
<div class="login_container">
      <img  class="center_img" src="https://i.loli.net/2017/11/01/59f9dfdf6167a.png"></img>
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
var SteamID = require('@/utils/steamid')
export default {
  name: "app",
  data() {
    return {

    };
  },
  created(){
    try {
      var sid = new SteamID(this.$route.query["openid.claimed_id"].slice(36));
      if(sid){
        var user = {
            "steamid":sid.getSteam3RenderedID().split(":")[2].split("]")[0]
        }
        this.$store.dispatch('login',user)
      }
    } catch (error) {
      console.log(error)
    }

    
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
