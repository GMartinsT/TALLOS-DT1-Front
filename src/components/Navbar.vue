<template>
    <div>
        <div>
            <div>
                
            </div>
            <router-link to="/users">Lista de Usuários</router-link>
            <router-link to="/register">Registrar Usuário</router-link>
            <router-link to="/update">Editar Usuário</router-link>
            <div>
                <a href="profile">Meu Perfil</a>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Navbar'
    
}

</script>