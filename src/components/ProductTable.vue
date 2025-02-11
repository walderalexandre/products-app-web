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
                    <button @click="$emit('edit', product)" class="text-blue-500 hover:text-blue-700">Editar</button>
                    <button @click="$emit('delete', product.id)" class="text-red-500 hover:text-red-700 ml-2">Excluir</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>