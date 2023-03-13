
<template>
    <div>
        <h1>Cargos:</h1>
        <form action="">
            <div>
                <input type="text" v-model="name">
            </div>
            <div>
                <button type="button" @click="salvar">Salvar</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">

export default {
    name: 'RoleForm',
    components: {
        
    },
    data() {
        return {
            name: this.name
        }
    },
    created() {
        if(this.$route.params?.id) {
            //colocar axios para pegar dados pelo id (findById) - chama o user aqui
        }
    },
    methods: {
        salvar() {
            
        }
    }
}
</script>