<template>
  <navbar />
  <div class="helloUser">
    <h1>Olá {{ userLogado }}, seja bem vindo!</h1>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Funcionário</th>
        <th scope="col">E-mail</th>
        <th scope="col">Cargo</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user._id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td class="tdactions">
          <RouterLink :to="`/users/${user._id}`" style="text-decoration: none"
            ><i class="fa-solid fa-user-pen"></i
          ></RouterLink>
          <i @click="deleteUser(user._id)" class="fa-solid fa-trash"></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type User from "@/interface/IUser";
import UserService from "@/services/userService";
import { SocketModule } from "@/services/socket";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "Users",
  components: { Navbar },
  setup() {
    const userLogado = localStorage.getItem("name");
    const users = ref<User[]>([]);
    return { users, userLogado, socketModule: SocketModule.connect() };
  },
  methods: {
    async listUsers() {
      this.users = await UserService.listAll();
      // this.users.splice(0, this.users.length)
    },
    deleteUser(id?: any) {
      if (!id) {
        alert("User inválido");
      }
      alert("Usuário deletado com sucesso");
      this.$router.push({ name: "users" });
      return UserService.deleteUser(id);
    },
  },
  mounted() {
    this.listUsers();

    this.socketModule.registerListener(
      "removed-user",
      "removed-user",
      (id: string) => {
        //apenas listar novamente quando o evento for recebido do backend para o front-end
        this.listUsers();
      }
    );
    this.socketModule.registerListener("update", "update", (id: string) => {
      //limpar o array e gerar uma nova listagem
      this.users = [];
      this.listUsers();
    });
    this.socketModule.registerListener("new-user", "new-user", (id: string) => {
      //limpar o array e gerar uma nova listagem
      this.users = [];
      this.listUsers();
    });
    this.socketModule.registerListener(
      "is-logged",
      "is-logged",
      (data: string) => {
        let userLogged = localStorage.getItem("sessionId");
        if (String(userLogged) === data) {
          localStorage.clear();
          this.$router.push({ name: "login" });
        }
        this.listUsers();
      }
    );
  },
});
</script>

<style>
.fa-trash {
  cursor: pointer;
  color: #ff4136;
}
.tdactions {
  margin: 10px;
}
.helloUser {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 5px;
}
.table {
  border-top: 1px solid black;
}
</style>