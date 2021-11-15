<template>
  <div class="row">
    <div v-for="pet in pets" :key="pet.id">
      <PetsCard :pet="pet" />
    </div>
  </div>
</template>
<script>
import PetsCard from "./PetsCard.component.vue";
import axios from "axios";

export default {
  name: "PetsContainer",
  components: {
    PetsCard,
  },
  props: {},
  data: () => ({
    pets: [],
    error: { status: 0, message: "" },
  }),
  mounted() {
    axios
      .get(`${process.env.VUE_APP_RUTA_API}pets`)
      .then((response) => (this.pets = response.data));
  },
};
</script>
<style scoped>
img {
  opacity: 70;
  max-height: 15rem;
}
.row{
  margin-top: 2rem;
  margin-left:3rem;
  margin-right: 3rem;
}
</style>
