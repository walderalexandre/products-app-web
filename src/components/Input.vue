<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>

    <input
      v-if="type !== 'number'"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="inputClasses"
      :required="required"
    />

    <input
      v-else
      :id="id"
      type="text"
      :placeholder="placeholder"
      :value="formattedValue"
      @input="handleInput"
      :class="inputClasses"
      :required="required"
    />

    <input
      v-if="type === 'number'"
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
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    step: {
      type: [Number, String],
      default: undefined,
    },
  },
  data() {
    return {
      formattedValue:
        this.type === "number"
          ? this.formatValue(this.modelValue)
          : this.modelValue,
      numericValue: this.type === "number" ? this.modelValue : undefined,
    };
  },
  watch: {
    modelValue(newValue) {
      if (this.type === "number") {
        this.formattedValue = this.formatValue(newValue);
        this.numericValue = newValue;
      } else {
        this.formattedValue = newValue;
      }
    },
  },
  computed: {
    inputClasses() {
      return "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    },
  },
  methods: {
    formatValue(value) {
      if (!value) return "";

      const number = parseFloat(value);
      return number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    handleInput(event) {
      const rawValue = event.target.value;

      const numericValue = rawValue.replace(/[^0-9]/g, "");
      const number = parseFloat(numericValue) / 100;

      this.$emit("update:modelValue", number);

      this.formattedValue = this.formatValue(number);
      this.numericValue = number;
    },
  },
};
</script>
