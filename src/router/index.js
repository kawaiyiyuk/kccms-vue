import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/Home'
import library from '@/components/library'
import librarylist from '@/components/librarylist'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{auth:true}
    },
    {
      path:'/home',
      name: 'home',
      component: home,
      meta:{auth:true}
    },
    {
      path:'/library',
      name: 'library',
      component: library,
      meta:{auth:true}
    },
    {
      path:'/librarylist',
      name: 'librarylist',
      component: librarylist,
      meta:{auth:true}
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    }
  ]
})
