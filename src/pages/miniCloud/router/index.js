import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Personal from '../pages/personal/Personal'
import Product from '../pages/product/Product'
import Statistics from '../pages/statistics/Statistics'
import Business from '../pages/statistics/Business'
import Reward from '../pages/statistics/Reward'
import Score from '../pages/statistics/Score'
import MyChannel from '../pages/personal/MyChannel'
import ApplyChannel from '../pages/personal/ApplyChannel'
import ApplyPartner from '../pages/personal/ApplyPartner'
import MySigned from '../pages/personal/MySigned'
import Notifications from '../pages/personal/Notifications'
import Protocol from '../pages/personal/Protocol'
import Signed from '../pages/personal/signed/signed'
import ProductRecomend from '../pages/product/ProductRecomend'
import Recharge from '../pages/product/Recharge'
import Flow from '../pages/product/Flow'
import Combo from '../pages/product/Combo'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/',
      redirect: '/product'
    },
    {
      path: '/product',
      component: Product
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/statistics',
      component: Statistics,
      // beforeEnter: (to, from, next) => {
      //   if (localStorage.getItem('uid')) {
      //     next()
      //   } else {
      //     next('/personal')
      //   }
      // },
      children: [
        // {
        //   path: '/',
        //   redirect: '/business'
        // },
        {
          path: '',
          redirect: 'business'
        },
        {
          name: 'business',
          path: 'business',
          component: Business
        },
        {
          name: 'reward',
          path: 'reward',
          component: Reward
        },
        {
          name: 'score',
          path: 'score',
          component: Score
        }
      ]
    }
    ]
  }, {
    path: '/myChannel',
    component: MyChannel

  }, {
    path: '/applyChannel',
    component: ApplyChannel
  }, {
    path: '/applyPartner',
    component: ApplyPartner
  }, {
    path: '/mySigned',
    component: MySigned
  }, {
    path: '/notificationsCenter',
    component: Notifications
  }, {
    path: '/protocol',
    component: Protocol
  },
  {
    path: '/signed',
    component: Signed
  },
  {
    path: '/productRecomend',
    component: ProductRecomend
  },
  {
    path: '/recharge',
    component: Recharge
  },
  {
    path: '/flow',
    component: Flow
  },
  {
    path: '/combo',
    component: Combo
  }
  ]
})
