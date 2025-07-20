const { defineConfig } = require("@vue/cli-service");
require("dotenv").config(); // Load environment variables from .env

/**
 * Vue CLI configuration.
 *
 * - Enables automatic transpilation of dependencies.
 * - Sets up a development proxy so that API requests (starting with `/api`) are forwarded to the backend server.
 * - Uses an environment variable `VUE_APP_API_BASE_URL` for flexibility in different environments (dev/staging/prod).
 */
module.exports = defineConfig({
  // Automatically transpile dependencies for compatibility
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api": {
        // Target backend server from .env or fallback to localhost
        target: process.env.VUE_APP_API_BASE_URL || "http://localhost:3003",

        // Needed for virtual hosted sites and CORS
        changeOrigin: true,

        // Remove `/api` prefix before sending to backend
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
