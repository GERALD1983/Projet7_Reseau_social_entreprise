<template>
  <div>
    <Navigation />
    <Profil />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "../components/nav";
import Profil from "../components/changeProfil";

export default {
  name: "ModifProfil",
  components: {
    Navigation,
    Profil,
  },
};
</script>

<style lang="scss"></style>
