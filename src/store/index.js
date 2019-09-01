import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    beers: [],
    favorites: [],
    loaded: false,
    favid: 1
  },
  getters: {
    BEERS: state => id => {
      return state.beers.filter(beer => beer.id >= id).filter(beer => beer.id < id+15)
    },
    FAVORITES: state => id => {
      return state.favorites.filter(beer => beer.favid >= id).filter(beer => beer.favid < id+15)
    },
    LOADED: state => {
      return state.loaded
    },
    BEER: state => id => {
      return state.beers.find(beer => beer.id === id)
    },
    FAV_SIZE: state => {
      return state.favorites.length
    }
  },
  mutations: {
    FAV_BEER: (state, payload) => {
      payload.favid = state.favid++
      state.favorites.push(payload)
      state.beers[payload.id-1].isFavorite = true
      console.log(payload.favid, payload.name)
    },
    UNFAV_BEER: (state, payload) => {
      state.beers[payload.id - 1].isFavorite = false
      state.favorites.forEach(function(beer, i) {
        if (beer.id === payload.id){
          state.favorites.splice(i, 1)
          console.log(beer.id, payload.id, beer.name, payload.name, beer.favid, i)
        }
      })
      state.favorites.forEach(function (beer) {
        if (beer.favid > payload.favid) {
          beer.favid--
        }
      })
      console.log(state.favorites)
      state.favid--
    },
    SET_BEERS: (state, payload) => {
      state.beers = payload
      console.log(state.favorites)
      state.favorites.forEach(function (beer) {
        state.beers[beer.id-1].isFavorite = true
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
