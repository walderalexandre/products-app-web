<template>
  <div class="container mx-auto p-4">

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Lista de Produtos</h1>
      </div>
    </header>
      <div class="mb-4">
      <router-link to="/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Inserir Novo Registro
      </router-link>
    </div>
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
            <td class="py-2 px-4">{{ product.preco_formatado }}</td>
            <td class="py-2 px-4">
              <router-link
                :to="`/edit/${product.id}`"
                 class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar
              </router-link>
              <button
                @click="deleteProduct(product.id)"
                class="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
        <div class="mt-4 flex justify-center">
            <button @click="getProducts(currentPage - 1)":disabled="currentPage === 1" class="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-gray-300">Anterior</button>
            <button @click="getProducts(currentPage + 1)":disabled="products.length < pageSize" class="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-gray-300">Próxima</button>
          </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  

export default {
  data() {
    return {
      products: [],
      loading: true,
      deleteLoading: false,
      selectedProductId: null,
      isModalOpen: false,
      showMessageModal: false,
      modalMessage: '',
      modalIsError: false,
      currentPage: 1,
      pageSize: 10,
    };
  },
  async created() {
    this.getProducts(this.currentPage);
  },
  methods: {

    async getProducts(page) {

        try {
            const response = await axios.get(`${API_BASE_URL}/products?page=${page}&page_size=${this.pageSize}`);
            this.products = response.data.data;
            this.currentPage = response.data.meta.current_page;
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        } finally {
            this.loading = false;
        }
    },

    async deleteProduct(id) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`);
            this.products = this.products.filter(product => product.id !== id);
            alert('Produto excluído com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
      }
    },
  },
};
</script>