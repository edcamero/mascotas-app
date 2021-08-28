<template>
  <div class="admin container">
    <div class="col s12 m3">
      <Menu />
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import Menu from "./admin/MenuAdmin.vue";
export default {
  components: {
    Menu,
  },
};
</script>
