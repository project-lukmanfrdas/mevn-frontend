<template>
  <!-- Modal Wrapper -->
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <!-- Modal Content -->
    <div class="bg-white rounded shadow-lg w-full max-w-md p-6">
      <h2 class="text-xl font-bold mb-4">Add User</h2>

      <!-- User Form -->
      <form @submit.prevent="onSubmit">
        <!-- Name Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" v-model="internalForm.name" class="mt-1 block w-full border border-gray-300 rounded p-2" />
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="internalForm.email"
            class="mt-1 block w-full border border-gray-300 rounded p-2" />
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" v-model="internalForm.password"
            class="mt-1 block w-full border border-gray-300 rounded p-2" />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-2">
          <button type="button" @click="onClose" class="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFormModal',

  /**
   * Props passed into the component
   * - visible: Boolean to toggle modal display
   * - form: Object with name, email, password
   */
  props: {
    visible: Boolean,
    form: Object,
  },

  /**
   * Custom events emitted:
   * - submit: triggered when Save is clicked
   * - update:visible: triggered when modal should be closed
   */
  emits: ['update:visible', 'submit'],

  data() {
    return {
      // Internal copy of form for editing
      internalForm: { ...this.form },
    };
  },

  watch: {
    /**
     * Keep internalForm in sync if parent updates form prop
     */
    form: {
      handler(val) {
        this.internalForm = { ...val };
      },
      deep: true,
    },
  },

  methods: {
    /**
     * Emits the updated form data to parent
     */
    onSubmit() {
      this.$emit('submit', this.internalForm);
    },

    /**
     * Emits event to hide the modal
     */
    onClose() {
      this.$emit('update:visible', false);
    },
  },
};
</script>
