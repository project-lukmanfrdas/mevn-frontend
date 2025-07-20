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
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Add New User</h1>
          <p class="mt-2 text-sm text-gray-500">
            Create a new user account with personal information and credentials.
          </p>
        </div>
      </div>

      <!-- Content Card -->
      <div class="max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 class="text-lg font-medium text-gray-900">User Information</h2>
          <p class="mt-1 text-sm text-gray-500">Fill in the user's personal information and account details.</p>
        </div>

        <!-- User Add Form -->
        <form @submit.prevent="submitAdd" class="p-6 space-y-6">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input 
                id="name"
                v-model="form.name" 
                type="text"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <input 
                id="email"
                v-model="form.email" 
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input 
                id="password"
                v-model="form.password" 
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter password"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Password should be at least 6 characters long and contain a mix of letters and numbers.
            </p>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0 pt-6 border-t border-gray-200">
            <router-link to="/users">
              <button type="button" 
                class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Cancel
              </button>
            </router-link>
            <button type="submit" 
              class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAdd",

  data() {
    return {
      /**
       * Form data for creating new user.
       */
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    /**
     * Handle form submission to create new user.
     */
    async submitAdd() {
      try {
        // Dispatch create user action
        await this.$store.dispatch("users/createUser", this.form);

        // Navigate back to user list
        this.$router.push("/users");
      } catch (error) {
        console.error("Error creating user:", error);
        // You can add error handling here, like showing a toast notification
      }
    },
  },
};
</script> 