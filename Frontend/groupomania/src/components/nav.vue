<template>
  <!-- component de navigation dans l application-->
  <nav class="stopPadMarg navbar navbar-expand-md navbar-light backPrimaire">
    <!-- redirige page des postes de tous les users -->
    <a
      @click="acceuil"
      class="pl-1 navbar-brand text-secondary"
      href="http://localhost:8080/post"
      ><img
        class="color-secondary"
        width="200px"
        src="../assets/image/icon-left-font-monochrome-black.svg"
        alt="logo-titre"
    /></a>
    <!-- mobile button -->
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

    <!-- en cas d'atterisage ou de bug pour retrouver les routes par accident sur l aplication sans token navigation cacher-->

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

        <!-- bouton logout meme si son token expire tant qu il est stocker dans localstorage il pourra se logout-->

        <li v-if="token" @click="deconnecte" class="nav-item">
          <router-link class="text-primary nav-link" to="/logout"
            >Logout</router-link
          >
        </li>
        <!-- Menu poste user et collegue -->

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
            <li v-if="userChoice == user_id" @click="myPoste">
              <router-link class="dropdown-item" :to="{ myPoste }"
                >Trouver vos postes</router-link
              >
            </li>
          </div>
        </li>
      </ul>
      <!-- Mon compte-->
      <div class="d-flex justify-content-end">
        <ul class="navbar-nav mr-3">
          <li @click="acceuil" class="ml-3 nav-item">
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
    };
  },

  methods: {
    // methode deconnecte supprime localstorage
    deconnecte() {
      localStorage.removeItem("acces_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userChoice");
      this.$router.push("/login");
    },

    // supprime l user choisit dans local storage
    supprimChoice() {
      localStorage.removeItem("userChoice");
    },

    // ajoute l'user choisit au local storage
    acceuil() {
      localStorage.setItem("userChoice", this.user_id);
    },

    // redirige vers les postes de l utilisateur connecter
    async myPoste() {
      await localStorage.setItem("userChoice", this.user_id);
      await localStorage.getItem("userChoice");
      await this.$router.push(`/profil/${this.userChoice}`);

      /* phase de test je garde ce code en reserve

      //this.$route.params.user_id;
      //await localStorage.removeItem("userChoice");
      // await this.$router.push(`/profil/${user_id}`);
      // localStorage.removeItem("userChoice");
      //localStorage.setItem("userChoice", this.user_id);
      //const user = localStorage.getItem("userId");
      //const path = `/profil/${this.userChoice}`;
      //if (this.$route.path == path) this.$router.push(path);
      */
    },
  },
};
</script>

<style></style>
