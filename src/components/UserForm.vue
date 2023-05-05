<template>
  <div class="registerBody">
    <h1 class="formTitle" v-if="$route.params?.id">
      Menu de edição de usuários:
    </h1>
    <h1 v-else>Registre-se:</h1>
    <form>
      <div class="mb-3">
        <label class="form-label" for="name">Nome completo:</label>
        <input class="form-control" type="text" v-model="user.name" id="name" />
      </div>
      <div>
        <label class="form-label" for="email">E-mail:</label>
        <input
          class="form-control"
          type="text"
          v-model="user.email"
          id="email"
        />
      </div>
      <div>
        <label class="form-label" for="password">Senha:</label>
        <input
          class="form-control"
          type="password"
          v-model="user.password"
          id="password"
        />
      </div>
      <div>
        <label class="form-label" for="role">Cargo:</label>
        <select name="role" v-model="user.role" id="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <button
          v-if="$route.params?.id"
          class="btn"
          type="button"
          @click="editar(), $router.push({ name: 'users' })"
        >
          Salvar
        </button>
        <button
          v-else
          class="btn"
          type="button"
          @click="salvar(), $router.push({ name: 'users' })"
        >
          Registrar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, type Ref } from "vue";
import { request } from "@/services/api";
import userService from "@/services/userService";
import type User from "@/interface/IUser";

export default {
  name: "UserForm",
  components: {},
  setup() {
    const user: Ref<User> = ref({
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
      request.get(`users/${this.$route.params?.id}`).then(
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
    async editar() {
      try {
        if (
          this.$route.params?.id &&
          typeof this.$route.params.id == "string"
        ) {
          return await userService.updateUser(this.$route.params.id, this.user);
        }
        console.log("Att com sucesso");
      } catch (error) {
        console.log(error);
      }
    },

    async salvar() {
      try {
        const response = await userService.createUser(this.user);
        return response;
      } catch (error) {
        alert("Erro ao criar usuário");
      }
    },
  },
};
</script>

<style>
.registerBody {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #001f3f;
  border-radius: 15px;
  background-color: #0d61b5;
  padding: 2rem;
}
.formTitle,
.form-label {
  color: #ffffff;
}
.form-control {
  border: 1px solid #111111;
}
.btn {
  color: #ffffff !important;
  background-color: #001f3f !important;
  border: 1px solid #111111 !important;
}
</style>