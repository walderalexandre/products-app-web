<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
            <input v-model="form.nome"
                   type="text"
                   id="nome"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                   required />
        </div>
        <div class="mb-4">
            <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
            <input v-model.number="form.preco"
            type="number"
            id="preco"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            min="0"
            step="0.01"
            />
        </div>
        <div class="mb-4">
            <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea v-model="form.descricao"
                      id="descricao"
                      rows="4"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <button type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            {{ submitText }}
        </button>
    </form>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                default: () => ({ nome: '', preco: 0, descricao: '' }),
            },
            submitText: {
                type: String,
                default: 'Salvar',
            },
        },
        data() {
            return {
                form: { ...this.product },
            };
        },
        watch: {
            product: {
                immediate: true,
                handler(newProduct) {
                    this.form = { ...newProduct };
                },
            },
        },
        methods: {
            handleSubmit() {
                this.$emit('submit', this.form);
            },
        },
    };
</script>