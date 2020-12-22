<template>
  <div>
    <Navigation />
    <PosterChoice />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "../components/nav";
import PosterChoice from "../components/posterChoice";
export default {
  name: "ProfilChoice",
  components: {
    Navigation,
    PosterChoice,
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
  padding: 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
