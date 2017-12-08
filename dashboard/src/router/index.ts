import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login.vue';
import Container from '@/pages/Container.vue';
import MessageApp from '@/pages/MessageApp.vue';
import MyChannelPage from '@/pages/Channels/MyChannel.vue';
import CreateChannel from '@/pages/Channels/CreateChannel.vue';
import Applist from '@/pages/TeamVault/Applist.vue';
import Audit from '@/pages/TeamVault/Audit.vue';
import Secretlist from '@/pages/TeamVault/Secretlist.vue';
import VaultDefault from '@/pages/TeamVault/Layout.vue';
import user from '../store/modules/user'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      redirect: '/Login'
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
          component: MessageApp,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'channel',
          name: 'Channel',
          component: MyChannelPage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'channel/create',
          name: 'CreateChannel',
          component: CreateChannel,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'vault',
          name: 'TeamVault',
          component: VaultDefault,
          children: [
            {
              path: 'applist',
              name: 'TV-Applist',
              component: Applist,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'audit',
              name: 'TV-Audit',
              component: Audit,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'secret/:vault_id',
              name: 'TV-Secret',
              component: Secretlist,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'default',
              name: 'TV-Default',
              component: Applist,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Check if user has logined there
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (user.state.current_user) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
});

export default router;
