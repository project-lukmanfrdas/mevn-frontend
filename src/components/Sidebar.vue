<template>
  <transition name="slide">
    <div v-if="visible" class="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 shadow-xl p-6 z-50 md:static md:block">
      <!-- Logo/Brand Section -->
      <div class="flex items-center mb-8">
        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
          <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white">Dashboard</h2>
      </div>

      <!-- Navigation Menu -->
      <nav class="space-y-2">
        <router-link 
          to="/" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-indigo-700 hover:text-white rounded-lg transition-all duration-200 group"
          active-class="bg-indigo-700 text-white shadow-lg"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <router-link 
          to="/users" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-indigo-700 hover:text-white rounded-lg transition-all duration-200 group"
          active-class="bg-indigo-700 text-white shadow-lg"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="font-medium">Users</span>
        </router-link>

        
      </nav>

      
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* Custom scrollbar for sidebar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
