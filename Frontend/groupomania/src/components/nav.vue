<template>
  <nav class="stopPadMarg navbar navbar-expand-md navbar-light backPrimaire">
    <a
      class="pl-1 navbar-brand text-secondary"
      href="http://localhost:8080/post"
      ><img
        class="color-secondary"
        width="200px"
        src="../assets/image/icon-left-font-monochrome-black.svg"
        alt=""
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-if="!token" class="nav-item active">
          <router-link class="text-primary nav-link" to="/"
            >S'inscrire</router-link
          >
        </li>
        <li v-if="!token" class="nav-item">
          <router-link class="text-primary nav-link" to="/login"
            >Login</router-link
          >
        </li>
        <li v-if="token" @click="deconnecte" class="nav-item">
          <router-link class="text-primary nav-link" to="/logout"
            >Logout</router-link
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Poster
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Cree un poste</a>
            <a class="dropdown-item" href="#">Trouver vos postes</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Supprimer tous vos postes</a>
          </div>
        </li>
        <li class="ml-3 nav-item">
          <router-link class="text-primary nav-link" to="/upProfil">
            <b-icon-person-circle class="pr-1"></b-icon-person-circle>Mon
            Profil</router-link
          >
        </li>
      </ul>
      <form class="justify-content-center form-inline py-3 my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          class="bg-light btn btn-outline-primary mr-3 py-1 my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  </nav>

  <!--
  <section
    class=" stopPadMarg bg-primary container-fluid d-sm-flex justify-content-around"
  >
    <div class="stopPadMarg">
      <img
        src="../assets/image/icon-left-font-monochrome-white.png"
        class="rounded-circle cube100"
        alt="logo"
      />
    </div>


   
    <div class="text-center cube100">
      <router-link class="text-white" to="/">S'inscrire</router-link>
    </div>
    <div class="text-center cube100">
     
      <router-link class="text-white" to="/login">Login</router-link>
    </div>
  </section>
  -->
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("acces_token"),
    };
  },
  methods: {
    deconnecte() {
      localStorage.removeItem("acces_token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
