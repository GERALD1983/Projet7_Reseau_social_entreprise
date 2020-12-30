<template>
  <nav class="stopPadMarg navbar navbar-expand-md navbar-light backPrimaire">
    <a
      @click="acceuil"
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
            Menu
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li @click="supprimChoice">
              <router-link class="dropdown-item" to="/profil"
                >Trouver vos collegues</router-link
              >
            </li>
            <li @click="myPoste">
              <router-link class="dropdown-item" :to="`/profil/${userChoice}`"
                >Trouver vos postes</router-link
              >
            </li>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Supprimer tous vos postes</a>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-end">
        <ul class="navbar-nav mr-3">
          <li class="ml-3 nav-item">
            <router-link class="text-primary nav-link" to="/upProfil">
              <b-icon-person-circle class="pr-1"></b-icon-person-circle>Mon
              Compte</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("acces_token"),
      user_id: localStorage.getItem("userId"),
      userChoice: localStorage.getItem("userChoice"),
      watch: {
        "$route.params.user_id"() {
          this.reloadAllStuff();
        },
      },
    };
  },
  created() {
    this.userChoice = this.$route.params.user_id;
  },
  methods: {
    deconnecte() {
      localStorage.removeItem("acces_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userChoice");
      this.$router.push("/login");
    },
    supprimChoice() {
      localStorage.removeItem("userChoice");
    },
    acceuil() {
      localStorage.setItem("userChoice", this.user_id);
      //const userChoice = localStorage.getItem("userChoice");
    },
    async myPoste() {
      await localStorage.setItem("userChoice", this.user_id);
      const user = localStorage.getItem("userId");

      //const path = `/profil/${this.user_id}`;
      //if (this.$route.path !== path) this.$router.push(path);

      this.$router.push(`/profil/${user}`);
    },
  },
};
</script>

<style></style>
