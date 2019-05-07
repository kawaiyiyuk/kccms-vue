import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import library from '@/components/library'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/home',
      name: 'home',
      component: Home
    },
    {
      path:'/library',
      name: 'library',
      component: library
    }
  ]
})
