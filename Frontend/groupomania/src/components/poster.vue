<template>
  <!-- component rassemble 2 components fil actualite des postes users -->
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
    <div class="largeur80 l100">
      <Envoyer />
      <div>
        <h3
          class="backPrimaire opacity mx-1 text-primary bordurePost bordureRond"
        >
          <b-icon-chevron-double-down
            class="stopMRL mr-5 my-1 pt-1  text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
          Derniers Postes
          <b-icon-chevron-double-down
            class="stopMRL ml-5 my-1 pt-1  text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
        </h3>
      </div>
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
//import axios from "axios";
import Carte from "./carte";
import Envoyer from "./envoyer";
export default {
  components: {
    Envoyer,
    Carte,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
