<template>
  <div class="home">
    <BannerMain title="Proyecto Patitas" />
    <PetsContainer />
  </div>
</template>

<script>
// @ is an alias to /src
import BannerMain from "@/components/BannerMain.vue";
import PetsContainer from "@/components/PetsContainer.vue";

export default {
  name: "Home",
  components: {
    BannerMain,
    PetsContainer,
  },
};
</script>
