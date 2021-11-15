<template>
  <div  class="carousel">
    <a v-for="image in images" :key="image.id" class="carousel-item" ><img class="materialboxed" :src="image.url" /></a>
  </div>
</template>
<script>
import M from "materialize-css"
export default {
  name: "ImageGallery",
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted(){
     M.AutoInit();
  }
};
</script>
