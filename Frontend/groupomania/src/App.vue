<template>
  <div id="app">
    <Signup />
  </div>
</template>

<script>
import Signup from "./components/signup.vue";

export default {
  name: "App",
  components: {
    Signup,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  text-align: center;
  color: #2c3e50;
}
</style>
