<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ product.nome }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ product.preco_formatado }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <Button @click="$emit('details', product)"
                            class="ml-2">
                        Detalhes
                    </Button>
                    <Button @click="$emit('delete', product.id)"
                            variant="danger"
                            class="ml-2">
                        Excluir
                    </Button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import Button from '@/components/Button.vue';

    export default {
        components: { Button, },
        props: {
        products: {
            type: Array,
            required: true,
        },
        },
    };
</script>