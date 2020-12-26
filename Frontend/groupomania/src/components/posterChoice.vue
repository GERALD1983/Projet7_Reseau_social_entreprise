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
    <div class="largeur80">
      <Description />
      <div>
        <h3
          class="backPrimaire opacity mx-1 text-primary bordurePost bordureRond"
        >
          <b-icon-chevron-double-down
            class="mr-5 my-1 pt-1 text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
          Derniers Postes
          <b-icon-chevron-double-down
            class="ml-5 my-1 pt-1 text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
        </h3>
      </div>
      <CarteChoice />
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
import CarteChoice from "./carteChoice";
import Description from "./description";
export default {
  components: {
    Description,
    CarteChoice,
  },
  data() {
    return {};
  },
  /*
  async created() {
    await axios
      .get(`http://localhost:3000/postes/${poste.id}`, {})
      .then((response) => {
        //(this.submitStatus = "OK"),
        console.log(response), this.$router.go("/post");
      })
      .catch((error) =>
        // (this.submitStatus = "ERROR SERVEUR"),
        console.log(error)
      );
  },
  */
};
</script>

<style></style>
