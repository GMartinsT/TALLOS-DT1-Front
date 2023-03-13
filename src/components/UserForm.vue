
<template>
  <div>
    <h1>Registre-se:</h1>
    <form action="">
      <div>
        <input type="text" v-model="name" />
      </div>
      <div>
        <input type="text" v-model="email" />
      </div>
      <div>
        <input type="text" v-model="password" />
      </div>
      <div>
        <input type="text" v-model="role" />
      </div>
      <div>
        <button type="button" @click="salvar">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "UserForm",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "",
    };
  },
  created() {
    if (this.$route.params?.id) {
      //colocar axios para pegar dados pelo id (findById) - chama o user aqui
      const createUser = (id: string) => {
        axios.get(`http://localhost:3000/users/${id}`).then(
          (response) => this.salvar(),
          (error) => {
            console.log(error);
            alert("Erro ao criar usuario");
          }
        );
      };
      
    }
  },
  methods: {
    salvar() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      console.log(user);
    },
  },
};
</script>