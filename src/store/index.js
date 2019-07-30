import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    beers: [],
    favorites: [],
    loaded: false
  },
  getters: {
    BEERS: state => {
      return state.beers
    },
    FAVORITES: state => {
      return state.favorites
    },
    LOADED: state => {
      return state.loaded
    }
  },
  mutations: {
    FAV_BEER: (state, payload) => {
      state.favorites.push(payload)
      state.beers[payload.id - 1].isFavorite = true
    },
    UNFAV_BEER: (state, payload) => {
      state.beers[payload.id - 1].isFavorite = false
      state.favorites.forEach(function(beer, i) {
        if (beer.id === payload.id){
          state.favorites.splice(i, 1)
        }
      })
    },
    SET_BEERS: (state, payload) => {
      state.beers = payload
      console.log('set')
    }
  },
  actions: {
    async getBeers ({commit}) {
      const response = await axios.get('https://api.punkapi.com/v2/beers?per_page=30').then(response => {
          console.log(response.data)
          commit('SET_BEERS', response.data)
        }
      )
      console.log('everything is done')

    },
    favBeer ({commit}, beer) {
      commit('FAV_BEER', beer)
    },
    unfavBeer ({commit}, beer) {
      commit('UNFAV_BEER', beer)
    }
  }
})
