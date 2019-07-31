// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//todo: add a navbar component

Vue.config.productionTip = false
const vuetifyOptions = {
  iconfont: 'md'
}
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  components: { App },
  template: '<App/>'
})
