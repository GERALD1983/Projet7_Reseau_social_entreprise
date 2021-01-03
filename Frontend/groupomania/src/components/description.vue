<template>
  <!-- component affiche carte de profil choisi parmis les collegues ou trouver mes postes-->
  <div class="mb-3 d-flex justify-content-center">
    <div class="largeur80 my-5 shadow bordurePost bordureRond">
      <div class="mt-3">
        <p class="text-primary">Nom du profil :</p>
      </div>
      <div>
        <p>{{ userChoice.nom }}</p>
      </div>
      <div>
        <p class="text-primary">Prenom du profil :</p>
      </div>
      <div>
        <p>{{ userChoice.prenom }}</p>
      </div>
      <div>
        <p class="text-primary">Habite actuellement dans la ville de :</p>
      </div>

      <div>
        <p v-if="userChoice.ville !== null || ''">{{ userChoice.ville }}</p>
        <p v-else>Ne la pas precisez !</p>
      </div>
      <div>
        <p class="text-primary">Photo de profil actuel :</p>
      </div>
      <div class="mb-3">
        <img
          v-if="userChoice.image_url !== null || ''"
          :src="userChoice.image_url"
          width="100px"
          height="100px"
          class=" justify-content-left bordureProfil
          rounded-circle"
          alt="photo-pageProfil-choice"
        />
        <img
          v-else
          src="../assets/image/icon.png"
          width="100px"
          class=" justify-content-left bordureProfil rounded-circle"
          alt="photo-pageProfil-choice-default"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      userChoice: localStorage.getItem("userChoice"),
    };
  },
  // recupere les infos du profil choisi parmi la route trouver collegues ou trouver mes postes
  async created() {
    await axios
      .get(`http://localhost:3000/user/${this.userChoice}`)
      .then(
        (response) => (
          (this.userChoice = response.data), console.log(this.userChoice.id)
        )
      )
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
