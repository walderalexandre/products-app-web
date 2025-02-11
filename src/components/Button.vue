<template>
    <button :class="buttonClasses"
            @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'px-4 py-2 rounded-md transition-colors';
      const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      };
      return `${baseClasses} ${variantClasses[this.variant]}`;
    },
  },
};
</script>