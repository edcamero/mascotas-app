<template>
  <footer class="page-footer teal lighten-2">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">{{getTitle}}</h5>
          <p class="grey-text text-lighten-4">
            Esté proyecto nace del nace del amor por loa animales y por querer darles una nueva oportunidad y muchos animales que han sido victima de maltrato y abandonados en las calles.
          </p>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container center-align">© 2021 Copyright Enyerson Camero</div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "FooterComponent",
  computed:{
    getTitle:()=>{
     return  process.env.VUE_APP_PROJECT_NAME
    }
  }
};
</script>
<style scoped>
footer {
  padding-left: 0px !important;
}
</style>
