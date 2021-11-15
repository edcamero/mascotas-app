<template>
  <div class="home">
    <BannerMain :title="getTitle" />
    <PetsContainer />
  </div>
</template>

<script>
// @ is an alias to /src
import BannerMain from "@/components/BannerMain.vue";
import PetsContainer from "@/components/PublicPets/PetsContainer.vue";


export default {
  
  name: "Home",
  components: {
    BannerMain,
    PetsContainer,
  },
  computed:{
    getTitle:()=>{
      return process.env.VUE_APP_PROJECT_NAME
    }
  }
};
</script>
