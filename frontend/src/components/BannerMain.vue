<template>
  <div id="index-banner" class="parallax-container">
    <div class="section no-pad-bot">
      <div class="container">
        <br />
        <br />
        <h1 class="header center light-text">
          {{ title }}
        </h1>
        <div class="row center">
          <h5 class="header col s12 light">
            “No vamos a salvar el mundo cuando rescatamos a un animal, pero para
            ese animal su mundo somos nosotros”
          </h5>
        </div>
        <div class="row center">
          <a
            id="download-button"
            href="http://materializecss.com/getting-started.html"
            class="btn-large waves-effect waves-light teal lighten-1"
            >Iniciar</a
          >
        </div>
        <br />
        <br />
      </div>
    </div>
    <div class="parallax">
      <img
        :src="require('@/assets/background1.jpg')"
        alt="Unsplashed background img 1"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "BannerMain",
  props: {
    title: {
      type: String,
      default: "title",
    },
  },
};
</script>
<style scoped>
.parallax-container {
  min-height: 380px;
  line-height: 0;
  height: auto;
  color: rgba(255, 255, 255, 0.9);
}
img {
  opacity: 70 !important;
}
.parallax-container .section {
  width: 100%;
}

@media only screen and (max-width: 992px) {
  .parallax-container .section {
    position: absolute;
    top: 40%;
  }
  #index-banner .section {
    top: 10%;
  }
}
@media only screen and (max-width: 600px) {
  #index-banner .section {
    top: 0;
  }
}
</style>
