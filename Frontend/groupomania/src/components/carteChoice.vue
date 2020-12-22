<template>
  <div
    class=" d-flex flex-column my-5 align-items-center justify-content-center "
  >
    <div
      v-for="(poste, id) in filterPost.slice().reverse()"
      v-bind:key="id"
      class="largeur80 d-flex align-items-center my-5 justify-content-center card bordurePost bordureRond border-primary shadow"
    >
      <div class="card-body p-3 container-fluid">
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <img
              v-if="
                users
                  .map((user) => {
                    if (user.id === poste.user_id) return user.image_url;
                  })
                  .join('') !== (null || '')
              "
              :src="
                users
                  .map((user) => {
                    if (user.id === poste.user_id) return user.image_url;
                  })
                  .join('')
              "
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
            <div class="ml-3 align-item-center justify-content-center">
              <h5>
                {{
                  users
                    .map((user) => {
                      if (user.id === poste.user_id) return user.email;
                    })
                    .join("")
                }}
                {{
                  users
                    .map((user) => {
                      if (user.id === poste.user_id) return user.id;
                    })
                    .join("")
                }}
              </h5>
              <h6>Publié le: {{ poste.date_cree }}</h6>
            </div>
          </div>
          <b-button
            v-if="user_id == poste.user_id"
            @click="deletePost(poste)"
            size="sm"
            variant="danger"
            class="bg-light mb-2 minHeight30"
          >
            <b-icon
              icon="trash-fill"
              variant="danger"
              aria-label="false"
            ></b-icon>
          </b-button>
        </div>

        <h4 class=" largeur100 card-title">{{ poste.titre }}</h4>
        <div class=" my-3">
          <img
            v-if="poste.image_link !== '' && poste.image_link !== null"
            class="card-img-top"
            height="400px"
            :src="poste.image_link"
            alt="img-or-video"
          />
        </div>
        <div>
          <div class="text-left  text-wrap py-3 card-text">
            {{ poste.description }}
          </div>
        </div>

        <div
          v-for="(comment, id) in comments.filter((comment) => {
            return comment.post_id == poste.id;
          })"
          v-bind:key="id"
          class="d-flex mb-2 align-items-center justify-content-center align-content-center"
        >
          <img
            v-if="
              comment.user_id === userConnect.id &&
                (!userConnect.image_url == null || '')
            "
            :src="userConnect.image_url"
            width="60px"
            height="60px"
            class=" mr-3 justify-content-left bordurePost
          rounded-circle"
            alt=""
          />
          <img
            v-else
            src="../assets/image/icon.png"
            width="60px"
            height="60px"
            class=" mr-3 justify-content-left bordurePost
          rounded-circle"
            alt=""
          />

          <div
            class=" d-inline-flex flex-column align-items-start pl-3 largeur100 minHeight bordureRond bodurePost border border-primary backPrimaire"
            min-heigth="60px"
          >
            <p class="stopOpac stopPadMarg text-dark">
              {{
                users.map((user) => {
                  if (user.id === comment.user_id) return user.prenom;
                })
              }}
              {{ userConnect.nom }}
            </p>
            <p class="stopOpac text-left stopPadMarg text-secondary">
              {{ comment.comment }}
            </p>
          </div>
          <b-button
            size="sm"
            variant="danger"
            class="d-flex justify-content-center bg-light ml-2 minHeight25 minwidth25"
          >
            <b-icon
              icon="trash-fill"
              variant="danger"
              aria-label="false"
            ></b-icon>
          </b-button>
        </div>
        <div class="mt-1 form-group">
          <label class="text-primary" for="commentaire"
            >Laisser un commentaire</label
          >
          <div
            class="d-flex align-items-center justify-content-center align-content-center"
          >
            <img
              v-if="
                poste.user_id === userConnect.id &&
                  (userConnect.image_url !== null || '')
              "
              :src="userConnect.image_url"
              width="50px"
              height="50px"
              class=" mr-3 justify-content-left bordurePost
          rounded-circle"
              alt=""
            />
            <img
              v-else
              src="../assets/image/icon.png"
              width="50px"
              height="50px"
              class=" mr-3 justify-content-left bordurePost
          rounded-circle"
              alt=""
            />
            <input
              type="text"
              class="form-control"
              name="commentaire"
              placeholder="Commentaires..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "carte",
  data() {
    return {
      postes: [],
      users: [],
      userDef: [],
      userConnect: [],
      comments: [],
      user_id: localStorage.getItem("userId"),
    };
  },
  computed: {
    filterUser() {
      return this.users.filter((user) => {
        return user.id;
      });
    },
    filterUserimage() {
      return this.users.filter((user) => {
        return user.image_url;
      });
    },
    filterUsernom() {
      return this.users.filter((user) => {
        return user.nom;
      });
    },
    filterPost() {
      return this.postes.filter((poste) => {
        return poste.user_id == this.userConnect.id;
      });
    },
    filterComm() {
      return this.comments.filter((comment) => {
        return comment.user_id == this.userConnect.id;
      });
    },
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

  methods: {
    deletePost(poste) {
      axios
        .delete(`http://localhost:3000/poste/${poste.id}`, {})
        .then((response) => {
          //(this.submitStatus = "OK"),
          console.log(response), this.$router.go("/post");
        })
        .catch((error) =>
          // (this.submitStatus = "ERROR SERVEUR"),
          console.log(error)
        );
    },
  },
};
</script>

<style></style>
