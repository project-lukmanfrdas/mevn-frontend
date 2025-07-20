<template>
  <div>
    <!-- Table Header with Actions -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-lg font-medium text-gray-900">Users</h2>
          <p class="mt-1 text-sm text-gray-500">A list of all users in your account including their name, email, and actions.</p>
        </div>
                 <div class="mt-4 sm:mt-0">
          <router-link to="/users/add">
            <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add User
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Loading and Error States -->
    <div v-if="loading" class="px-6 py-12 text-center">
      <div class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-gray-500">Loading users...</span>
      </div>
    </div>
    
    <div v-else-if="error" class="px-6 py-4 bg-red-50 border-l-4 border-red-400">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">Error: {{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Desktop Table View -->
    <div v-else class="hidden lg:block">
      <div class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                      <span class="text-sm font-medium text-white">
                        {{ user.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ user._id }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <router-link :to="`/users/${user._id}`">
                    <button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                      <svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View
                    </button>
                  </router-link>
                  <router-link :to="`/users/${user._id}/edit`">
                    <button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                      <svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Edit
                    </button>
                  </router-link>
                  <button @click="deleteUser(user._id)" 
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                    <svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="lg:hidden">
      <div class="px-4 py-4 space-y-4">
        <div v-for="user in users" :key="user._id" 
          class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="p-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                  <span class="text-lg font-medium text-white">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-lg font-medium text-gray-900 truncate">{{ user.name }}</p>
                <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                <p class="text-xs text-gray-400 mt-1">ID: {{ user._id }}</p>
              </div>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2">
              <router-link :to="`/users/${user._id}`" class="flex-1 min-w-0">
                <button class="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                  <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View
                </button>
              </router-link>
              <router-link :to="`/users/${user._id}/edit`" class="flex-1 min-w-0">
                <button class="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                  <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit
                </button>
              </router-link>
              <button @click="deleteUser(user._id)" 
                class="flex-1 min-w-0 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Elegant Pagination -->
    <div v-if="users.length > 0" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
        <div class="text-sm text-gray-700">
          Showing <span class="font-medium">{{ users.length }}</span> of <span class="font-medium">{{ pagination.total }}</span> users
        </div>
        
        <div class="flex items-center space-x-1">
          <button @click="changePage(pagination.page - 1)" 
            :disabled="pagination.page <= 1"
            :class="[
              'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md border transition-colors duration-200',
              pagination.page <= 1 
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            ]">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            Previous
          </button>
          
          <div class="flex items-center space-x-1">
            <span class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
          </div>
          
          <button @click="changePage(pagination.page + 1)" 
            :disabled="pagination.page >= pagination.totalPages"
            :class="[
              'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md border transition-colors duration-200',
              pagination.page >= pagination.totalPages 
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            ]">
            Next
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && !error" class="px-6 py-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No users</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new user.</p>
      <div class="mt-6">
        <router-link to="/users/add">
          <button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add User
          </button>
        </router-link>
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserTable',

  data() {
    return {};
  },

  computed: {
    // Vuex getters for users module
    ...mapGetters('users', ['allUsers', 'isLoading', 'error', 'pagination']),

    /** Alias for list of users */
    users() {
      return this.allUsers;
    },

    /** Loading state for user fetch */
    loading() {
      return this.isLoading;
    },
  },

  methods: {
    /**
     * Delete a user by ID and refresh the current page.
     * @param {String} id - The user ID
     */
    async deleteUser(id) {
      await this.$store.dispatch('users/deleteUser', id);
      this.$store.dispatch('users/fetchUsers', { page: this.pagination.page });
    },

    /**
     * Change current pagination page and fetch new users.
     * @param {Number} page - The target page number
     */
    changePage(page) {
      if (page < 1 || page > this.pagination.totalPages) return;
      this.$store.dispatch('users/fetchUsers', { page });
    },
  },

  /**
   * Fetch initial list of users on component creation.
   */
  created() {
    this.$store.dispatch('users/fetchUsers');
  },
};
</script>
