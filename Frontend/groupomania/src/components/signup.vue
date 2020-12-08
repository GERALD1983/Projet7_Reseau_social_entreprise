<template>
  <section
    id="app"
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
      <!--  <p class="text-white">S'inscrire</p> -->
      <router-link class="text-white" to="/">S'inscrire</router-link>
      <br />
      <br />
      <!-- <p class="stopPadMarg text-white">Se connecter</p> -->
      <router-link class="text-white" to="/login">Login</router-link>
      <br />
      <br />
      <router-link class="text-white" to="/post">Poster</router-link>
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
          Incription
        </button>

        <br />
        <br />
        <button type="button" v-on:click="update()">
          mettre a jour test
        </button>
        <ul>
          <li v-for="post in posts" v-bind:key="post">{{ post }}</li>
        </ul>
      </div>
    </form>
    <div class="bg-primary col-sm-2"></div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: ["post1", "post2", "post3"],
    };
  },
  methods: {
    update() {
      axios
        .get("http://localhost:3000/commentaires")
        .then((response) => console.log(response.data));
    },
  },
};
</script>

<style></style>
