<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Title -->
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <!-- Grid container for dashboard cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Users Card -->
      <div class="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">Total Users</p>
          <!-- Display the total user count -->
          <p class="text-2xl font-bold text-gray-800">{{ userCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DashboardPage',

  computed: {
    /**
     * Map Vuex getter 'userCount' from the 'users' module.
     * Provides reactive access to the total user count.
     */
    ...mapGetters('users', ['userCount']),
  },

  mounted() {
    /**
     * Lifecycle hook called when component is mounted.
     * Dispatches Vuex action 'fetchUserCount' to load total user count.
     */
    this.$store.dispatch('users/fetchUserCount');
  }
}
</script>
