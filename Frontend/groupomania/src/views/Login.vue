<template>
  <div id="app">
    <Connecter />
  </div>
</template>
<script>
// @ is an alias to /src
import Connecter from "../components/Connecter.vue";
export default {
  name: "login",
  components: {
    Connecter,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
