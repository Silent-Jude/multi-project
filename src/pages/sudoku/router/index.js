import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../home')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../home/GoodsContractAgreement')
    }
  ]
})

