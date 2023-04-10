const state = {
  cart: [],
  cartCount: 0,
};

const mutations = {
  addToCart(state, product) {
    if(!state.cart.some(p => p.id === product.id)){
      product.quantity = 1;
      state.cart.push(product);
      state.cartCount++;
    }
  },
  removeProduct(state, product) {
    const existingProduct = state.cart.find(p => p.id === product.id);
    if (existingProduct) {
      state.cart.splice(state.cart.indexOf(existingProduct), 1);
      state.cartCount -= 1;
    }
  },
  clearCart(state) {
    state.cart = [];
    state.cartCount = 0;
  },
  increaseQuantity(state, product) {
    const existingProduct = state.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    }
  },
  decreaseQuantity(state, product) {
    const existingProduct = state.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity--;
    }
  },
  updateQuantity(state, {product, quantity}) {
    const existingProduct = state.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }
  },
  getProductPrice(state, product) {
    const existingProduct = state.cart.find(p => p.id === product.id);
    if (existingProduct) {
      return existingProduct.quantity * existingProduct.price;
    }
  }
};

const getters = {
  cart: state => state.cart.map(item => ({...item})),
  cartCount: state => state.cartCount,
};

const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};