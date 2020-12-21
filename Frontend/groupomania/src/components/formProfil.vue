<template>
  <div>
    <form @submit.prevent="submit">
      <div class="d-flex align-item-center justify-content-between">
        <img
          src="../assets/image/photo3.jpg"
          width="140px"
          class=" bordureProfil rounded-circle"
          alt="logo"
        />
        <div>
          <button class="mt-3 btn btn-sm btn-outline-danger" type="submit">
            Supprimer profil <b-icon icon="exclamation-triangle"></b-icon>
          </button>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="nom">First name</label>
          <input
            type="text"
            class="form-control"
            id="nom"
            v-model.trim="user.nom"
          />
          <div
            class="error"
            v-if="!$v.nom.required && submitStatus === 'ERROR'"
          >
            Field is required
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validationCustom02">Last name</label>
          <input
            type="text"
            class="form-control"
            id="validationCustom02"
            value="Otto"
            required
          />
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="validationCustom03">City</label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
      </div>
      <div class="form-row d-flex justify-content-center">
        <label>Image de profil</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input " id="customFile " />
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>

        <div class="invalid-feedback">
          Please select a valid state.
        </div>
      </div>

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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "formProfil",

  data() {
    return {
      user: [],

      nom: "",
      prenom: "",
      ville: "",
      image_url: "",
      user_id: localStorage.getItem("userId") || null,
      submitStatus: null,
    };
  },
  validations: {
    nom: { required, minLength: minLength(8) },
    prenom: { required },
    ville: { required },
    image_url: { required },
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
