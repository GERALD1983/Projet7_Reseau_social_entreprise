<template>
  <!-- component login -->
  <section
    class="hauteur stopPadMarg container-fluid d-sm-flex justify-content-between"
  >
    <!-- debut Menu navigation page de login -->
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

      <router-link class="text-white" to="/">S'inscrire</router-link>
      <br />
      <br />

      <router-link class="text-white" to="/login">Login</router-link>
    </div>
    <!-- fin Menu navigation page de login -->

    <!-- debut formulaire envoi login -->
    <div class="bg-primary text-white stopPadMarg col-lg-4">
      <form @submit.prevent="submit" class="col-md-12">
        <img
          src="../assets/image/icon-left-font-monochrome-white.png"
          width="200"
          alt="logo-titre"
        />
        <div class=" form-group">
          <label class="text-white" for="email">
            Email
          </label>

          <input
            class="form-control"
            type="text"
            name="email"
            v-model.trim="$v.email.$model"
          />
        </div>
        <div
          class="error"
          v-if="!$v.email.required && submitStatus === 'ERROR'"
        >
          Field is required
        </div>
        <div class="error" v-if="!$v.email.email">
          écrire un email valide ex: marty@hotmail.com
        </div>

        <div class=" form-group">
          <label class="text-white" for="mdp">Mot de passe </label>

          <input
            class="form-control"
            type="password"
            name="mdp"
            v-model.trim="$v.mdp.$model"
          />
        </div>
        <div class="error" v-if="!$v.mdp.required && submitStatus === 'ERROR'">
          Field is required
        </div>
        <div class="error" v-if="!$v.mdp.maxLength">
          Max. {{ $v.mdp.$params.maxLength.max }} letters.
        </div>
        <div class="error" v-if="!$v.mdp.minLength">
          Min. {{ $v.mdp.$params.minLength.min }} letters.
        </div>
        <div class="error" v-if="!$v.mdp.alphaNum">
          Que des chiffres et lettres pas de caractere speciaux
        </div>
        <div
          class="error"
          v-if="!$v.mdp.strongPassword && submitStatus === 'ERROR'"
        >
          Mot de passe doit contenir chiffre et lettre sans espace
        </div>

        <button
          class="mt-5 btnLogin btn btn-light text-primary"
          type="submit"
          :disabled="submitStatus === 'PENDING'"
        >
          Se Connecter
        </button>
        <p class="typo__p" v-if="submitStatus === 'OK'">
          Thanks for your submission!
        </p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">
          Please fill the form correctly.
        </p>
        <p class="typo__p" v-if="submitStatus === 'ERROR SERVEUR'">
          erreur serveur:Le mot de passe ou l'email ne correponde pas OU server
          HS !
        </p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

        <br />
        <br />
      </form>
    </div>
    <!-- fin formulaire envoi login -->
    <div class="bg-primary col-sm-2"></div>
  </section>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  alphaNum,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data() {
    return {
      users: Array,
      email: "",
      mdp: "",
      submitStatus: null,
      token: localStorage.getItem("acces_token") || null,
    };
  },
  // modele de validation librairie vuelidate
  validations: {
    email: { required, email },
    mdp: {
      required,
      alphaNum,
      minLength: minLength(8),
      maxLength: maxLength(30),
      strongPassword(mdp) {
        return (
          /[a-zA-Z]/.test(mdp) && // checks for a-z
          /[0-9]/.test(mdp) && // checks for 0-9
          mdp.length >= 8
        );
      },
    },
  },
  methods: {
    // envoie du formulaire login
    submit() {
      console.log("requete ver serveur!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log("A echouer informations non complete!");
      } else {
        // do your submit logic here
        console.log("En attente");
        this.submitStatus = "PENDING";

        axios
          .post("http://localhost:3000/login", {
            email: this.email,
            mdp: this.mdp,
          })
          .then((response) => {
            const token = (this.token = response.data.token);
            const userId = response.data.userId;

            localStorage.setItem("acces_token", token),
              localStorage.setItem("userId", userId),
              localStorage.setItem("userChoice", userId),
              (this.submitStatus = "OK"),
              console.log(response),
              this.$router.go("/post");
          })
          .catch(
            (error) => (
              (this.submitStatus = "ERROR SERVEUR"), console.log(error)
            )
          );
      }
    },
  },
};
</script>

<style></style>
