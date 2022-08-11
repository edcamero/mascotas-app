<template>
  <div class="view-pets">
    <h4>Detalle mascota</h4>
    <hr />
    <div v-if="pet !== null" class="row">
      <div class="col s12 l4">
        <ul class="collection cz-index">
          <li class="collection-item avatar">
            <i class="material-icons circle red">schedule</i>
            <span class="title">Edad</span>
            <p>{{ getAge(pet) }} Meses</p>
          </li>
          <li class="collection-item avatar">
            <i class="material-icons circle yellow">trending_up</i>
            <span class="title">Tamaño</span>
            <p>{{ pet.tamaño }}</p>
          </li>
        </ul>
      </div>
      <div class="col s12 l4">
        <ul class="collection cz-index">
          <li class="collection-item avatar">
            <i class="material-icons circle blue">content_cut</i>
            <span class="title">Esterilizado</span>
            <p>{{ getEsterilizado(pet) }}</p>
          </li>
          <li class="collection-item avatar">
            <i class="material-icons circle red">pets</i>
            <span class="title">Sexo</span>
            <p>{{ getSexo(pet) }}</p>
          </li>
        </ul>
      </div>
      <div class="col s12 l4">
        <ul class="collection cz-index">
          <li class="collection-item avatar">
            <i class="material-icons circle green">palette</i>
            <span class="title">Color</span>
            <p>{{ pet.color }}</p>
          </li>
          <li class="collection-item avatar">
            <i class="material-icons circle pink">description</i>
            <span class="title">Descripción</span>
            <p>{{ pet.descripcion }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <a class="waves-effect waves-light btn-small green lighten-1"
        ><i class="material-icons left">edit</i>Editar</a
      >
      <a class="waves-effect waves-light btn-small red lighten-1"
        ><i class="material-icons left">delete</i>Eliminar</a
      >
    </div>
    <PetsOptions />
  </div>
</template>
<script>
import axios from "axios";
import UsePets from "../Resources/UsePets.js";
import PetsOptions from "./components/PetsOptios.component.vue";
const { getSexo, getAge, getEsterilizado } = UsePets();

export default {
  name: "AdminPetsView",
  components: {
    PetsOptions,
  },
  data: () => ({
    pet: null,
    error: { status: 0, message: "" },
  }),
  mounted() {
    console.log(
      `${process.env.VUE_APP_RUTA_API}admin/pets/${this.$route.params.id}`
    );
    axios
      .get(`${process.env.VUE_APP_RUTA_API}admin/pets/${this.$route.params.id}`)
      .then((response) => (this.pet = response.data));
  },
  methods: {
    getSexo: getSexo,
    getAge: getAge,
    getEsterilizado: getEsterilizado,
  },
};
</script>
<style scoped>
.view-pets {
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
