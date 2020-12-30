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
    <div class="largeur80">
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
      <div>
        <h3
          class="backPrimaire opacity mx-1 text-primary bordurePost bordureRond"
        >
          <b-icon-chevron-double-down
            class="mr-5 my-1 pt-1 text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
          Vos collegues
          <b-icon-chevron-double-down
            class="ml-5 my-1 pt-1 text-secondary"
            animation="cylon-vertical"
            font-scale="1"
          ></b-icon-chevron-double-down>
        </h3>
      </div>
      <div class="hauteur">
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
    </div>

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
      postes: [],
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
    this.postes = [];
    this.users = [];

    await axios
      .get("http://localhost:3000/postes")
      .then(
        (response) => ((this.postes = response.data), console.log(response))
      )
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/users")
      .then(
        (response) => ((this.users = response.data), console.log(this.users))
      )
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/users")
      .then(
        (response) => (
          (this.userDef = response.data.find((user) => {
            return user.id;
          })),
          console.log(this.userDef)
        )
      )
      .catch((error) => console.log(error));

    await axios
      .get(`http://localhost:3000/user/${this.user_id}`)
      .then(
        (response) => (
          (this.userConnect = response.data), console.log(this.userConnect.id)
        )
      )
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/commentaires")
      .then(
        (response) => (
          (this.comments = response.data), console.log(this.comments)
        )
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
