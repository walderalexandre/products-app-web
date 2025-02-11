<template>
    <AppLayout>
        <div class="p-6">
            <h1 class="text-2xl font-bold mb-4">Detalhes do Produto</h1>

            <div class="bg-white rounded-lg shadow-md p-6">

                <h2 class="text-xl font-semibold mb-2">{{ product.nome }}</h2>

                <p class="text-gray-700 mb-4">
                    <span class="font-bold">Preço:</span>
                    {{ product.preco_formatado }}
                </p>

                <p class="text-gray-700 mb-4">
                    <span class="font-bold">Descrição:</span>
                    {{ product.descricao }}
                </p>
                <Button @click="goToEdit"
                        class="mr-2">
                    Editar
                </Button>
                <Button @click="goBack"
                        class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                    Voltar
                </Button>
            </div>
        </div>
    </AppLayout>
</template>

<script>
    import axios from 'axios';
    import AppLayout from '@/layouts/AppLayout.vue';
    import Button from '@/components/Button.vue';

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    export default {
        components: { AppLayout, Button, },
      data() {
        return {
          product: {}, 
        };
      },
      created() {
          this.fetchProduct();
      },
      methods: {
        async fetchProduct() {
            const productId = this.$route.params.id;
            try {
                const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
                this.product = response.data.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            }
        },
          goToEdit(product) {
            const productId = this.$route.params.id;
            this.$router.push(`/product/edit/${productId}`);
        },
        goBack() {
            this.$router.push('/');
        },
      },
    };
</script>