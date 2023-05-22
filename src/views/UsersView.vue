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
          <RouterLink
            v-if="userLogadoR === 'admin'"
            :to="`/users/${user._id}`"
            style="text-decoration: none"
          >
            <i
              class="fa-solid fa-user-pen"
              style="cursor: pointer; color: #0d61b5"
            ></i>
          </RouterLink>

          <div v-else>
            <i
              class="fa-solid fa-user-pen"
              style="cursor: not-allowed; color: #1e3050"
            ></i>
          </div>

          <i
            v-if="userLogadoR === 'admin'"
            @click="deleteUser(user._id)"
            class="fa-solid fa-trash"
            style="color: #ff4136"
          ></i>
          <i v-else class="fa-solid fa-trash" style="cursor: not-allowed"></i>
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
import { POSITION, useToast } from "vue-toastification";

export default defineComponent({
  name: "Users",
  components: { Navbar },
  setup() {
    const userLogado = localStorage.getItem("name");
    const userLogadoR = localStorage.getItem("role");
    const users = ref<User[]>([]);
    return {
      users,
      userLogado,
      userLogadoR,
      socketModule: SocketModule.connect(),
    };
  },
  methods: {
    async listUsers() {
      this.users = await UserService.listAll();
      // this.users.splice(0, this.users.length)
    },
    deleteUser(id?: any) {
      if (!id) {
        const toast = useToast();

        toast.error("Usuário inválido", {
          position: POSITION.TOP_RIGHT,
          timeout: 2000,
        });
      }
      //const toast = useToast()
      //
      //      toast.success('Usuário deletado com sucesso', {
      //          position: POSITION.TOP_RIGHT,
      //          timeout: 2000
      //      })
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
  margin-left: 14px;
}
.tdactions {
  display: flex;
  align-items: center;
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