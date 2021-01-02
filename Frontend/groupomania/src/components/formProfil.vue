<template>
  <!-- component d'envoi de modification profil user connecter -->
  <div>
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <!-- debut change image user si ajoute image -->
      <div class="d-flex align-item-center justify-content-between">
        <img
          v-if="user.image_url !== null"
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
            @click="deleteUser(user)"
            class="btnsup mt-3 btn btn-sm btn-outline-danger"
          >
            Supprimer compte <b-icon icon="exclamation-triangle"></b-icon>
          </button>
        </div>
      </div>
      <!-- fin change image user -->

      <!-- debut verification formulaire imput nom prenom ville -->
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
      <!-- fin verification formulaire imput nom prenom ville -->

      <!-- upload image -->
      <div class="form-group">
        <label class="text-center" for="image"
          ><span class="text-primary mb-1">Ajouter une image de Profil </span>
          <br />
          (En cas de modif si vous n'ajouter pas d'image image sera par
          defaut)</label
        >
        <input
          type="file"
          ref="image"
          class="file-input mt-1"
          @change="upload"
        />
      </div>

      <!-- button envoie formData verif form et attente reponse serveur-->
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
      image: null,
      user: [],
      nom: "",
      prenom: "",
      ville: "",
      image_url: null,
      user_id: localStorage.getItem("userId") || null,
      submitStatus: null,
    };
  },

  // modele de validation vuelidate
  validations: {
    nom: { required, alpha, maxLength: maxLength(30) },
    prenom: { required, alpha, maxLength: maxLength(30) },
    ville: { required, alpha, maxLength: maxLength(30) },
    //image_url: {},
  },
  methods: {
    // upload l'image
    upload() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },

    // supprime le compte de l user connecter
    deleteUser(user) {
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

    // envoie le formulaire et update profil
    submit() {
      const formData = new FormData();
      if (this.image !== null || "") {
        formData.append("image", this.image, this.image.filename);
        formData.append("nom", this.nom);
        formData.append("prenom", this.prenom);
        formData.append("ville", this.ville);
      } else {
        formData.append("nom", this.nom);
        formData.append("prenom", this.prenom);
        formData.append("ville", this.ville);
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
          .put(`http://localhost:3000/user/${this.user_id}`, formData)
          .then((response) => {
            (this.submitStatus = "OK"), console.log(response);
            console.log(formData);
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

  // recupere infos du user connecter
  async created() {
    this.user = [];
    //this.postes = [];
    await axios
      .get(`http://localhost:3000/user/${this.user_id}`)
      .then((response) => ((this.user = response.data), console.log(response)))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
