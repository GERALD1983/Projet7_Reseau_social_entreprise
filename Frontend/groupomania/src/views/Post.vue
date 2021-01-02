<template>
  <div>
    <Navigation />
    <Poster />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "../components/nav";
import Poster from "../components/poster";

export default {
  name: "poster",
  components: {
    Navigation,
    Poster,
  },
};
</script>

<style lang="scss"></style>
