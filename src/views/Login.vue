<template>
  <div>Tela de Login:</div>
  <form @submit.prevent="login">
    <input type="text" v-model="userLogin.email" />
    <input type="password" v-model="userLogin.password" />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import router from "@/router";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginVue",
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
      axios.post(`http://localhost:3000/auth/login`, this.userLogin).then(
        (response) => {
            localStorage.setItem("token", response.data.access_token)
            router.push({ name: 'dashboard' })
        },
        (error) => {
          console.log(error);
          alert("Erro ao criar usuario");
        }
      );
    },
  },
});
</script>