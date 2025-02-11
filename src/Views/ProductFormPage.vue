<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">
            {{ isEdit ? 'Editar Produto' : 'Adicionar Produto' }}
        </h1>

        <!-- Formulário de Produto -->
        <ProductForm :product="selectedProduct"
                     :submitText="isEdit ? 'Atualizar' : 'Salvar'"
                     @submit="submitForm" />

        <!-- Botão Voltar -->
        <button @click="goBack"
                class="bg-gray-500 text-white px-4 py-2 rounded-md mt-4">
            Voltar
        </button>
    </div>
</template>

<script>
    import axios from 'axios';
    import ProductForm from '../components/ProductForm.vue';

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    export default {
        components: { ProductForm },
        data() {
            return {
                isEdit: false,
                selectedProduct: {
                    nome: '',
                    preco: 0,
                    descricao: '',
                },
            };
        },
        created() {
            if (this.$route.params.id) {
                this.isEdit = true;
                this.loadProduct(this.$route.params.id);
            }
        },
        methods: {
            async loadProduct(productId) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);

                    const apiData = response.data.data;

                    this.selectedProduct = {
                        nome: apiData.nome,
                        preco: apiData.preco,
                        descricao: apiData.descricao,
                    };

                } catch (error) {
                    if (error.response && error.response.status === 422) {
                        alert(error.response.data.message);
                    } else {
                        console.error(error);
                    }
                }
            },
            async submitForm(formData) {
                try {
                    if (this.isEdit) {
                        await axios.put(`${API_BASE_URL}/products/${this.$route.params.id}`, formData);
                        alert('Produto atualizado com sucesso!');
                    } else {
                        await axios.post(`${API_BASE_URL}/products`, formData);
                        alert('Produto criado com sucesso!');
                    }
                    this.goBack();
                } catch (error) {
                    if (error.response && error.response.status === 422) {
                        const errors = error.response.data.errors || {};
                        alert(Object.values(errors).join('\n'));
                    } else {
                        console.error(error);
                    }
                }
            },
            goBack() {
                this.$router.push('/');
            },
        },
    };
</script>