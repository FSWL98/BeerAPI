import Vue from 'vue'
import Router from 'vue-router'
import BeersView from '@/components/BeersView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Beers',
      component: BeersView
    }
  ]
})
