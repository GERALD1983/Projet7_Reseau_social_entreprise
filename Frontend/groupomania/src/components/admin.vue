<template>
  <div class="col-md-12">
    <button type="button" class="my-3 btn btn-primary" @click="update()">
      Moderer commentaires
    </button>
    <div
      v-for="comment in comments"
      v-bind:key="comment"
      class="d-flex mb-2 align-items-center justify-content-center align-content-center"
    >
      <div
        class="col-md-8 mb-3 d-inline-flex flex-column align-items-start pl-3 minHeight bordureRond bodurePost border border-primary backPrimaire"
        min-heigth="50px"
      >
        <p>
          user: {{ comment.user_id }} post_id:
          {{ comment.post_id }}
        </p>
        <p>
          {{ comment.comment }}
        </p>
      </div>
      <b-button
        v-if="user_id == 59"
        @click="deleteComment(comment)"
        size="sm"
        variant="danger"
        class="d-flex visible justify-content-center bg-light ml-2 minHeight25 minwidth25"
      >
        <b-icon icon="trash-fill" variant="danger" aria-label="false"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      comments: Array,
      user_id: localStorage.getItem("userId"),
    };
  },
  methods: {
    update() {
      this.comments = [];
      axios
        .get("http://localhost:3000/commentaires")
        .then((response) => (this.comments = response.data))
        .catch((error) => console.log(error));
    },
    async deleteComment(comment) {
      await axios
        .delete(`http://localhost:3000/commentaire/${comment.id}`, {})
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
