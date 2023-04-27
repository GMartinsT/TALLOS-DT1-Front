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
import UserService from "@/services/userService";
import { SocketModule } from "@/services/socket";
import store from "@/store";

export default defineComponent({
  name: "Users",
  setup() {
    const users = ref<User[]>([]);
    return {users, socketModule: SocketModule.connect()}
  },
  methods: {

 async listUsers(){
   this.users =  await UserService.listAll()
  // this.users.splice(0, this.users.length)
         
    },
deleteUser(id?: any){
      if(!id) {
         alert("User inválido")
        };
        alert("Usuário deletado com sucesso")
        this.$router.push({name: "users"})
        return   UserService.deleteUser(id)
    }
  },
 mounted(){
    this.listUsers()

  this.socketModule.registerListener('removed-user', "removed-user", (id: string)=>{
    //apenas listar novamente quando o evento for recebido do backend para o front-end
    this.listUsers()
  })
  this.socketModule.registerListener('update', "update", (id: string)=>{
    //limpar o array e gerar uma nova listagem
    this.users = [];
    this.listUsers()
  })
  this.socketModule.registerListener('new-user', "new-user", (id: string)=>{
    //limpar o array e gerar uma nova listagem
    this.users = [];
    this.listUsers()
  })
  this.socketModule.registerListener('is-logged', 'is-logged', (data: string)=>{
    let userLogged = localStorage.getItem('sessionId')
    if(String(userLogged) === data){
      localStorage.clear()
      this.$router.push({name: 'login'})
    }
    this.listUsers()
  })

  }
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