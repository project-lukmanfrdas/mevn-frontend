<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="border-b border-gray-200 pb-5">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">User Management</h1>
          <p class="mt-2 text-sm text-gray-500">
            Manage your users, view their details, and perform administrative actions.
          </p>
        </div>
      </div>

      <!-- Content Card -->
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
import Table from '@/components/users/Table.vue'

export default {
  name: 'UserList',
  components: {
    Table
  }
}
</script>
