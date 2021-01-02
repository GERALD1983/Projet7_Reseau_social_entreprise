<template>
  <!-- component d'inscription page inscription -->
  <section
    id="app"
    class="hauteur stopPadMarg container-fluid d-sm-flex justify-content-between"
  >
    <!-- debut colonne de navigation -->
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
    <!-- fin colonne de navigation -->

    <!-- debut colonne du milieu formulaire inscription  -->
    <div class="bg-primary text-white stopPadMarg col-lg-4">
      <form @submit.prevent="submit" class="bg-primary col-md-12">
        <img
          src="../assets/image/icon-left-font-monochrome-white.png"
          width="200"
          alt="logo-titre"
        />

        <!-- debut input a verifier avant validation -->
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
        <div class="error" v-if="!$v.nom.required && submitStatus === 'ERROR'">
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
        <div
          class="error"
          v-if="!$v.prenom.required && submitStatus === 'ERROR'"
        >
          Field is required
        </div>
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
        <div
          class="error"
          v-if="!$v.email.required && submitStatus === 'ERROR'"
        >
          Field is required
        </div>
        <div class="error" v-if="!$v.email.maxLength">
          Max. {{ $v.email.$params.maxLength.max }} letters.
        </div>
        <div class="error" v-if="!$v.email.email">
          écrire un email valide ex: marty@hotmail.com (sans Majuscules!)
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
        <!-- fin input a verifier avant validation -->

        <!-- debut button verifie formulaire avant validation et attente response -->
        <button
          class="my-5 btn btn-light text-primary"
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
        <p class="typo__p" v-if="submitStatus === 'ERROR SERVEUR'">
          erreur serveur: erreur saisie email existe déjà ou serveur HS !
        </p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

        <br />
        <br />
        <!-- fin button verifie formulaire avant validation et attente response -->
      </form>
    </div>
    <!-- fin colonne du milieu formulaire inscription  -->

    <!--  colonne de droite -->
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

  // methode validation vuelidate
  validations: {
    nom: { required, alpha, maxLength: maxLength(30) },
    prenom: { required, alpha, maxLength: maxLength(30) },
    email: { required, email, maxLength: maxLength(40) },
    mdp: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(8),
      alphaNum,
      strongPassword(mdp) {
        return (
          /[a-zA-Z]/.test(mdp) && // checks for a-z
          /^\S+$/.test(mdp) &&
          /[0-9]/.test(mdp) && // checks for 0-9
          mdp.length >= 8
        );
      },
    },
  },
  methods: {
    // envoie formulaire incription
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
          .then(
            (response) => (
              (this.submitStatus = "OK"),
              console.log(response),
              this.$router.push("/login")
            )
          )
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
