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
    BEERS: state => id => {
      return state.beers.filter(beer => beer.id >= id).filter(beer => beer.id < id+15)
    },
    FAVORITES: state => {
      return state.favorites
    },
    LOADED: state => {
      return state.loaded
    },
    BEER: state => id => {
      return state.beers.find(beer => beer.id === id)
    }
  },
  mutations: {
    FAV_BEER: (state, payload) => {
      state.favorites.push(payload)
      state.beers[payload.id-1].isFavorite = true
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
      state.beers.forEach(function (beer) {
        beer.isFavorite = state.favorites.includes(beer)
      })
      state.loaded = true
    }
  },
  actions: {
    async getBeers ({commit}) {
      const response = await axios.get('https://api.punkapi.com/v2/beers?per_page=80').then(response => {
          commit('SET_BEERS', response.data)
        }
      )

    },
    favBeer ({commit}, beer) {
      commit('FAV_BEER', beer)
    },
    unfavBeer ({commit}, beer) {
      commit('UNFAV_BEER', beer)
    }
  }
})
