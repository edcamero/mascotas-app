<template>
  <div class="admin container">
    <div class="col s12 m3">
      <Menu v-model:menu-visible.sync="menuPanelVisible" />
    </div>
    <main>
      <router-view />
    </main>
    <ButtonMenu v-model:menu-visible="menuPanelVisible" @toggleMenu="toggleMenu" />
  </div>
</template>
<script>
import Menu from "../components/AdminMenu/AdminMenu.vue";
import ButtonMenu from "../components/AdminMenu/ButtonMenu.component.vue";

export default {
  components: {
    Menu,
    ButtonMenu,
  },
  data: () => ({
    menuPanelVisible: true,
  }),
  methods: {
    toggleMenu() {
      this.menuPanelVisible = !this.menuPanelVisible;
    },
  },
};
</script>
<style scoped>
@media only screen and (min-width: 993px) {
  .container {
     width: 85%;
  }
}
</style>
