<template>
  <v-app>
    <v-layout row class="login_container">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media src="https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline">登录</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-flex>
              <v-text-field name="secret" label="Secret" id="secret" v-model="secret"></v-text-field>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="submit(secret)">登录</v-btn>
            <v-btn flat color="purple">微信登录</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              在助理君微信公众号内回复: secret 即可获取你的私人密钥。<b>请务必妥善保管。</b>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import store from '../store'
import router from '../router'
export default {
  data: () => ({
    show: false,
    secret:'',
  }),
  methods: {
    submit(secret:string) {
      store.dispatch('logIn',secret).then(function(res){
        router.push('/app')
      })
    }
  }
}
</script>

<style scopedSlots>
  body {
    background: #666 !important;
  }

  .login_container {
    margin-top: 60px;
  }
</style>