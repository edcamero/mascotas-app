<template>
  <div class="row">
    <div class="col s12 ">
      <ul class="tabs cyan accent-4 ">
        <li class="tab col s3"><a class="active white-text" href="#fotos">Fotos</a></li>
        <li class="tab col s3"><a  class="white-text" href="#vacunas">Vacunas</a></li>
        <li class="tab col s3"><a class="white-text" href="#peso">Peso</a></li>
        <li class="tab col s3"><a class="white-text" href="#historial">Historial</a></li>
      </ul>
    </div>
    <div id="fotos" class="col s12">Acá va el modulo de fotos</div>
    <div id="vacunas" class="col s12">Test 2</div>
    <div id="peso" class="col s12">Test 3</div>
    <div id="historial" class="col s12">Test 4</div>
  </div>
</template>
<script>
import M from "materialize-css"

export default {
  name: "PetsOptions",
  mounted() {
    M.AutoInit();
  },
};
</script>
<style scoped>

li> a.active { 
    background-color:'#e3f2fd' !important;
}
</style>
