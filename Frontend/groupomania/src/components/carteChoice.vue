<template>
  <div
    v-if="postes && postes.some((poste) => poste.user_id == userConnect.id)"
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
                      if (user.id === poste.user_id) return user.prenom;
                    })
                    .join("")
                }}
                {{
                  users
                    .map((user) => {
                      if (user.id === poste.user_id) return user.nom;
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
              users
                .map((user) => {
                  if (user.id === comment.user_id) return user.image_url;
                })
                .join('') !== (null || '')
            "
            :src="
              users
                .map((user) => {
                  if (user.id === comment.user_id) return user.image_url;
                })
                .join('')
            "
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
                users
                  .map((user) => {
                    if (user.id === comment.user_id) return user.prenom;
                  })
                  .join("")
              }}
              {{
                users
                  .map((user) => {
                    if (user.id === comment.user_id) return user.nom;
                  })
                  .join("")
              }}
            </p>
            <p class="stopOpac text-left stopPadMarg text-secondary">
              {{ comment.comment }}
            </p>
          </div>
          <b-button
            v-if="user_id == comment.user_id"
            @click="deleteComment(comment)"
            size="sm"
            variant="danger"
            class="d-flex visible justify-content-center bg-light ml-2 minHeight25 minwidth25"
          >
            <b-icon
              icon="trash-fill"
              variant="danger"
              aria-label="false"
            ></b-icon>
          </b-button>
          <b-button
            v-else-if="user_id != comment.user_id"
            size="sm"
            variant="danger"
            class="d-flex invisible justify-content-center bg-light ml-2 minHeight25 minwidth25"
          >
            <b-icon
              icon="trash-fill"
              variant="danger"
              aria-label="false"
            ></b-icon>
          </b-button>
        </div>
        <form @submit.prevent="submit(poste)" class="mt-1 form-group">
          <label class="text-primary" for="commentaire"
            >Laisser un commentaire</label
          >
          <div
            class="d-flex align-items-center justify-content-center align-content-center"
          >
            <img
              v-if="userConnect.image_url !== null || ''"
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
              placeholder="Commentaire..."
              v-model.trim="$v.commentaire.$model"
            />
          </div>
          <div
            class="error"
            v-if="!$v.commentaire.required && submitStatus === 'ERROR'"
          >
            Field is required
          </div>
          <div class="error" v-if="!$v.commentaire.maxLength">
            Max. {{ $v.commentaire.$params.maxLength.max }} letters.
          </div>
          <div class="d-flex justify-content-end">
            <input
              class=" bordureRond bodurePost border border-primary backPrimaire"
              type="submit"
              value="envoyer"
            />
          </div>
          <p class="typo__p" v-if="submitStatus === 'OK'">
            Thanks for your submission!
          </p>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">
            Please fill the form correctly.
          </p>
          <p class="typo__p" v-if="submitStatus === 'ERROR SERVEUR'">
            erreur serveur! ou commentaire n'a pas un bon format ou server HS !
          </p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        </form>
      </div>
    </div>
  </div>
  <div v-else class="my-4">
    <h1>Pas de poste actuellement</h1>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "carte",
  data() {
    return {
      commentaire: "",
      postes: [],
      users: [],
      userDef: [],
      userConnect: [],
      comments: [],
      user_id: localStorage.getItem("userId"),
      userChoice: localStorage.getItem("userChoice"),
      submitStatus: null,
    };
  },
  validations: {
    commentaire: { required, maxLength: maxLength(200) },
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
      .get(`http://localhost:3000/user/${this.userChoice}`)
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
    async submit(poste) {
      console.log("requete ver serveur!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log("A echouer informations non complete!");
      } else {
        // do your submit logic here
        console.log("En attente");
        this.submitStatus = "PENDING";

        await axios
          .post("http://localhost:3000/commentaire", {
            comment: this.commentaire,
            post_id: poste.id,
            user_id: this.user_id,
          })
          .then((response) => {
            (this.submitStatus = "OK"), console.log(response);
            localStorage.setItem("userChoice", this.user_id);
            this.$router.go(`/post`);
          })
          .catch(
            (error) => (
              (this.submitStatus = "ERROR SERVEUR"), console.log(error)
            )
          );
      }
    },
    deletePost(poste) {
      axios
        .delete(`http://localhost:3000/poste/${poste.id}`, {})
        .then((response) => {
          //(this.submitStatus = "OK"),

          console.log(response),
            localStorage.setItem("userChoice", this.user_id);
          this.$router.go("/post");
        })
        .catch((error) =>
          // (this.submitStatus = "ERROR SERVEUR"),
          console.log(error)
        );
    },
    async deleteComment(comment) {
      await axios
        .delete(`http://localhost:3000/commentaire/${comment.id}`, {})
        .then((response) => {
          //(this.submitStatus = "OK"),
          console.log(response),
            localStorage.setItem("userChoice", this.user_id);
          this.$router.go("/post");
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
