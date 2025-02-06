<template>
    <div>
        <nav class="bg-blue-600 p-4">
            <router-link to="/" class="text-white mr-4">Lista de Produtos</router-link>
            <router-link to="/create" class="text-white">Criar Produto</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>