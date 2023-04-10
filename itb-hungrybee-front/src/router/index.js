import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "AuthLayout",
    component: () => import("../layouts/AuthLayout"),
    children: [
      {
        path: "login",
        component: () => import("../pages/Auth/LoginPage"),
      },
      {
        path: "forgot-password",
        component: () => import("../pages/Auth/ForgotPasswordPage"),
      },
      {
        path: "sign",
        component: () => import("../pages/Auth/SignPage"),
      },
    ],
  },
  {
    path: "/",
    name: "MainLayout",
    component: () => import("../layouts/MainLayout"),
    children: [
      {
        path: "",
        component: () => import("../pages/IndexPage"),
      },
      {
        path: "cart",
        component: () => import("../pages/CartPage"),
      },
      {
        path: "orders",
        component: () => import("../pages/OrdersPage"),
      },
      {
        path: "trackOrder/:orderId",
        component: () => import("../pages/OrdersTrackPage"),
      },
      {
        path: "orders/all",
        component: () => import("../pages/AllOrdersPage"),
      },
      {
        path: "profile",
        name: "ProfilePage",
        component: () => import("../pages/ProfilePage.vue"),
        children: [
          {
            path: "",
            component: () => import("../pages/Profile/AccountPage"),
          },
          {
            path: "security",
            component: () => import("../pages/Profile/SecurityPage.vue"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
