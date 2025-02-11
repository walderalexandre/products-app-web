<template>
    <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative focus:outline-none" @keydown.esc="closeModal" ref="modalContent">
                <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
                <p class="mb-6">{{ message }}</p>
                <div class="flex justify-end space-x-4">
                    <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none">
                        Cancelar
                    </button>
                    <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300" ref="deleteButton">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
    export default {
        props: {
            isOpen: {
                type: Boolean,
                required: true,
            },
            title: {
                type: String,
                default: 'Confirmar',
            },
            message: {
                type: String,
                default: 'Tem certeza que deseja realizar esta alteração?',
            },
        },
        emits: ['close', 'confirm'],
        mounted() {
            if (this.isOpen) {
                this.$refs.deleteButton.focus();
            }
        },
        watch: {
            isOpen(newVal) {
                if (newVal) {
                    this.$nextTick(() => this.$refs.deleteButton.focus())
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit('close');
            },
            confirmDelete() {
                this.$emit('confirm');
            },
        },
    };
</script>

<style scoped>
    .modal-enter-active, .modal-leave-active {
        transition: opacity 0.3s ease;
    }

    .modal-enter-from, .modal-leave-to {
        opacity: 0;
    }

    .modal-content {
        outline: none;
    }
</style>