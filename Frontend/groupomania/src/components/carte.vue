<template>
  <div
    class=" d-flex flex-column my-5 align-items-center justify-content-center "
  >
    <div
      v-for="(poste, id) in postes.slice().reverse()"
      v-bind:key="id"
      class="col-md-8  d-flex align-items-center my-5 justify-content-center card bordurePost bordureRond border-primary shadow"
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
        <h4 class="card-title">{{ poste.titre }}</h4>
        <div class=" my-3">
          <img
            class="card-img-top"
            height="400px"
            :src="poste.image_link"
            alt="img-or-video"
          />
        </div>
        <h6 class="card-text">
          {{ poste.description }}
        </h6>
        <div
          v-for="(comment, id) in comments
            .map((comment) => {
              if (comment.post_id === poste.id) return comments.length;
            })
            .join('')"
          v-bind:key="id"
          class="d-flex mb-2 align-items-center justify-content-center align-content-center"
        >
          <img
            src="../assets/image/photo3.jpg"
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
            <p class="stopOpac stopPadMarg text-dark">George Alaman</p>
            <p class="stopOpac text-left stopPadMarg text-secondary">
              {{
                comments
                  .map((comment) => {
                    if (comment.post_id === poste.id) return comment.comment;
                  })
                  .join("")
              }}
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
              src="../assets/image/photo3.jpg"
              width="60px"
              height="60px"
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
      comments: [],
      user_id: localStorage.getItem("userId"),
    };
  },
  async created() {
    this.users = [];
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
    triPost() {
      return this.postes
        .map((triPost) => {
          return triPost;
        })
        .join("");
    },
    triComms() {
      return this.comments
        .map((comment) => {
          if (comment.post_id === this.poste.id) return comment.length;
        })
        .join("");
    },
  },
};
</script>

<style></style>
