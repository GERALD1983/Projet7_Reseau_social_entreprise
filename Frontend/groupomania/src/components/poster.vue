<template>
  <section
    class="stopPadMarg container-fluid d-md-flex justify-content-between"
  >
    <div class="py-5 stopPadMarg bg-primary col-md-1">
      <img
        src="../assets/image/icon.png"
        width="60px"
        class="rounded-circle"
        alt="logo"
      />
    </div>
    <div>
      <Envoyer />
      <Carte />
    </div>

    <div class="py-5 stopPadMarg bg-primary col-md-1">
      <img
        src="../assets/image/icon.png"
        width="60px"
        class="rounded-circle"
        alt="logo"
      />
    </div>
  </section>
</template>
<script>
import Carte from "./carte";
import Envoyer from "./envoyer";
export default {
  components: {
    Envoyer,
    Carte,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {},
};
</script>

<style></style>
