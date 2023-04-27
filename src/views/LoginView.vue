<template>
  <form @submit.prevent="login">
    <div class="login-page">
      <div class="card">
        <div class="card-header">Login</div>
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
      authService.login(this.userLogin).then(
        (response: any) => {
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
          router.push({ name: "users" });
        }
      );
    },
  },
});
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-page .card {
  width: 30%;
}
</style>