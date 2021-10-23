<template>
  <div id="login-page" class="row">
    <div class="col s12 l4 offset-l4 z-depth-6 card-panel">
      <form class="login-form" @submit.prevent="login">
        <div class="row" />
        <div class="row">
          <h4>Login</h4>
          <div class="input-field col s12">
            <i class="material-icons prefix">mail_outline</i>
            <input id="email" v-model="email" class="validate" type="email" />
            <label for="email" data-error="wrong" data-success="right"
              >Email</label
            >
            <span v-if="error.status === 404" class="helper-text red-text"
              >Error en el correo</span
            >
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <input id="password" v-model="password" type="password" />
            <label for="password">Password</label>
            <span v-if="error.status === 401" class="helper-text red-text"
              >Contraseña no valida</span
            >
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 m12 l12 login-text">
            <label>
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button class="btn waves-effect waves-light col s12">
              Ingresar
            </button>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 m6 l6">
            <p class="margin medium-small">
              <a href="#">Registrarme!</a>
            </p>
          </div>
          <div class="input-field col s6 m6 l6">
            <p class="margin right-align medium-small">
              <a href="#">Olvide mi contraseña</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const statusNotfound = 404;
import TokenService from "../../services/token.service";
import axios from "../../services/axios.services"

export default {
  data: () => ({
    email: null,
    password: null,
    token: { access_token: "", refresh_token: "" },
    user: {id: "",username:"",rol:{ name: ""}},
    error: { status: 0, message: "" },
  }),

  methods: {
    login() {
      let formData = new FormData();
      if (this.email && this.password) {
        console.log(process.env.VUE_APP_RUTA_API + "login");
        console.log(this.password);
        formData.append("email", this.email);
        formData.append("password", this.password);
        axios
          .post(process.env.VUE_APP_RUTA_API + "login", formData)
          .then(
            (response) => (
              (this.user = response.data.user),
              (this.token = response.data.token),
              console.log(response.data),
              localStorage.setItem("isLogin", "true"),
              (this.$root.isLogin = true),
              
              TokenService.setUser(response.data.user),
              TokenService.setToken(response.data.token),
              this.redireccionar(this.user.rol.name)
            )
          )           
          .catch((error) => {
            this.error.status = error.response.status;
            this.error.message =
              error.response.status === statusNotfound
                ? "Correo no registrado"
                : "Error en la contraseña";
          });
      }
    },
    redireccionar(rol) {
      switch (rol) {
        case "adoptante":
          this.$router.push("/adoptante");
          break;
        case "admin":
          this.$router.push("/admin");
          break;
        case "fundacion":
          this.$router.push("/fundacion");
          break;
      }
    },
  },
};
</script>
