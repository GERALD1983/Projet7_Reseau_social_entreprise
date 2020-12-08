<template>
  <section
    class="hauteur stopPadMarg container-fluid d-md-flex justify-content-between"
  >
    <div class="py-5 stopPadMarg  bg-primary col-md-1">
      <img
        src="../assets/image/icon.png"
        width="60px"
        class="rounded-circle"
        alt="logo"
      />
    </div>
    <div class="d-flex align-items-center justify-content-center col-md-7">
      <div
        class="container d-flex justify-content-center  my-3 hauteur75 card bordureProfil border-primary rounded shadow"
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
import FormProfil from "./formProfil";
export default {
  components: {
    FormProfil,
  },
};
</script>

<style></style>
