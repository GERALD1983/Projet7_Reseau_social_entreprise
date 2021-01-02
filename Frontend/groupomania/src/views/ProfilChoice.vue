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

<style lang="scss"></style>
