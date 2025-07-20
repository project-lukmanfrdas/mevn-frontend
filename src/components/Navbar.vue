<template>
  <div class="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div class="text-xl font-semibold">Welcome</div>

    <div class="flex items-center gap-2">
      <button @click="$emit('logout')"
        class="text-sm text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600 md:block">
        Logout
      </button>

      <!-- Toggle button only visible on small screens -->
      <button @click="$emit('toggle-sidebar')" class="md:hidden text-gray-700 text-xl">
        ☰
      </button>


    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar'
};
</script>
