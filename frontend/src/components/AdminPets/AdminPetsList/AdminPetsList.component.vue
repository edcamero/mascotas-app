<template>
  <div class="table-pets">
    <h5>Listado de animales</h5>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Especie</th>
          <th>Color</th>
          <th>Sexo</th>
          <th>Edad</th>
          <th>Esterilizado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
          <td>{{ pet.nombre }}</td>
          <td>Eclair</td>
          <td>{{ pet.especie }}</td>
          <td>{{ pet.color }}</td>
          <td>{{ getSexo(pet) }}</td>
          <td>{{ getAge(pet.fecha_nacimiento) }} meses</td>
          <td>{{ getEsterilizado(pet) }}</td>
          <td>
            <a class="waves-effect waves-light btn-small"
              ><i class="material-icons left">visibility</i>ver</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import { differenceInCalendarMonths } from "date-fns";

export default {
  name: "AdminPetsList",
  data: () => ({
    pets: [],
    error: { status: 0, message: "" },
  }),
  mounted() {
    axios
      .get(`${process.env.VUE_APP_RUTA_API}admin/pets`)
      .then((response) => (this.pets = response.data));
  },
  methods: {
    getSexo(pet) {
      return pet?.sexo === "F" ? "Hembra" : "macho";
    },
    getAge: (dateBegging) => {
      return differenceInCalendarMonths(new Date(), new Date(dateBegging));
    },
    getEsterilizado(pet) {
      return pet?.esterilizado ? "Si" : "No";
    },
  },
};
</script>
<style scoped>
.table-pets {
  min-height: 22rem;
}
hr {
  width: 208.5%;
  margin-left: -500px;
}
</style>
