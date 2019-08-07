import Vue from 'vue'
import Router from 'vue-router'
import BeersView from '@/components/BeersView'
import BeerInfo from '@/components/BeerInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Beers',
      component: BeersView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: BeersView
    },
    {
      path: '/beer/:id',
      name: 'beer',
      component: BeerInfo
    }
  ]
})
