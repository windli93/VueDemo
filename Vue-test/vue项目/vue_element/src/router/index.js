import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'
import MemberList from '../views/Member/MemberList'
import MemberLevel from '../views/Member/MemberLevel'
import NotFound from "../views/NotFound";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main/:name',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/member/list',
          name: 'memberList',
          component: MemberList
        },
        {
          path: '/member/level:id',
          name: 'memberLevel',
          component: MemberLevel,
          props: true
        }
      ]
    },
    {
      path: '/goMain/:name',
      redirect: '/main/:name',
    },
    // 404页面
    { 
      path: '*',
      component: NotFound
    },
  ]
})
