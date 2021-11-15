<template>
  <div class="col s12 m6 l4">
    <div class="card">
      <div class="card-image">
        <div v-for="foto in pet.fotos" :key="foto.id">
          <img :src="foto.url" />
        </div>
        <span class="card-title"
          ><h4>{{ pet.nombre }}</h4></span
        >
        <router-link :to="getRoute" class="btn-floating halfway-fab waves-effect waves-light red"
          ><i class="material-icons">pets</i></router-link 
        >
        
      </div>
      <div class="card-content">
        <p>Edad : {{ getAge(pet.fecha_nacimiento) }} meses de edad.</p>
        <p>Tamaño : {{ pet.tamaño }}.</p>
        <p>Sexo : {{ getSexo }}.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { differenceInCalendarMonths } from "date-fns"
export default {
  name: "PetsCard",
  props: {
    pet: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getSexo(){
      return this?.pet?.sexo==="F"?"Hembra":"macho"
    },
    getRoute(){
      return `/pets/${this.pet.ID}`
    }
  },
  methods: {
    getAge: (dateBegging) => {
      return differenceInCalendarMonths(new Date(), new Date(dateBegging));
    },
  }
};
</script>
<style scoped>
img {
  opacity: 70;
  max-height: 15rem;
  border-radius: 10px 10px 0px 0px !important;
}
.card {
  border-radius: 10px;
}
.card-image {
  border-radius: 10px;
}
</style>
