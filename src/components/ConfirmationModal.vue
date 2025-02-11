<template>
    <!-- Fundo opaco -->
    <div v-if="isOpen" class="fixed inset-0 bg-black opacity-50 z-40"></div>

    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <p>{{ message }}</p>
            <div class="mt-4 flex justify-end">
                <button @click="confirm" class="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
                    Confirmar
                </button>
                <button @click="cancel" class="bg-gray-500 text-white px-4 py-2 rounded-md">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isOpen: {
                type: Boolean,
                required: true,
            },
            message: {
                type: String,
                default: 'Tem certeza que deseja continuar?',
            },
        },
        methods: {
            confirm() {
                this.$emit('confirm'); // Emite evento de confirmação
            },
            cancel() {
                this.$emit('cancel'); // Emite evento de cancelamento
            },
        },
    };
</script>