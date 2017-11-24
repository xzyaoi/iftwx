import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Container from '@/pages/Container.vue'
import MessageApp from '@/pages/MessageApp.vue'
import MyChannelPage from '@/pages/Channels/MyChannel.vue'
import CreateChannel from '@/pages/Channels/CreateChannel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/app',
      name: 'App',
      component: Container,
      children: [
        {
          path: 'message',
          name: 'Message',
          component: MessageApp
        },
        {
          path: 'channel',
          name: 'Channel',
          component: MyChannelPage
        },
        {
          path: 'channel/create',
          name: 'CreateChannel',
          component: CreateChannel
        }
      ]
    }
  ]
})
