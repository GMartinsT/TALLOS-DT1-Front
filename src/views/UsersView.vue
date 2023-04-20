<template>
  <RouterLink to="/register">Adicionar</RouterLink>
  <table>
    <thead class="tr">
      <tr>
        <th class="th1">Funcionário</th>
        <th>E-mail</th>
        <th>Cargo</th>
        <th class="th2">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user._id">
        <td class="tdname">{{ user.name }}</td>
        <td class="tdemail">{{ user.email }}</td>
        <td class="">{{ user.role }}</td>
        <td>
          <RouterLink :to="`/users/${user._id}`">Editar</RouterLink>
          <button @click="deleteUser(user._id)">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from "vue";
import type User from "@/interface/IUser";
import { request } from "@/api";
import UserService from "@/services/userService";
import store from "@/store";


export default defineComponent({
  name: "Users",
  setup() {
    const users: Ref<User[]> = ref([]);
    const listUsers = () => {
      UserService.listAll().then(
        (response: any) => {
          users.value.splice(0, users.value.length)
          response.data.forEach((user: User) => users.value.push(user));
        },        
      );
    };
    console.log("logStore", store);
    listUsers();

    const deleteUser = (id?: string) => {
      if(!id) return alert("User inválido");
      UserService.deleteUser(id).then(
        (response) => {
          alert("Usuário deletado com sucesso")
          listUsers()
        }
      );
    };
    return {
      users,
      listUsers,
      deleteUser,
    };
  },
  methods: {},
});
</script>

<style>
table {
  border-spacing: 0;
  width: 70%;
  border: solid #ccc 1px;
  border-radius: 10px;
}
th {
  text-align: left;
  font-weight: bold;
  padding: 0.5rem;
}

td {
  padding: 1rem;
  border: solid grey 1px;
}

.tr {
  background-color: #1089ff;
  color: #fff;
  border: solid grey 1px;
}
</style>