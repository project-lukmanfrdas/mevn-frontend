import apiClient from "@/utils/axios";

export default {
  namespaced: true,

  state: {
    /** @type {Array<Object>} List of all users */
    users: [],

    /** @type {boolean} Loading status for user data */
    loading: false,

    /** @type {string|null} Error message, if any */
    error: null,

    /** @type {Object} Pagination information */
    pagination: {
      /** @type {number} Current page number */
      page: 1,

      /** @type {number} Number of items per page */
      limit: 5,

      /** @type {number} Total number of items */
      total: 0,

      /** @type {number} Total number of pages */
      totalPages: 1,

      /** @type {number} Total number of users (for dashboard) */
    },
    userCount: 0,
  },

  getters: {
    /**
     * Returns the list of all users.
     * @param {Object} state - The Vuex module state.
     * @returns {Array<Object>} The user list.
     */
    allUsers: (state) => state.users,

    /**
     * Returns the loading status.
     * @param {Object} state - The Vuex module state.
     * @returns {boolean} Whether the data is loading.
     */
    isLoading: (state) => state.loading,

    /**
     * Returns the last error message.
     * @param {Object} state - The Vuex module state.
     * @returns {string|null} Error message.
     */
    error: (state) => state.error,

    /**
     * Returns pagination information.
     * @param {Object} state - The Vuex module state.
     * @returns {Object} Pagination data.
     */
    pagination: (state) => state.pagination,

    /**
     * Returns total number of users.
     * @param {Object} state - The Vuex module state.
     * @returns {number} Total users.
     */
    userCount: (state) => state.userCount,
  },

  mutations: {
    /**
     * Sets the list of users.
     * @param {Object} state - The Vuex module state.
     * @param {Array<Object>} users - New user list.
     */
    setUsers(state, users) {
      state.users = users;
    },

    /**
     * Adds a new user to the state.
     * @param {Object} state - The Vuex module state.
     * @param {Object} user - New user to add.
     */
    addUser(state, user) {
      state.users.push(user);
    },

    /**
     * Updates an existing user in the state.
     * @param {Object} state - The Vuex module state.
     * @param {Object} updatedUser - Updated user data.
     */
    updateUser(state, updatedUser) {
      const index = state.users.findIndex((u) => u._id === updatedUser._id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },

    /**
     * Removes a user by ID.
     * @param {Object} state - The Vuex module state.
     * @param {string} id - ID of the user to remove.
     */
    removeUser(state, id) {
      state.users = state.users.filter((u) => u._id !== id);
    },

    /**
     * Sets the loading state.
     * @param {Object} state - The Vuex module state.
     * @param {boolean} loading - Loading status.
     */
    setLoading(state, loading) {
      state.loading = loading;
    },

    /**
     * Sets the error message.
     * @param {Object} state - The Vuex module state.
     * @param {string|null} error - Error message.
     */
    setError(state, error) {
      state.error = error;
    },

    /**
     * Sets pagination data.
     * @param {Object} state - The Vuex module state.
     * @param {Object} pagination - Pagination information.
     * @param {number} pagination.page - Current page.
     * @param {number} pagination.limit - Items per page.
     * @param {number} pagination.total - Total items.
     * @param {number} pagination.totalPages - Total pages.
     */
    setPagination(state, { page, limit, total, totalPages }) {
      state.pagination = { page, limit, total, totalPages };
    },

    /**
     * Sets total user count.
     * @param {Object} state
     * @param {number} count
     */
    setUserCount(state, count) {
      state.userCount = count;
    },
  },

  actions: {
    /**
     * Fetches users from the API with pagination.
     * @param {Object} context - Vuex context.
     * @param {Object} payload - Pagination options.
     * @param {number} [payload.page=1] - Page number.
     * @param {number} [payload.limit=5] - Items per page.
     * @returns {Promise<void>}
     */
    async fetchUsers({ commit }, { page = 1, limit = 5 } = {}) {
      commit("setLoading", true);
      try {
        const response = await apiClient.get(
          `/users?page=${page}&limit=${limit}`
        );
        const { data, pagination } = response.data;
        commit("setUsers", data);
        commit("setPagination", pagination);
      } catch (err) {
        commit("setError", err.message || err);
      } finally {
        commit("setLoading", false);
      }
    },

    /**
     * Creates a new user via API and refetches user list.
     * @param {Object} context - Vuex context.
     * @param {Object} user - New user data.
     * @returns {Promise<void>}
     */
    async createUser({ dispatch, state }, user) {
      try {
        await apiClient.post("/users", user);
        dispatch("fetchUsers", {
          page: state.pagination.page,
          limit: state.pagination.limit,
        });
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * Updates an existing user and refetches the user list.
     * @param {Object} context - Vuex context.
     * @param {Object} user - Updated user data.
     * @returns {Promise<void>}
     */
    async updateUser({ dispatch, state }, user) {
      try {
        await apiClient.put(`/users/${user._id}`, user);
        dispatch("fetchUsers", {
          page: state.pagination.page,
          limit: state.pagination.limit,
        });
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * Deletes a user by ID and refetches the user list.
     * @param {Object} context - Vuex context.
     * @param {string} id - User ID to delete.
     * @returns {Promise<void>}
     */
    async deleteUser({ dispatch, state }, id) {
      try {
        await apiClient.delete(`/users/${id}`);
        dispatch("fetchUsers", {
          page: state.pagination.page,
          limit: state.pagination.limit,
        });
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * Fetch a single user by ID.
     * @param {Object} context - Vuex context.
     * @param {string} id - User ID.
     * @returns {Promise<Object>} The user data.
     */
    async getUserById({ commit }, id) {
      commit("setLoading", true);
      try {
        const response = await apiClient.get(`/users/${id}`);
        const { data } = response.data;
        return data;
      } catch (err) {
        commit("setError", err.message || err);
        return null;
      } finally {
        commit("setLoading", false);
      }
    },

    /**
     * Fetch total user count from API.
     * @param {Object} context - Vuex context.
     */
    async fetchUserCount({ commit }) {
      try {
        const response = await apiClient.get("/users/get-total-users");
        const { data } = response.data;
        commit("setUserCount", data);
      } catch (err) {
        console.error("Failed to fetch user count:", err);
        commit("setError", err.message || err);
      }
    },
  },
};
