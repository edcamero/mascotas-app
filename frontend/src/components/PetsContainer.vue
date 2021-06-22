<template>
  <div class="row">
    <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-image">
          <img :src="require('@/assets/logo.png')" />
          <span class="card-title">Tarzan</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"
            ><i class="material-icons">pets</i></a
          >
        </div>
        <div class="card-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text...
          </p>
        </div>
      </div>
    </div>
    <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-image">
          <img :src="require('@/assets/logo.png')" />
          <span class="card-title">Tarzan</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"
            ><i class="material-icons">pets</i></a
          >
        </div>
        <div class="card-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text...
          </p>
        </div>
      </div>
    </div>
    <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-image">
          <img :src="require('@/assets/logo.png')" />
          <span class="card-title">Tarzan</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"
            ><i class="material-icons">pets</i></a
          >
        </div>
        <div class="card-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PetsContainer",
  props: {},
};
</script>
<style scoped>
img {
  opacity: 70;
  max-height: 15rem;
}
</style>
