<template>
  <form class="needs-validation" novalidate>
    <img
      src="../assets/image/photo3.jpg"
      width="140px"
      class="bordureProfil rounded-circle"
      alt="logo"
    />
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="validationCustom01">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          value="Mark"
          required
        />
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="validationCustom02">Last name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value="Otto"
          required
        />
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="validationCustom03">City</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">
          Please provide a valid city.
        </div>
      </div>
    </div>
    <div class="form-row d-flex justify-content-center">
      <label>Image de profil</label>
      <div class="custom-file">
        <input type="file" class="custom-file-input " id="customFile " />
        <label class="custom-file-label" for="customFile">Choose file</label>
      </div>

      <div class="invalid-feedback">
        Please select a valid state.
      </div>
    </div>

    <button class="mb-1 mt-5 btn btn-primary backPrimaire" type="submit">
      Submit form
    </button>
  </form>
</template>

<script>
export default {
  name: "formProfil",
};
</script>
<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
</script>

<style></style>
