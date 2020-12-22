<template>
  <div>
    <form @submit.prevent="submit">
      <div class="d-flex align-item-center justify-content-between">
        <img
          v-if="user.image_url != null"
          :src="user.image_url"
          width="120px"
          height="120px"
          class=" bordureProfil rounded-circle"
          alt="logo"
        />
        <img
          v-else
          src="../assets/image/icon.png"
          width="120px"
          height="120px"
          class="
        bordureProfil rounded-circle"
        />
        <div>
          <button
            v-if="user_id == user.id"
            @click="deletePost(user)"
            class="mt-3 btn btn-sm btn-outline-danger"
          >
            Supprimer compte <b-icon icon="exclamation-triangle"></b-icon>
          </button>
        </div>
      </div>

      <div class="form-row mt-3">
        <div class="col-md-6 mb-3">
          <label for="nom">Nom : {{ user.nom }} </label>
          <input
            type="text"
            class="form-control"
            id="nom"
            v-model.trim="$v.nom.$model"
          />
          <div
            class="error"
            v-if="!$v.nom.required && submitStatus === 'ERROR'"
          >
            Field is required
          </div>
          <div class="error" v-if="!$v.nom.alpha">
            nom ne doit contenir que des lettres alphabetiques pas d'accent
          </div>
          <div class="error" v-if="!$v.nom.maxLength">
            Max. {{ $v.nom.$params.maxLength.max }} letters.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="prenom">Prenom : {{ user.prenom }} </label>
          <input
            type="text"
            class="form-control"
            id="prenom"
            v-model.trim="$v.prenom.$model"
          />
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
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="ville">Ville : {{ user.ville }} </label>
          <input
            type="text"
            class="form-control"
            id="ville"
            v-model.trim="$v.ville.$model"
          />
          <div
            class="error"
            v-if="!$v.ville.required && submitStatus === 'ERROR'"
          >
            Field is required
          </div>
          <div class="error" v-if="!$v.ville.alpha">
            prenom ne doit contenir que des lettres alphabetiques pas d'accent
          </div>
          <div class="error" v-if="!$v.ville.maxLength">
            Max. {{ $v.ville.$params.maxLength.max }} letters.
          </div>
        </div>
      </div>
      <!--
      <div class="form-row d-flex justify-content-center">
        <label>Image de profil</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input " id="customFile " />
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>

        <div class="invalid-feedback">
          Please select a valid state.
        </div>
      </div>-->
      <div class="form-row">
        <label class="text-center" for="image_url"
          >Ajouter une image ou multimedia</label
        >
        <input
          class="form-control-file"
          name="image_url"
          v-model.trim="$v.image_url.$model"
        />
      </div>
      <!--
      <div
        class="error"
        v-if="!$v.image_url.required && submitStatus === 'ERROR'"
      >
        Field is required
      </div>
  -->
      <button
        class="mb-1 mt-5 btn btn-primary backPrimaire"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        Change Profil
      </button>
      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR SERVEUR'">
        erreur serveur:Le mot de passe ou l'email ne correponde pas OU server HS
        !
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { required, alpha, maxLength } from "vuelidate/lib/validators";

export default {
  name: "formProfil",

  data() {
    return {
      user: [],

      nom: null,
      prenom: null,
      ville: null,
      image_url: null,
      user_id: localStorage.getItem("userId") || null,
      submitStatus: null,
    };
  },
  validations: {
    nom: { required, alpha, maxLength: maxLength(30) },
    prenom: { required, alpha, maxLength: maxLength(30) },
    ville: { required, alpha, maxLength: maxLength(30) },
    image_url: {},
  },
  async created() {
    this.user = [];
    //this.postes = [];
    await axios
      .get(`http://localhost:3000/user/${this.user_id}`)
      .then((response) => ((this.user = response.data), console.log(response)))
      .catch((error) => console.log(error));
  },
  methods: {
    deletePost(user) {
      axios
        .delete(`http://localhost:3000/user/${user.id}`, {})
        .then((response) => {
          //(this.submitStatus = "OK"),
          console.log(response), localStorage.clear(), this.$router.go("/");
        })
        .catch((error) =>
          // (this.submitStatus = "ERROR SERVEUR"),
          console.log(error)
        );
    },
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
          .put(`http://localhost:3000/user/${this.user_id}`, {
            nom: this.nom,
            prenom: this.prenom,
            ville: this.ville,
            image_url: this.image_url,
          })
          .then((response) => {
            (this.submitStatus = "OK"),
              console.log(response),
              this.$router.push("/post");
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
