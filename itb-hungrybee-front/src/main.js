import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import BaseButton from "./components/BaseButton"
import CategoryCard from "./components/Cards/CategoryCard"
import ProductCard from "./components/Cards/ProductCard"
import CategoryCardSkeleton from "./components/Skeletons/CategoryCardSkeleton"
import ProductCardSkeleton from "./components/Skeletons/ProductCardSkeleton"
import BaseInput from "./components/BaseInput"  
import BaseCheckbox from "./components/BaseCheckbox"
import BaseSpinner from './components/Spinners/BaseSpinner'
import BaseAlert from './components/Notification/BaseAlert'
import CartItemCard from "./components/Cards/CartItemCard"
import CartItemCounter from "./components/Cards/CartItemCounter"
import BasketCard from "./components/Cards/BasketCard"

import 'es6-promise/auto'
import store from './store/index'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash, faCheck, faExclamation, faXmark} from '@fortawesome/free-solid-svg-icons'
library.add(faEye);
library.add(faEyeSlash);
library.add(faCheck);
library.add(faExclamation);
library.add(faXmark);

Vue.config.productionTip = false;
Vue.use(Vuex);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseCheckbox', BaseCheckbox);
Vue.component('CategoryCard', CategoryCard);
Vue.component('CategoryCardSkeleton', CategoryCardSkeleton);
Vue.component('ProductCard', ProductCard);
Vue.component('ProductCardSkeleton', ProductCardSkeleton);
Vue.component('BaseInput', BaseInput);
Vue.component('BaseSpinner', BaseSpinner);
Vue.component('BaseAlert', BaseAlert);
Vue.component('CartItemCard', CartItemCard);
Vue.component('CartItemCounter', CartItemCounter);
Vue.component('BasketCard', BasketCard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

