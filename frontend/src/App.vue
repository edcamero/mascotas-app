<template>
  <div class="container-fluid">
    <div class="navbar-fixed">
      <nav class="teal lighten-2">
        <div class="nav-wrapper">
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"
            ><i class="material-icons">menu1</i></a
          >
          <a
            href="#"
            data-target="slide-in"
            class="top-nav sidenav-trigger full hide-on-large-only"
            ><i class="material-icons">menu</i></a
          >
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li @click="changeMenu()">
              <router-link class="waves-effect waves-light" to="/">
                Home
              </router-link>
            </li>
            <li @click="changeMenu()">
              <router-link
                v-if="user?.rol?.name == 'admin' && isPublic"
                class="waves-effect waves-light"
                to="/admin/"
              >
                Admin
              </router-link>
            </li>
            <li>
              <router-link
                v-if="user?.rol?.name == 'fundacion'"
                class="waves-effect waves-light"
                to="/fundacion/"
              >
                Fundacion
              </router-link>
            </li>
            <li @click="changeMenu">
              <router-link
                v-if="rol == 'adoptante'"
                class="waves-effect waves-light"
                to="/adoptante/"
              >
                Adoptante
              </router-link>
            </li>
            <li v-if="isLogin" class="waves-effect waves-light">
              <a @click="logOut">Cerrar</a>
            </li>
            <li v-else>
              <router-link class="waves-effect waves-light" to="/login/">
                Ingresar
              </router-link>
            </li>
            <li>
              <router-link
                v-if="!isLogin"
                class="waves-effect waves-light"
                to="/register/"
              >
                Registrarme
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view class="row" />
    <ul id="mobile-demo" class="sidenav">
      <li>
        <router-link class="waves-effect waves-light" to="/">
          Home
        </router-link>
      </li>
      <li>
        <router-link v-if="rol == 'admin'" to="/admin/"> Admin </router-link>
      </li>
      <li>
        <router-link v-if="rol == 'fundacion'" to="/fundacion/">
          Fundacion
        </router-link>
      </li>
      <li>
        <router-link v-if="rol == 'adoptante'" to="/adoptante/">
          Adoptante
        </router-link>
      </li>
      <li v-if="isLogin">
        <a @click="logOut">Cerrar</a>
      </li>
      <li v-else>
        <router-link to="/login/"> Ingresar </router-link>
      </li>
      <li>
        <router-link v-if="!isLogin" to="/register/"> Registrarme </router-link>
      </li>
    </ul>
    <FooterComponent />
  </div>
</template>

<script>
import M from "materialize-css";
import FooterComponent from "./views/FooterComponent.vue";
import TokenService from "./services/token.service";

export default {
  components: { FooterComponent },
  data: () => ({
    isPublic: true,
    isLogin: false,
    user: null,
    rol: null,
  }),
  computed: {},
  watch: {
    isLogin(newLogin) {
      localStorage.isLogin = newLogin;
    },
  },
  created() {
    if (localStorage.isLogin == "true") {
      (this.isLogin = true), (this.rol = localStorage.getItem("rol"));
    }
  },
  mounted() {
    M.AutoInit();
    this.user = TokenService.getUser();
  },
  updated() {
    console.log(this.$router.options.history.location);
  },
  methods: {
    logOut() {
      (this.isLogin = false),
        (this.user = null),
        (this.rol = null),
        localStorage.setItem("isLogin", "true"),
        //localStorage.setItem('token', this.token),
        localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("username");
      this.$router.push("/");
    },
    changeMenu() {
      if (this.$router.options.history.location === "/admin/") {
        this.isPublic = false;
      } else {
        this.isPublic = true;
      }
    },
    hiddeMenu() {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
      instances.close();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
