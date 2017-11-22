import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/pages/Login.vue'
import Container from '@/pages/Container.vue'
import MessageApp from '@/pages/MessageApp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/app',
      name:'App',
      component:Container,
      children:[
        {
          path:'message',
          name:'Message',
          component:MessageApp
        }
      ]
    }
  ]
})
