import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import auth from "./modules/auth"
import cart from "./modules/cart"
import order from "./modules/order"


Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    cart,
    order
  },
})

export default store