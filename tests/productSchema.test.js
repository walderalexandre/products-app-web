// tests/productSchema.test.js
import productSchema from '@/validation/productSchema'; 
test('valida dados corretos', () => {
    const formData = {
        nome: 'Produto Teste',
        preco: 100.50,
        descricao: 'Descri��o do produto teste',
    };

    expect(() => productSchema.parse(formData)).not.toThrow();
});

test('lan�a erro para dados inv�lidos', () => {
    const formData = {
        nome: '',
        preco: 'abc',
    };

    expect(() => productSchema.parse(formData)).toThrow();
});