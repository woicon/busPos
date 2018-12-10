import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Paydetail from '@/views/PayOk'
import Home from '@/views/Home'
import Member from '@/views/Member'
import Pay from '@/views/Pay'
import Pos from '@/views/Pos'
import Report from '@/views/Report'

Vue.use(Router)
export default new Router({
  mode: 'history',
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
          component: Home,
          name: '首页',
        },
        {
          path: '/report',
          component: Report,
          name: '报表',
        },
        {
          path: '/member',
          component: Member,
          name: '会员中心',
        },
        {
          path: '/pos',
          name: '收款',
          component: Pos,
          hidden: true
        },
      ],
    },

    {
      path: '/pay',
      name: '支付',
      component: () => import('@/views/Pay'),
      hidden: true
    }
  ]
})
