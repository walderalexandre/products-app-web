<template>
    <div class="min-h-screen flex flex-col">
        <!-- Topo da Página -->
        <header class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
                <h1 class="text-2xl font-bold">Sistema de Produtos</h1>
            </div>
        </header>

        <!-- Área Principal -->
        <main class="flex-grow bg-gray-100">
            <div class="container mx-auto p-6">
                <div class="bg-white rounded-lg shadow-md p-6 mx-auto w-full max-w-4xl">
                    <slot></slot>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
  name: 'AppLayout',
};
</script>
