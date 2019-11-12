import Vue from 'vue'
import Router from 'vue-router'
import Onekey from '@/components/onekey'

Vue.use(Router)

export const onekeySaveRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Onekey',
      component: Onekey
    }
  ]
})
