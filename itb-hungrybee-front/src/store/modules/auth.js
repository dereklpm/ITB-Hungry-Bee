import client from "../../api";
import { Buffer } from "buffer";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    userData: null
  },

  actions: {
    signUp(ctx, payload) {
      payload.password = Buffer.from(payload.password).toString('base64');
      return client.post("/api/account/signUp", payload)
        .then(resp => {
          return resp
        })
    },
    checkAuth(ctx) {
      console.log("checkAuth: " + localStorage.getItem("hungrybeeToken"))
      return client.post("/api/account/auth", {}, {
        headers: {
          "hbtoken": localStorage.getItem("hungrybeeToken")
        }
      })
        .then((response) => {
          console.log("checkAuth:")
          console.log(response);
          ctx.commit('setUserData', response.data.data)
          ctx.commit('setAuthentication', true)

          return response
        })
    },
    login(ctx, payload) {
      payload.password = Buffer.from(payload.password).toString('base64');
      return client.post("/api/account/signIn", payload)
        .then((response) => {
          console.log("signIn")
          console.log(response.data);
          if (response.data.status == "success") {
            ctx.commit('setAuthentication', true)
          }
          else {
            ctx.commit('setAuthentication', false)
          }

          return response
        })
    },
    getUserData(ctx, userId) {
      return client.get(`/api/account/${userId}`)
        .then((response) => {
          return response
        })
    },
    updateUser(ctx, payload) {
      var userId = payload.userId;
      return client.put(`/api/account/${userId}`, payload)
        .then(resp => {
          return resp;
        })
    }
  },

  mutations: {
    setUserData(state, userData) {
      console.log("setUserData", userData)
      state.userData = userData
    },

    setAuthentication(state, value) {
      state.isAuthenticated = value
    },

    logout(state) {
      state.isAuthenticated = false
      localStorage.removeItem("hungrybeeToken");
    }
  },

  getters: {
    isAuth(state) {
      return state.isAuthenticated
    },
    getUser(state) {
      return state.userData
    }
  },
}