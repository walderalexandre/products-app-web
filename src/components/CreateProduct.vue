<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Editar Produto' : 'Criar Produto' }}</h1>
        <form @submit.prevent="submitForm" class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Nome</label>
                <input v-model="form.nome"
                       type="text"
                       class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Preço</label>
                <input v-model="form.preco"
                       type="number"
                       step="0,01"
                       class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Descrição</label>
                <textarea v-model="form.descricao"
                          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {{ isEdit ? 'Atualizar' : 'Criar' }}
            </button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    export default {
        props: {
            isEdit: {
                type: Boolean,
                default: false,
            },
            id: {
                type: String,
                default: null,
            },
        },
        data() {
            return {
                form: {
                    nome: '',
                    preco: 0,
                    descricao: '',
                },
            };
        },
        async created() {
            if (this.isEdit && this.$route.params.id) {
                await this.loadProduct();
            }
        },
        methods: {
            async loadProduct() {
                
                try {
                    const response = await axios.get(`${API_BASE_URL}/products/${this.$route.params.id}`);
                    this.form = response.data.data;
                    
                } catch (error) {
                    console.error('Erro ao carregar produto:', error);
                }
            },
            async submitForm() {
                try {
                    if (this.isEdit) {
                        await axios.put(`${API_BASE_URL}/products/${this.$route.params.id}`, this.form);
                        alert('Produto atualizado com sucesso!');
                    } else {
                        await axios.post('${API_BASE_URL}/products', this.form);
                        alert('Produto criado com sucesso!');
                    }
                    this.$router.push('/');
                } catch (error) {
                    console.error('Erro ao salvar produto:', error);
                }
            },
        },
    };
</script>