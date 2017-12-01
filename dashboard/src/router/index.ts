import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Container from '@/pages/Container.vue'
import MessageApp from '@/pages/MessageApp.vue'
import MyChannelPage from '@/pages/Channels/MyChannel.vue'
import CreateChannel from '@/pages/Channels/CreateChannel.vue'
import Applist from '@/pages/TeamVault/Applist.vue'
import Audit from '@/pages/TeamVault/Audit.vue'
import Secretlist from '@/pages/TeamVault/Secretlist.vue'
import VaultDefault from '@/pages/TeamVault/Container.vue'
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
        },
        {
          path: 'vault',
          name: 'TeamVault',
          children: [
            {
              path: 'applist',
              name: 'TV-Applist',
              component: Applist
            },
            {
              path: 'audit',
              name: 'TV-Audit',
              component: Audit
            },
            {
              path: 'secret',
              name: 'TV-Secret',
              component: Secretlist
            },
            {
              path: '',
              name: 'TV-Default',
              component: VaultDefault
            }
          ]
        }
      ]
    }
  ]
})
