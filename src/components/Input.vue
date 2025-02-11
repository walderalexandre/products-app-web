<template>
    <div>
        <!-- Label -->
        <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </label>

        <!-- Input -->
        <input v-if="type !== 'number'"
               :id="id"
               :type="type"
               :placeholder="placeholder"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
               :class="inputClasses"
               :required="required" />

        <!-- Input do tipo number com formatação -->
        <input v-else
               :id="id"
               type="text" 
        :placeholder="placeholder"
        :value="formattedValue"
        @input="handleInput"
        :class="inputClasses"
        :required="required"
        />

        <!-- Input invisível para o valor numérico -->
        <input v-if="type === 'number'"
               type="number"
               :value="numericValue"
               class="hidden" 
        :min="min"
        :max="max"
        :step="step"
        />
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: '', // ID do input (opcional)
            },
            label: {
                type: String,
                default: '', // Texto da label (opcional)
            },
            type: {
                type: String,
                default: 'text', // Tipo padrão é 'text'
            },
            placeholder: {
                type: String,
                default: '',
            },
            modelValue: {
                type: [String, Number],
                default: '',
            },
            required: {
                type: Boolean,
                default: false, // Por padrão, o campo não é obrigatório
            },
            min: {
                type: Number,
                default: undefined, // Valor mínimo (apenas para tipo 'number')
            },
            max: {
                type: Number,
                default: undefined, // Valor máximo (apenas para tipo 'number')
            },
            step: {
                type: [Number, String],
                default: undefined, // Passo (apenas para tipo 'number')
            },
        },
        data() {
            return {
                formattedValue: this.type === 'number' ? this.formatValue(this.modelValue) : this.modelValue, // Valor formatado
                numericValue: this.type === 'number' ? this.modelValue : undefined, // Valor numérico
            };
        },
        watch: {
            modelValue(newValue) {
                if (this.type === 'number') {
                    // Atualiza o valor formatado e numérico quando o modelValue muda
                    this.formattedValue = this.formatValue(newValue);
                    this.numericValue = newValue;
                } else {
                    this.formattedValue = newValue;
                }
            },
        },
        computed: {
            inputClasses() {
                return 'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
            },
        },
        methods: {
            // Formata o valor no formato 99.999,00 (apenas para tipo 'number')
            formatValue(value) {
                if (!value) return '';

                // Converte para número e formata
                const number = parseFloat(value);
                return number.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            },

            // Manipula o evento de input
            handleInput(event) {
                const rawValue = event.target.value;

                // Remove caracteres não numéricos e formata
                const numericValue = rawValue.replace(/[^0-9]/g, '');
                const number = parseFloat(numericValue) / 100; // Divide por 100 para considerar os centavos

                // Emite o valor numérico (sem formatação)
                this.$emit('update:modelValue', number);

                // Atualiza o valor formatado
                this.formattedValue = this.formatValue(number);
                this.numericValue = number; // Atualiza o valor numérico
            },
        },
    };
</script>