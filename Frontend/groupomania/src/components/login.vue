<template>
  <section
    class="hauteur stopPadMarg container-fluid d-sm-flex justify-content-between"
  >
    <div class="stopPadMarg bg-primary col-sm-2">
      <br />
      <img
        src="../assets/image/icon.png"
        width="80px"
        class="rounded-circle"
        alt="logo"
      />
      <br />
      <br />

      <p class="text-white">S'inscrire</p>
      <br />
      <p class="stopPadMarg text-white">Se connecter</p>
    </div>
    <form class=" bg-primary col-lg-4" action="post">
      <div class="hauteur stopPadMarg form-group">
        <img
          src="../assets/image/icon-left-font-monochrome-white.png"
          width="200"
          alt="logo-titre"
        />
        <br />
        <label class="text-white" for="email">
          Email
        </label>
        <br />
        <input class="form-control" type="text" name="email" />
        <br />
        <label class="text-white" for="mdp">Mot de passe </label>
        <br />
        <input class="form-control" type="text" name="mdp" />
        <br />
        <button class="btn btn-light text-primary" type="submit">
          Se connecter
        </button>
      </div>
    </form>
    <div class="bg-primary col-sm-2"></div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
