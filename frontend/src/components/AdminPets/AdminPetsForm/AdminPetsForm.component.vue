<template>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="name" type="text" class="validate" />
          <label for="name">Nombre de Mascota</label>
        </div>
        <div class="input-field col s6">
          <input id="color" type="text" class="validate" />
          <label for="color">Color de Mascota</label>
        </div>
        <div class="input-field col s6">
          <select>
            <option value="" disabled selected>Selecciona</option>
            <option value="1">Pequeño</option>
            <option value="2">Mediado</option>
            <option value="3">Grande</option>
          </select>
          <label>Tamaño de la mascota</label>
        </div>
        <div class="input-field col s6">
          <label for="date">Fecha de nacimiento</label>
          <input id="date" type="text" class="datepicker" />
        </div>
        <div class="input-field col s6">
          <select v-model="especie">
             <option value="" disabled selected>Selecciona</option>
            <option
              v-for="(specie, index) in speciesData"
              :key="index"
              :value="specie.nombre"
            >
              {{ specie.nombre }}
            </option>
          </select>
          <label>Especie</label>
        </div>
        <div class="input-field col s6">
          <select>
            <option value="" disabled selected>Selecciona</option>
            <option value="1">criollo</option>
            <option value="2">Pastor Aleman</option>
          </select>
          <label>Raza</label>
        </div>
        <div class="col s6">
          <label>Sexo:</label>
          <label>
            <input name="sexo" type="radio" />
            <span>macho</span>
          </label>
          <label>
            <input name="sexo" type="radio" />
            <span>hembra</span>
          </label>
        </div>
        <div class="min-height col s6">
          <label class="">
            <input type="checkbox" />
            <span>Esterilizado</span>
          </label>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import M from "materialize-css";
import axios from "axios";

export default {
  name: "AdminPetsForm",
  data: () => ({
    speciesData: [],
    especie: "Seleccione",
    pet: { especie: "" },
    error: { status: 0, message: "" },
  }),
  computed: {
    getSpecies() {
      return this.speciesData;
    },
  },
  async created() {
    let response = await axios.get(
      `${process.env.VUE_APP_RUTA_API}admin/species`
    );
    this.speciesData = response.data;
  },
  mounted() {
    M.AutoInit();
  },
  updated() {
    M.AutoInit();
  },
};
</script>
<style scoped>
.min-height {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}
</style>
