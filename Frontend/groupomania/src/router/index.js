import Vue from "vue";
import VueRouter from "vue-router";
import Acceuil from "../views/Acceuil.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import ModifProfil from "../views/ModifProfil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Acceuil",
    component: Acceuil,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
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
  },
  {
    path: "/upProfil",
    name: "UpProfil",
    component: ModifProfil,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
