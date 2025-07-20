<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar Component -->
    <AppSidebar :visible="sidebarVisible" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navbar with logout and toggle -->
      <AppNavbar @logout="handleLogout" @toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <main class="p-6 overflow-x-auto overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/Sidebar.vue'
import AppNavbar from '@/components/Navbar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    AppSidebar,
    AppNavbar
  },

  data() {
    return {
      // Sidebar visibility depends on screen width
      sidebarVisible: window.innerWidth >= 768
    }
  },

  mounted() {
    // Add resize listener to auto-toggle sidebar
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy() {
    // Cleanup on component unmount
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    ...mapActions('auth', ['logout']),

    /**
     * Log the user out and redirect to login page.
     */
    async handleLogout() {
      await this.logout()
      if (this.$route.path !== '/login') {
        this.$router.push('/login')
      }
    },

    /**
     * Toggle sidebar manually from AppNavbar
     */
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },

    /**
     * Auto-close or open sidebar based on screen width
     */
    handleResize() {
      this.sidebarVisible = window.innerWidth >= 768
    }
  }
}
</script>
