<template>
  <section
    class="stopPadMarg container-fluid d-md-flex justify-content-between"
  >
    <div class="py-5 stopPadMarg bg-primary col-md-1">
      <img
        src="../assets/image/icon.png"
        width="60px"
        class="rounded-circle"
        alt="logo"
      />
    </div>
    <!-- corps de page-->
    <div class="largeur80 larg100">
      <!-- retrouve collegues-->
      <form class="justify-content-center form-inline py-3 my-2 my-lg-0">
        <input
          v-model="searchKey"
          id="search"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search firstName.."
          aria-label="Search"
        />
      </form>
      <!-- fin retrouve collegues -->

      <!-- balise d'indications -->
      <div>
        <h3
          class="backPrimaire opacity mx-1 text-primary bordurePost bordureRond"
        >
          <b-icon-chevron-double-down
            class="stopMRL mr-5 my-1 pt-1 text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
          Vos collegues
          <b-icon-chevron-double-down
            class="stopMRL ml-5 my-1 pt-1 text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
        </h3>
      </div>
      <!-- fin balise d'indications -->

      <!-- affichage et choix user et suppresion pour admin -->
      <div class="hauteur h100">
        <div class="mt-5 d-flex flex-wrap">
          <div
            v-for="(user, id) in filteredList"
            v-bind:key="id"
            class="col-md-3 d-flex flex-column align-items-center align-content-center"
          >
            <div @click="changeUser(user)" class="cursor">
              <img
                v-if="user.image_url !== null || ''"
                :src="user.image_url"
                width="100px"
                height="100px"
                class=" justify-content-left bordureProfil
          rounded-circle"
              />
              <img
                v-else
                src="../assets/image/icon.png"
                width="100px"
                class=" justify-content-left bordureProfil rounded-circle"
              />
            </div>
            <div>
              <h5 class="mt-2">
                {{ user.nom.toUpperCase() }}
              </h5>
              <h6 class="mb-3">{{ user.prenom.toLowerCase() }}</h6>
            </div>
            <button
              v-if="user_id == 61"
              class="mb-2 btn btn-danger"
              @click="deleteUser(user)"
            >
              Bannir
            </button>
          </div>
        </div>
      </div>
      <!-- fin affichage user et suppression pour admin -->
    </div>
    <!-- fin corps de page-->
    <div class="py-5 stopPadMarg bg-primary col-md-1">
      <img
        src="../assets/image/icon.png"
        width="60px"
        class="rounded-circle"
        alt="logo"
      />
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      searchKey: "",
      //postes: [],
      users: [],
      user_id: localStorage.getItem("userId"),
      userChoice: localStorage.getItem("userChoice"),
      watch: {
        "$route.params.user_id"() {
          this.reloadAllStuff();
        },
      },
    };
  },
  async created() {
    this.users = [];

    await axios
      .get("http://localhost:3000/users")
      .then(
        (response) => ((this.users = response.data), console.log(this.users))
      )
      .catch((error) => console.log(error));
  },

  computed: {
    filteredList() {
      return this.users.filter((user) => {
        return user.nom.toLowerCase().includes(this.searchKey.toLowerCase());
      });
    },
  },
  methods: {
    async deleteUser(user) {
      await axios
        .delete(`http://localhost:3000/user/${user.id}`, {})
        .then((response) => {
          //(this.submitStatus = "OK"),
          console.log(response), this.$router.go("/post");
        })
        .catch((error) =>
          // (this.submitStatus = "ERROR SERVEUR"),
          console.log(error)
        );
    },
    async changeUser(user) {
      await localStorage.removeItem("userChoice");
      await localStorage.setItem("userChoice", user.id);
      //this.$route.params.user_id;

      await this.$router.push(`/profil/${user.id}`);
    },
  },
};
</script>

<style></style>
