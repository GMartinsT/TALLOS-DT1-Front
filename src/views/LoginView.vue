<template>
  <form @submit.prevent="login">
    <div class="login-page">
      <div class="card">
        <div class="card-header">LOGIN</div>
        <div class="card-body">
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input
              required
              type="text"
              v-model="userLogin.email"
              placeholder="E-mail"
              class="form-control"
            />
            <label for="password">Senha:</label>
            <input
              required
              type="password"
              v-model="userLogin.password"
              placeholder="Senha"
              class="form-control"
            />
            <button class="btn btn-primary w-100" type="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import authService from "@/services/authService";
import store from "@/store";
import { SocketModule } from "@/services/socket";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      userLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService.login(this.userLogin).then(async (response: any) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("sessionId", response.data.user.email);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("name", response.data.user.name);
        console.log("logResData", response.data);
        store.commit("setId", response.data.user._id);
        store.commit("setName", response.data.user.name);
        store.commit("setToken", response.data.access_token);
        store.commit("setRole", response.data.user.role);
        SocketModule.connect();
        await router.push({ name: "users" });
      });
    },
  },
});
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #aaaaaa;
  background-image: url("background2.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  object-fit: cover;
  padding-right: 12rem;
}
.login-page .card {
  width: 20%;
}
.btn {
  margin-top: 15px;
  background-color: #020d18;
  color: #399bc1;
  border-color: #111111;
}
.card {
  border-color: #111111;
  border-radius: 10px;
  background: none !important;
}
.form-control {
  margin-bottom: 1rem;
}
.card-body {
  background-color: #0b2840;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.card-header {
  background-color: #0b2840;
  color: #399bc1;
  text-align: center;
}
label {
  color: #399bc1;
}
</style>