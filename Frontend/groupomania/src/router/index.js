import Vue from "vue";
import VueRouter from "vue-router";
import Acceuil from "../views/Acceuil.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import ModifProfil from "../views/ModifProfil.vue";
import Data from "../components/Connecter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Acceuil",
    component: Acceuil,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: Post,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/upProfil",
    name: "UpProfil",
    component: ModifProfil,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((routes) => routes.meta.requiresAuth)) {
    if (!Data.data.token) {
      next({
        name: "Login" || "Acceuil",
      });
    } else {
      next();
    }
  } else if (to.matched.some((routes) => routes.meta.requiresVisitor)) {
    if ((Data.data.token = localStorage.getItem("acces_token"))) {
      next({
        name: "Post" || "UpProfil",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
