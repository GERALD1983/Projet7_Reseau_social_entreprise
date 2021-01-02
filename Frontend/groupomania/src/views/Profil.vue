<template>
  <div>
    <Navigation />
    <Amis />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "../components/nav";
import Amis from "../components/amis";

export default {
  name: "profil",
  components: {
    Navigation,
    Amis,
  },
};
</script>

<style lang="scss"></style>
