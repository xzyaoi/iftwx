import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/pages/Container'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Container
    }]
})