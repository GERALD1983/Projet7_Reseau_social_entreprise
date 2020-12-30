<template>
  <section
    class="hauteur100 stopPadMarg container-fluid d-md-flex justify-content-between"
  >
    <div class="py-5 stopPadMarg  bg-primary col-md-1">
      <img
        src="../assets/image/icon.png"
        width="60px"
        class="rounded-circle"
        alt="logo"
      />
    </div>
    <div
      class="d-flex flex-column align-items-center justify-content-center col-md-7"
    >
      <div class="container" v-if="user_id == 61">
        <Admin />
      </div>
      <div
        class="container d-flex justify-content-center hauteur400 my-5 card bordureProfil border-primary bordureRond shadow"
      >
        <FormProfil />
      </div>
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
import Admin from "./admin";
import FormProfil from "./formProfil";
export default {
  components: {
    FormProfil,
    Admin,
  },
  data() {
    return {
      user_id: localStorage.getItem("userId"),
    };
  },
};
</script>

<style></style>
