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
import { request } from "@/api";
import authService from "@/services/authService";
import store from "@/store";

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
          localStorage.setItem("id", response.data._id);
          localStorage.setItem("role", response.data.role);
          //store.commit('setId', response.data._id)
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