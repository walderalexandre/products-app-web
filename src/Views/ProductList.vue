<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Listagem de Produtos</h1>
    <button
      @click="goToCreate"
      class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
    >
      Adicionar Produto
    </button>

    <!-- Tabela de Produtos -->
    <ProductTable
      :products="paginatedProducts"
      @edit="goToEdit"
      @delete="handleDelete"
    />

    <!-- Paginação -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="bg-gray-300 px-4 py-2 rounded-md"
      >
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-gray-300 px-4 py-2 rounded-md"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductTable from '../components/ProductTable.vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  

export default {
    components: { ProductTable },
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
    computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.products.slice(start, end);
    },
  },
  methods: {
    goToCreate() {
      this.$router.push('/product/create');
    },
    goToEdit(product) {
      this.$router.push(`/product/edit/${product.id}`);
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

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

    async handleDelete(id) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await axios.delete(`${API_BASE_URL}/products/${id}`);
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