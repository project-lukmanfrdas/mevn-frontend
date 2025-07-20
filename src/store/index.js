import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import auth from "./auth";

Vue.use(Vuex);

/**
 * Root Vuex store that combines all modules.
 *
 * Modules:
 * - `users`: Handles user list, pagination, and CRUD operations.
 * - `auth`: Manages authentication token and login/logout logic.
 *
 * @returns {Vuex.Store} The Vuex store instance.
 */
export default new Vuex.Store({
  modules: {
    users,
    auth,
  },
});
