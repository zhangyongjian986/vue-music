import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend'
import main from  '@/components/main'
import  rank from '@/components/rank'
import  me from '@/components/me'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name:'/',
      component: recommend
    },
    {
      path:'/main',
      name: 'main',
      component: main
    },
    {
      path:'/rank',
      name: 'rank',
      component: rank
    },
    {
      path:'/search',
      name: 'search',
      component: search
    },
    {
      path:'/*',
      redirect:'/'
    }
  ]
})
