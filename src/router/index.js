import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

// Layout components
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

// View components
import Login from "@/views/auth/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import UserList from "@/views/users/UserList.vue";
import UserAdd from "@/views/users/UserAdd.vue";
import UserEdit  from "@/views/users/UserEdit.vue";
import UserDetail from "@/views/users/UserDetail.vue";

// Enable Vue Router
Vue.use(Router);

/**
 * Application routes configuration
 *
 * Routes are grouped by layout:
 * - `MainLayout`: For authenticated pages
 * - `AuthLayout`: For login and authentication-related pages
 */
const router = new Router({
  mode: "history", // Use HTML5 history mode (no hash # in URL)
  routes: [
    {
      path: "/",
      component: MainLayout,
      meta: { requiresAuth: true }, // Protect routes under this layout
      children: [
        {
          path: "",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "users",
          name: "Users",
          component: UserList,
        },
        {
          path: "/users/add",
          name: "UserAdd",
          component: UserAdd,
        },
        {
          path: "/users/:id/edit",
          name: "EditUser",
          component: UserEdit,
        },
        {
          path: "/users/:id",
          name: "UserDetail",
          component: UserDetail,
        },
      ],
    },
    {
      path: "/login",
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "Login",
          component: Login,
        },
      ],
    },
  ],
});

/**
 * Global navigation guard for route protection.
 *
 * - Redirects to `/login` if trying to access protected routes without authentication.
 * - Redirects to `/` if authenticated user tries to visit `/login`.
 */
router.beforeEach((to, from, next) => {
  const isAuth = store.getters["auth/isAuthenticated"]; // Check token from Vuex
  const isLoginPage = to.path === "/login";

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuth) {
    // Not authenticated and trying to access a protected route
    next("/login");
  } else if (isLoginPage && isAuth && from.path !== "/") {
    // Authenticated user trying to access login page — redirect to home
    next("/");
  } else {
    // Allow navigation
    next();
  }
});

export default router;
