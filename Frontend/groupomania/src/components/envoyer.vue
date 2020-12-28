<template>
  <div class="d-flex justify-content-center">
    <form
      @submit.prevent="submit"
      enctype="multipart/form-data"
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
        <label class="mb-3 text-primary" for="image_link"
          >Ajouter une image: Jpg Jpeg ou Png ou multimedia: Mp4 accepter
          <br />
          Ps: Eviter les videos longues sinon sending Wait long !!
        </label>
        <br />
        <input type="file" ref="image" class="file-input" @change="upload" />
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
      image: null,
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
    upload() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },

    submit() {
      const formData = new FormData();
      if (this.image !== null || "") {
        formData.append("image", this.image, this.image.filename);
        formData.append("titre", this.titre);
        formData.append("description", this.description);
        formData.append("user_id", this.user_id);
      } else {
        formData.append("titre", this.titre);
        formData.append("description", this.description);
        formData.append("user_id", this.user_id);
      }

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
          .post(
            "http://localhost:3000/poste",
            formData
            //titre: this.titre,
            // description: this.description,
            // user_id: this.user_id,
          )
          .then((response) => {
            (this.submitStatus = "OK"), console.log(response);
            console.log(formData);
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
