
<template>
  <nav class="navbar" data-bs-theme="dark">
    <a class="navbar-brand" href="/logo-dt1.png">
      <img
        class="logo"
        src="/logo-dt1.png"
        alt="Logo"
        width="180"
        height="55"
      />
    </a>
    <div class="navbar-nav">
      <RouterLink
        class="nav-link active"
        :to="'/users'"
        style="text-decoration: none"
      >
        Lista de Funcionários
      </RouterLink>
      <RouterLink
        class="registerLink"
        v-if="user.role === 'admin'"
        :to="`/register`"
        style="text-decoration: none"
      >
        Registrar
      </RouterLink>
    </div>
    <div>
      <div class="btn-group">
        <button
          class="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          Meu Perfil
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>E-mail: {{ user.email }}</li>
          <li>Nome: {{ user.name }}</li>
          <li>Cargo: {{ user.role }}</li>
          <button
            type="button"
            class="btn btn-light"
            @click="logout(), $router.push({ name: 'login' })"
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { SocketModule } from "@/services/socket";
import { io } from "socket.io-client";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Navbar",
  data() {
    const user = ref({
      name: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      email: localStorage.getItem("email"),
    });
    return {
      user,
    };
  },
  methods: {
    async logout() {
      localStorage.clear();
      //const socket = io();
      //socket.disconnect();
      SocketModule.disconnect();
      await this.$router.push({ name: "login" });
    },
  },
});
</script>

<style>
.logo {
  margin-left: 100px;
  filter: invert(100%);
}
.navbar-nav {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.btn-group {
  width: 140px;
  margin-right: 30px;
}
.dropdown-menu.show {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 15px;
  background-color: #001f3f;
  color: #ffffff;
  width: 300px;
}
.nav-link {
  margin-right: 15px;
  font-size: 1.3rem;
}
.btn {
  background-color: #0d61b5 !important;
  color: #ffffff !important;
}
.navbar {
  background-color: #001f3f;
}
.navbar-nav .registerLink {
  color: #ffffff;
  text-decoration: none;
  border-left: 3px solid #ffffff;
  padding-left: 15px;
  font-size: 1.3rem;
  padding-top: 3px;
}
</style>