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
  /* async created() {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`http://localhost:3000/user/${userId}`, {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("acces_token"),
      },
    });
    console.log(response);
  },*/
  /*
  async created() {
    //const userId = localStorage.getItem("userId");

    const response = await axios.get(`http://localhost:3000/postes`);
    console.log(response);
  },
  */
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
