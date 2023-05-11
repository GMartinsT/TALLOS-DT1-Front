<template>
  <Navbar />
  <div class="register">
    <UserFormVue />
  </div>
</template>

<script lang="ts">
import UserFormVue from "@/components/UserForm.vue";
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "CreateUserView",
  components: {
    UserFormVue,
    Navbar,
  },
});
</script>

<style>
navbar {
    width: 100%;
}
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 8%;
}
</style>