<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-6">
          <router-link to="/users" 
            class="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Users
          </router-link>
        </div>
        <div class="border-b border-gray-200 pb-5">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">User Details</h1>
          <p class="mt-2 text-sm text-gray-500">
            View detailed information about this user account.
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="max-w-2xl">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="px-6 py-12 text-center">
            <div class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-gray-500">Loading user details...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-2xl">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="px-6 py-4 bg-red-50 border-l-4 border-red-400">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error loading user</h3>
                <p class="text-sm text-red-700 mt-1">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Detail Display -->
      <div v-else class="max-w-2xl">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <!-- Profile Header -->
          <div class="px-6 py-6 bg-gradient-to-r from-indigo-500 to-indigo-600">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-20 w-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <span class="text-2xl font-bold text-white">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              <div class="ml-6">
                <h2 class="text-2xl font-bold text-white">{{ user.name }}</h2>
                <p class="text-indigo-100">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <!-- User Information -->
          <div class="px-6 py-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
            
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <!-- User ID -->
              <div>
                <dt class="text-sm font-medium text-gray-500 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  User ID
                </dt>
                <dd class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ user._id }}
                  </span>
                </dd>
              </div>

              <!-- Full Name -->
              <div>
                <dt class="text-sm font-medium text-gray-500 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Full Name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 font-medium">{{ user.name }}</dd>
              </div>

              <!-- Email Address -->
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                  Email Address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 font-medium">{{ user.email }}</dd>
              </div>
            </dl>
          </div>

          <!-- Action Buttons -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <router-link to="/users">
                <button class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                  <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Back to User List
                </button>
              </router-link>
              
              <div class="flex space-x-3">
                <router-link :to="`/users/${user._id}/edit`">
                  <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                    <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit User
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',

  data() {
    return {
      /**
       * Holds the user data fetched from Vuex store.
       * Initially null until data is loaded.
       */
      user: null,

      /**
       * Flag indicating whether the user data is being loaded.
       * Used to show a loading state in the UI.
       */
      loading: false,

      /**
       * Holds error messages if fetching the user data fails.
       * Null if no error.
       */
      error: null,
    };
  },

  /**
   * Lifecycle hook called after component instance creation.
   * Fetches user details from the Vuex store based on route param ID.
   * Handles loading and error states accordingly.
   */
  async created() {
    this.loading = true;
    try {
      const id = this.$route.params.id; // Get user ID from route
      const user = await this.$store.dispatch('users/getUserById', id); // Fetch user from store
      this.user = user; // Set the fetched user data
    } catch (err) {
      this.error = err?.message || 'Failed to fetch user data'; // Handle errors
    } finally {
      this.loading = false; // Always clear loading flag
    }
  },
};
</script>
