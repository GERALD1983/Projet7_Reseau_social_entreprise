<template>
  <form class="my-5 shadow col-md-12 bordurePost bordureRond">
    <div class="form-group">
      <label class="text-primary" for="exampleFormControlInput1"
        >Titre du post</label
      >
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="title..."
      />
    </div>
    <div class="form-group">
      <label class="text-primary" for="exampleFormControlTextarea1"
        >Description</label
      >
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder="Décrire le post..."
      ></textarea>
    </div>
    <div class="form-group">
      <label class="text-primary" for="exampleFormControlFile1"
        >Ajouter une image ou multimedia</label
      >
      <input
        type="file"
        class="form-control-file"
        id="exampleFormControlFile1"
      />
    </div>
    <div class="form-group row d-flex align-item-center justify-content-center">
      <div class="col-sm-10 ">
        <button type="submit" class="bg-light btn btn-outline-primary">
          Publier !
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "envoyer",
};
</script>

<style></style>
