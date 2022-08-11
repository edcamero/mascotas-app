<template>
  <div class="fixed-action-btn" @click="toggleMenu">
    <a class="btn-floating btn-large teal accent-1">
      <i class="large material-icons">menu</i>
    </a>
  </div>
</template>
<script lang="ts">
export default {
  name: "ButtonMenu",
  props: {
    menuVisible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
emits: ['toggleMenu'],
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu', false);
      console.log("ayuda");
    },
  },
};
</script>
