<template>
    <div class="update">
        <UserFormVue />
    </div>
</template>

<script lang="ts">
import UserFormVue from '@/components/UserForm.vue';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'UpdateUserView',
    components: {
        UserFormVue
    }
})
</script>

