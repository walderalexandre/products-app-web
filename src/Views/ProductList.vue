<template>
  <AppLayout>
    <h1 class="text-2xl font-bold mb-4">Listagem de Produtos</h1>
    <button
      @click="goToCreate"
      class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 float-right"
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
  </AppLayout>
</template>

<script>
import axios from 'axios';
import AppLayout from '@/layouts/AppLayout.vue';
import ProductTable from '@/components/ProductTable.vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
  components: { AppLayout, ProductTable },
  data() {
    return {
      products: [],
      loading: true,
      currentPage: 1,
      total: 0,
      pageSize: 10,
    };
  },
  async created() {
    await this.getProducts(this.currentPage);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    paginatedProducts() {
      return this.products;
    },
  },
  methods: {
    goToCreate() {
      this.$router.push('/product/create');
    },
    goToEdit(product) {
      this.$router.push(`/product/edit/${product.id}`);
    },
    async previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.getProducts(this.currentPage);
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.getProducts(this.currentPage);
      }
    },
    async getProducts(page) {
      try {
        this.loading = true;
        const response = await axios.get(`${API_BASE_URL}/products?page=${page}&page_size=${this.pageSize}`);
        this.products = response.data.data;
        this.currentPage = response.data.meta.current_page;
        this.total = response.data.meta.total;
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
          this.products = this.products.filter((product) => product.id !== id);
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