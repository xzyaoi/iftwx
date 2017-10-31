<template>
<div>
  <v-carousel>
    <v-carousel-item v-for="(item,i) in pics" v-bind:src="item.src" :key="i"></v-carousel-item>
  </v-carousel>
      <v-btn color="primary" dark v-on:click="login()">
        </br>
        <i class="fa fa-steam" aria-hidden="true"></i>
          通过STEAM账号登录
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
      pics: [{ src: "http://ac-cTnCn1vq.clouddn.com/782a7df26c49fd004ed2.png" }]
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

</style>