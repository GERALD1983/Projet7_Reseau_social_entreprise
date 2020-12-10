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
    </div>
    <div class="bg-primary stopPadMarg col-lg-4">
      <form @submit.prevent="submit" class="col-md-12">
        <img
          src="../assets/image/icon-left-font-monochrome-white.png"
          width="200"
          alt="logo-titre"
        />
        <div class=" form-group">
          <label class="text-white" for="nom">
            Nom
          </label>

          <input
            class="form-control"
            type="text"
            name="nom"
            v-model.trim="$v.nom.$model"
          />
        </div>
        <div class="error" v-if="!$v.nom.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.nom.alpha">
          nom ne doit contenir que des lettres alphabetiques pas d'accent
        </div>
        <div class="error" v-if="!$v.nom.maxLength">
          Max. {{ $v.nom.$params.maxLength.max }} letters.
        </div>

        <div class=" form-group">
          <label class="text-white" for="prenom">
            Prenom
          </label>

          <input
            class="form-control"
            type="text"
            name="prenom"
            v-model.trim="$v.prenom.$model"
          />
        </div>
        <div class="error" v-if="!$v.prenom.required">Field is required</div>
        <div class="error" v-if="!$v.prenom.alpha">
          prenom ne doit contenir que des lettres alphabetiques pas d'accent
        </div>
        <div class="error" v-if="!$v.prenom.maxLength">
          Max. {{ $v.prenom.$params.maxLength.max }} letters.
        </div>

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
        <div class="error" v-if="!$v.email.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.email.email">
          écrire un email valide ex: marty@hotmail.com
        </div>

        <div class=" form-group">
          <label class="text-white" for="mdp">Mot de passe </label>

          <input
            class="form-control"
            type="text"
            name="mdp"
            v-model.trim="$v.mdp.$model"
          />
        </div>
        <div class="error" v-if="!$v.mdp.required">Field is required</div>
        <div class="error" v-if="!$v.mdp.minLength">
          Min. {{ $v.mdp.$params.minLength.min }} letters.
        </div>
        <div class="error" v-if="!$v.mdp.strongPassword || !$v.mdp.alphaNum">
          Mot de passe doit contenir chiffre et lettre sans charactere speciaux
        </div>

        <button
          class="btn btn-light text-primary"
          type="submit"
          :disabled="submitStatus === 'PENDING'"
        >
          Incription
        </button>
        <p class="typo__p" v-if="submitStatus === 'OK'">
          Thanks for your submission!
        </p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">
          Please fill the form correctly.
        </p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

        <br />
        <br />
        <button type="button" v-on:click="update()">
          mettre a jour test
        </button>
        <ul>
          <li v-for="user in users" v-bind:key="user">{{ user.email }}</li>
        </ul>
      </form>
    </div>
    <div class="bg-primary col-sm-2"></div>
  </section>
</template>

<script>
import {
  required,
  minLength,
  email,
  maxLength,
  alpha,
  alphaNum,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data() {
    return {
      users: Array,
      nom: "",
      prenom: "",
      email: "",
      mdp: "",
      submitStatus: null,
    };
  },
  validations: {
    nom: { required, alpha, maxLength: maxLength(30) },
    prenom: { required, alpha, maxLength: maxLength(30) },
    email: { required, email },
    mdp: {
      required,
      alphaNum,
      minLength: minLength(8),
      strongPassword(mdp) {
        return (
          /[a-z]/.test(mdp) && // checks for a-z
          /[0-9]/.test(mdp) && // checks for 0-9
          mdp.length >= 8
        );
      },
    },
  },
  methods: {
    submit() {
      console.log("requete ver serveur!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log("A echouer informations non complete!");
      } else {
        // do your submit logic here
        console.log("Reussi tout a bien été recu");
        this.submitStatus = "PENDING";

        axios
          .post("http://localhost:3000/signup", {
            email: this.email,
            mdp: this.mdp,
            nom: this.nom,
            prenom: this.prenom,
          })
          .then((response) => console.log(response))
          .catch((error) => console.log(error));

        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    update() {
      this.users = [];
      axios
        .get("http://localhost:3000/users")
        .then((response) => (this.users = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
