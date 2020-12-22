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
          placeholder="Search"
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
            <div>
              <h5 class="mt-2">
                {{ user.nom.toUpperCase() }}
              </h5>
              <h6 class="mb-3">{{ user.prenom.toLowerCase() }}</h6>
            </div>
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
      userDef: [],
      userConnect: [],
      comments: [],
      user_id: localStorage.getItem("userId"),
    };
  },
  async created() {
    this.postes = [];
    this.users = [];
    this.userDef = [];
    this.userConnect = [];
    //this.postes = [];
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
};
</script>

<style></style>
