import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import library from '@/components/library'
import Login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'login',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{auth:true}
    },
    {
      path:'/home',
      name: 'home',
      component: Home,
      meta:{auth:true}
    },
    {
      path:'/library',
      name: 'library',
      component: library,
      meta:{auth:true}
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    }
  ]
})
