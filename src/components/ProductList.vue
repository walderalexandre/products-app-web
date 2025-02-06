<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Produtos</h1>
    <div v-if="loading" class="text-center">Carregando...</div>
    <div v-else>
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-2 px-4 text-left">Nome</th>
            <th class="py-2 px-4 text-left">Descrição</th>
            <th class="py-2 px-4 text-left">Preço</th>
            <th class="py-2 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b">
            <td class="py-2 px-4">{{ product.nome }}</td>
            <td class="py-2 px-4">{{ product.descricao }}</td>
            <td class="py-2 px-4">R$ {{ product.preco }}</td>
            <td class="py-2 px-4">
              <router-link
                :to="`/edit/${product.id}`"
                class="text-blue-500 hover:text-blue-700 mr-2"
              >
                Editar
              </router-link>
              <button
                @click="deleteProduct(product.id)"
                class="text-red-500 hover:text-red-700"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      this.products = response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async deleteProduct(id) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
          await axios.delete(`http://localhost:8000/api/products/${id}`);
          this.products = this.products.filter(product => product.id !== id);
          alert('Produto excluído com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir produto:', error);
        }
      }
    },
  },
};
</script>