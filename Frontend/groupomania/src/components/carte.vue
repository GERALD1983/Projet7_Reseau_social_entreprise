<template>
  <div class=" d-flex my-5 align-items-center justify-content-center ">
    <div
      class=" d-flex align-items-center justify-content-center card bordurePost bordureRond border-primary shadow"
    >
      <div class="card-body p-3 container-fluid">
        <div class="d-flex">
          <img
            src="../assets/image/photo3.jpg"
            width="100px"
            class="justify-content-left bordureProfil rounded-circle"
            alt="logo"
          />
          <div class="ml-3 align-item-center justify-content-center">
            <h6>George Alaman</h6>
            <h6>Publié le: 05/07/2020</h6>
            <h4 class="card-title">Mon sejour a la mer</h4>
          </div>
        </div>

        <div class="my-5">
          <img
            class="card-img-top"
            src="../assets/image/paysage.jpg"
            alt="img-appareil-photo"
          />
        </div>

        <p class="card-text">
          Le soleil se couche et les eaux etaient calme c'etait reposant il
          fesait un peu froid mais ça aller quand même
        </p>

        <div>
          <a
            class="mb-3 btn border backPrimaire"
            href="panier.html"
            role="button"
          >
            Commentaires
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "carte",
};
</script>

<style></style>
