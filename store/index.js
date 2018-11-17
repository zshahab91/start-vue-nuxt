import Vue from 'vue'
import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined
Vue.use(Vuex)


import moduleGetData from './modules/getData'


const createStore = () => {
  return new Vuex.Store({
    modules: {
      data: moduleGetData,
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // No valid cookie found
          }
        }
        // commit('setAuth', auth)
      }
    }
  })
}



export default createStore
