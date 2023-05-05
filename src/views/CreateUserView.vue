<template>
    <div class="register">
        <UserFormVue />
    </div>
</template>

<script lang="ts">
import UserFormVue from '@/components/UserForm.vue';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CreateUserView',
    components: {
        UserFormVue
    }
})
</script>

<style>
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #aaaaaa;
}
</style>