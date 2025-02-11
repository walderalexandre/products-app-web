import { z } from 'zod';

const productSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório'),
    preco: z.number().min(0, 'O preço deve ser maior ou igual a 0'),
});

export default productSchema;