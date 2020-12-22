<template>
  <div class="d-flex justify-content-center">
    <form
      @submit.prevent="submit"
      class="largeur80 my-5 shadow bordurePost bordureRond"
    >
      <div class="form-group">
        <label class="text-primary" for="titre">Titre du post</label>
        <input
          type="text"
          class="form-control"
          name="titre"
          placeholder="title..."
          v-model.trim="$v.titre.$model"
        />
      </div>
      <div class="error" v-if="!$v.titre.required && submitStatus === 'ERROR'">
        Field is required
      </div>
      <div class="form-group">
        <label class="text-primary" for="description">Description</label>
        <textarea
          class="form-control"
          name="description"
          rows="3"
          placeholder="Décrire le post..."
          v-model.trim="$v.description.$model"
        ></textarea>
      </div>
      <div
        class="error"
        v-if="!$v.description.required && submitStatus === 'ERROR'"
      >
        Field is required
      </div>
      <div class="form-group">
        <label class="text-primary" for="image_link"
          >Ajouter une image ou multimedia</label
        >
        <input
          type="url"
          class="form-control-file"
          name="image_link"
          v-model.trim="$v.image_link.$model"
        />
      </div>
      <!--
      <div
        class="error"
        v-if="!$v.image_link.required && submitStatus === 'ERROR'"
      >
        Field is required
      </div>
      -->
      <div
        class="form-group row d-flex align-item-center justify-content-center"
      >
        <div class="col-sm-10 ">
          <button
            type="submit"
            class="bg-light btn btn-outline-primary"
            :disabled="submitStatus === 'PENDING'"
          >
            Publier !
          </button>
          <p class="typo__p" v-if="submitStatus === 'OK'">
            Thanks for your submission!
          </p>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">
            Please fill the form correctly.
          </p>
          <p class="typo__p" v-if="submitStatus === 'ERROR SERVEUR'">
            erreur serveur:Le mot de passe ou l'email ne correponde pas OU
            server HS !
          </p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "envoyer",
  data() {
    return {
      titre: "",
      description: "",
      image_link: null || "",
      user_id: localStorage.getItem("userId") || null,
      submitStatus: null,
    };
  },
  validations: {
    titre: { required, maxLength: maxLength(100) },
    description: { required, maxLength: maxLength(500) },
    image_link: {},
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
          .post("http://localhost:3000/poste", {
            titre: this.titre,
            description: this.description,
            image_link: this.image_link,
            user_id: this.user_id,
          })
          .then((response) => {
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
