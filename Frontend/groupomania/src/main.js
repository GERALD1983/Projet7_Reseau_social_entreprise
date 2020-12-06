import Vue from "vue";
import App from "./App.vue";
//import Acceuil from "./views/Acceuil.vue";
//import Login from "./views/Login.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./assets/custom.scss";
import "./assets/style.css";
import router from "./router";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
