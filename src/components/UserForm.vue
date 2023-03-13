
<template>
  <div>
    <h1 v-if="$route.params?.id">Menu de edição de usuários:</h1>
    <h1 v-else>Registre-se:</h1>
    <form action="">
      <div>
        <label for="name">Nome completo:</label>
        <input type="text" v-model="user.name" id="name" />
      </div>
      <div>
        <label for="email">E-mail:</label>
        <input type="text" v-model="user.email" id="email" />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="text" v-model="user.password" id="password" />
      </div>
      <div>
        <label for="role">Cargo:</label>
        <input type="text" v-model="user.role" id="role" />
      </div>
      <div>
        <button type="button" @click="salvar">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";
import router from "@/router";

export default {
  name: "UserForm",
  components: {},
  setup() {
    const user = ref({
      name: "",
      email: "",
      password: "",
      role: "",
    });

    return {
      user,
    };
  },
  created() {
    if (this.$route.params?.id) {
      //colocar axios para pegar dados pelo id (findById) - chama o user aqui
      axios.get(`http://localhost:3000/users/${this.$route.params?.id}`).then(
        (response) => {
          (this.user.name = response.data.name),
            (this.user.email = response.data.email),
            (this.user.password = response.data.password),
            (this.user.role = response.data.role);
        },
        (error) => {
          console.log(error);
          alert("Erro ao criar usuario");
        }
      );
    }
  },

  methods: {
    salvar() {
      if (this.$route.params?.id) {
        axios
          .put(
            `http://localhost:3000/users/${this.$route.params?.id}`,
            this.user
          )
          .then(
            () => {
              alert("Usuário atualizado com sucesso!");
              window.location.reload();
            },
            (error) => {
              console.log(error);
              alert("Erro ao atualizar o usuario");
            }
          );
      } else {
        axios.post("http://localhost:3000/users/", this.user).then(
          (response) => {
            alert("Usuário adicionado com sucesso!");
            router.push({
              name: "form",
              params: { id: response.data._id },
            });
          },
          (error) => {
            console.log(error);
            alert("Erro ao adicionado o usuario");
          }
        );
      }
    },
  },
};
</script>