import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'
import MemberList from '../views/Member/MemberList'
import MemberLevel from '../views/Member/MemberLevel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/member/list',
          name: 'MemberList',
          component: MemberList
        },
        {
          path: '/member/level:id',
          name: 'MemberLevel',
          component: MemberLevel,
          props: true
        }
      ]
    },
  ]
})
