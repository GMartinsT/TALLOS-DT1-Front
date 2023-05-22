<template>
  <Navbar />
  <div class="update">
    <UserFormVue />
  </div>
</template>

<script lang="ts">
import UserFormVue from "@/components/UserForm.vue";
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UpdateUserView",
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
.update {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 8%;
}
</style>