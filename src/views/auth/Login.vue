<template>
  <div class="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
    <!-- Page header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-4xl font-bold tracking-tight text-indigo-600">
        Login
      </h2>
    </div>

    <!-- Login form -->
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email input -->
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" type="email" name="email" required autocomplete="email"
              class="border block w-full rounded-md bg-white px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <!-- Password input -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" type="password" name="password" required
              autocomplete="current-password"
              class="border block w-full rounded-md bg-white px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <!-- Submit button -->
        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from "@/utils/axios";
import { mapActions } from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      /** @type {string} User's email address */
      email: "",

      /** @type {string} User's password */
      password: "",
    };
  },

  methods: {
    // Maps the 'login' action from the Vuex 'auth' module
    ...mapActions("auth", ["login"]),

    /**
     * Handles the login form submission.
     * Sends login request to the backend and stores the token via Vuex if successful.
     * Redirects to /users upon success. Shows an alert on error.
     */
    async handleLogin() {
      try {
        const response = await apiClient.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;

        // Store the token using Vuex action
        await this.login(token);

        // Navigate to users page after successful login
        this.$router.push("/users");
      } catch (err) {
        // Handle any error that occurs during login
        const errorMsg = err.response?.data?.message || err.message;
        alert("Login failed: " + errorMsg);
      }
    },
  },
};
</script>
