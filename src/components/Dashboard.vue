<template>
    <header>
        Header da página
    </header>
    <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    name: 'Dashboard'
})
</script>