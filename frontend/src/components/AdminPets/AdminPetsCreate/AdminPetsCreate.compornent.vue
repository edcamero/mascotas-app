<template>
  <div class="create-pets">
    <h4>Registrar Mascota</h4>
    <hr />
    <AdminPetsForm />
  </div>
</template>
<script>
import AdminPetsForm from "../AdminPetsForm/AdminPetsForm.component.vue";
export default {
  name: "AdminPetsCreate",
  components: {
    AdminPetsForm,
  },
};
</script>
<style scoped>
.create-pets {
  min-height: 22rem;
}
.btn-small{
  margin: 0.6rem;
}
hr {
  width: 208.5%;
  margin-left: -500px;
}
</style>
