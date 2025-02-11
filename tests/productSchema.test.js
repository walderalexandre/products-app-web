// tests/productSchema.test.js
import productSchema from '@/validation/productSchema'; 
test('valida dados corretos', () => {
    const formData = {
        nome: 'Produto Teste',
        preco: 100.50,
        descricao: 'Descrição do produto teste',
    };

    expect(() => productSchema.parse(formData)).not.toThrow();
});

test('lança erro para dados inválidos', () => {
    const formData = {
        nome: '',
        preco: 'abc',
    };

    expect(() => productSchema.parse(formData)).toThrow();
});