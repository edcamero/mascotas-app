<template>
  <div class="row">
    <div class="col s12">
      <h1 class="title-detail-pet">Mas sobre {{ pet?.nombre }}</h1>
    </div>
    <div class="col s6">
      <ImageGallery v-if="pet?.fotos?.length > 0" :images="pet.fotos" />
    </div>
    <div class="col s6">
      <div class="row">
        <div class="col s6">
          <ul class="collection cz-index">
            <li class="collection-item avatar">
              <i class="material-icons circle red">schedule</i>
              <span class="title">Edad</span>
              <p>{{ getAge(pet.fecha_nacimiento) }} Meses</p>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle yellow">trending_up</i>
              <span class="title">Tamaño</span>
              <p>{{ pet.tamaño }}</p>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle green">palette</i>
              <span class="title">Color</span>
              <p>{{ pet.color }}</p>
            </li>
          </ul>
        </div>
        <div class="col s6">
          <ul class="collection cz-index">
            <li class="collection-item avatar">
              <i class="material-icons circle blue">content_cut</i>
              <span class="title">Esterilizado</span>
              <p>{{ getEsterilizado }}</p>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle red">pets</i>
              <span class="title">Sexo</span>
              <p>{{ getSexo }}</p>
            </li>
          </ul>
        </div>
        <div class="col s12">
          <ul class="collection cz-index">
            <li class="collection-item avatar">
              <i class="material-icons circle pink">description</i>
              <span class="title">Descripción</span>
              <p>{{ pet.descripcion }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { differenceInCalendarMonths } from "date-fns";
import ImageGallery from "./ImageGallery.component.vue";

export default {
  name: "PetsDetails",
  components: {
    ImageGallery,
  },
  data: () => ({
    pet: {},
    error: { status: 0, message: "" },
  }),
  computed: {
    getParamId: () => {
      return this?.$route?.params?.id;
    },
    getSexo() {
      return this?.pet?.sexo === "F" ? "Hembra" : "macho";
    },
    getEsterilizado() {
      return this?.pet?.esterilizado ? "Si" : "No";
    },
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_RUTA_API}pets/${this.$route.params.id}`)
      .then((response) => (this.pet = response.data));
  },
  methods: {
    getAge: (dateBegging) => {
      return differenceInCalendarMonths(new Date(), new Date(dateBegging));
    },
  },
};
</script>
<style scoped>
.title-detail-pet {
  text-align: center;
}
.cz-index {
  z-index: -50 !important;
}
</style>
