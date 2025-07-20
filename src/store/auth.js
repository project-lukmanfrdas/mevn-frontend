import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const token = localStorage.getItem("token");

export default {
  namespaced: true,

  state: {
    /** @type {string|null} Auth token from localStorage or null */
    token: token || null,
  },

  mutations: {
    /**
     * Set the authentication token in the state and localStorage.
     * @param {Object} state - Vuex state.
     * @param {string} token - JWT or auth token.
     */
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },

    /**
     * Clears the authentication token from the state and localStorage.
     * @param {Object} state - Vuex state.
     */
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  actions: {
    /**
     * Commits the setToken mutation with the provided token.
     * Typically used after a successful login.
     * @param {Object} context - Vuex context object.
     * @param {string} token - Auth token to store.
     */
    login({ commit }, token) {
      commit("setToken", token);
    },

    /**
     * Commits the logout mutation to clear the token.
     * Typically used when the user logs out.
     * @param {Object} context - Vuex context object.
     */
    logout({ commit }) {
      commit("logout");
    },
  },

  getters: {
    /**
     * Returns whether the user is authenticated (has a token).
     * @param {Object} state - Vuex state.
     * @returns {boolean} True if token exists, false otherwise.
     */
    isAuthenticated: (state) => !!state.token,
  },
};
