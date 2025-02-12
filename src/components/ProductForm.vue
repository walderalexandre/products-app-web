<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <Input
        v-model="form.nome"
        id="nome"
        label="Nome do Produto"
        type="text"
        placeholder="Digite o nome do produto"
        :required="true"
      />
    </div>
    <div class="mb-4">
      <Input
        v-model="form.preco"
        id="preco"
        label="Preço"
        type="number"
        placeholder="Digite o preço"
        :required="true"
        :min="0"
        :step="0.01"
      />
    </div>
    <div class="mb-4">
      <Input
        v-model="form.descricao"
        label="Descrição"
        type="text"
        placeholder="Digite a descrição"
      />
    </div>
    <div class="flex gap-2">
      <Button type="submit" :disabled="isSubmitting" variant="primary">
        {{ isSubmitting ? "Enviando..." : submitText }}
      </Button>
      <Button type="button" @click="goBack" variant="secondary">
        Voltar
      </Button>
    </div>
  </form>
</template>

<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

export default {
  components: { Button, Input },
  props: {
    product: {
      type: Object,
      default: () => ({ nome: "", preco: 0, descricao: "" }),
    },
    submitText: {
      type: String,
      default: "Salvar",
    },
  },
  data() {
    return {
      form: { ...this.product },
      isSubmitting: false,
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
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      this.$emit("submit", this.form);
    },
    goBack() {
      this.$emit("cancel");
    },
  },
};
</script>
