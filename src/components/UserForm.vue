<template>
  <div class="registerBody">
    <h1 class="formTitle" v-if="$route.params?.id">Menu de Edição:</h1>
    <h1 class="formTitle" v-else>Registre:</h1>
    <form>
      <div class="mb-3">
        <label class="form-label" for="name">Nome completo:</label>
        <input
          class="form-control"
          type="text"
          v-model="user.name"
          id="name"
          placeholder="Nome do usuário"
        />
      </div>
      <div>
        <label class="form-label" for="email">E-mail:</label>
        <input
          class="form-control"
          type="text"
          v-model="user.email"
          id="email"
          placeholder="E-mail do usuário"
        />
      </div>
      <div>
        <label class="form-label" for="password">Senha:</label>
        <input
          class="form-control"
          type="password"
          v-model="user.password"
          id="password"
          placeholder="Senha do usuário"
          :required="!$route.params?.id"
        />
      </div>
      <div class="select">
        <label class="form-label" for="role">Cargo:</label>
        <select name="role" v-model="user.role" id="role">
          <option value="user" selected>User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="saveBtn">
        <button
          v-if="$route.params?.id"
          class="btnForm"
          type="button"
          @click="editar()"
        >
          Editar
        </button>
        <button v-else class="btnForm" type="button" @click="salvar()">
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
import router from "@/router";

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
        }
      );
    }
  },

  methods: {
    async editar() {
      if (this.$route.params?.id && typeof this.$route.params.id == "string") {
        const response = await userService.updateUser(
          this.$route.params.id,
          this.user
        );
        if (response) {
          router.push({ name: "users" });
        }
      }
      console.log("Att com sucesso");
    },

    async salvar() {
      const response = await userService.createUser(this.user);
      if (response) {
        router.push({ name: "users" });
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
.formTitle {
  background-color: #001f3f;
  border-radius: 15px;
  color: #ffffff;
  padding: 0.5rem;
  border: 2px solid black;
}
.form-label {
  color: #ffffff;
}
.form-control {
  border: 1px solid black;
}
.btnForm {
  color: #ffffff;
  background-color: #001f3f;
  border: 1px solid black;
  height: 3rem;
  width: 9rem;
  font-size: 1.5rem;
  border-radius: 15px;
}
.btnForm:hover {
  border: 2px solid #ffffff;
}
.saveBtn {
  display: flex;
  justify-content: center;
}
.select {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>