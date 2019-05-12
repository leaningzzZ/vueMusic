import Vue from 'vue'
import Router from 'vue-router'
import recommend from "./components/recommend/recommend"
import singer from "./components/singer/singer"
import search from "./components/search/search"
import rank from "./components/rank/rank"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "recommend"//根目录跳转到recommend下
    },
    {
      path:"/singer",
      name:"singer",
      component:singer
    },
    {
      path:"/search",
      name:"search",
      component:search
    },
    {
      path:"/rank",
      name:"rank",
      component:rank
    },
    {
      path:"/recommend",
      name:"recommend",
      component:recommend
    }
    
  ]
})
