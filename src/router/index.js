import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Paydetail from '@/views/PayOk'

Vue.use(Router)
export default new Router({
  //mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true
    },
    {
      path: '/paydetail',
      name: '支付完成',
      component: Paydetail,
      hidden: true
    },
    {
      path: '/',
      name: '主页',
      component: Layout,
      children: [{
          path: '/home',
          component: () => import('@/views/Home'),
          name: '首页',
        },
        {
          path: '/report',
          component: () => import('@/views/Report'),
          name: '报表',
        },
        {
          path: '/member',
          component: () => import('@/views/Member'),
          name: '会员中心',
        },

      ],
    },
    {
      path: '/pos',
      name: '收款',
      component: () => import('@/views/Pos'),
      hidden: true
    },
    {
      path: '/pay',
      name: '支付',
      component: () => import('@/views/Pay'),
      hidden: true
    }
  ]
})
