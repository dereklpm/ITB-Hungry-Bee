import client from "../../api";


export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
  },

  actions: {
    submitOrder(ctx, payload) {
      return client.post("/api/order/submit", payload)
        .then((response) => {
          return response
        })
    },
    trackOrder(ctx, orderId) {
      return client.get(`/api/order/details/${orderId}`)
        .then((response) => {
          return response
        })
    },
    getOrders(ctx, payload) {
      return client.post('/api/order/list', payload)
        .then((resp) => {
          return resp;
        })
    }
  },

  mutations: {
  },

  getters: {
  },
}