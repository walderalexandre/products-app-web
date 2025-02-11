import { z } from 'zod';

const productSchema = z.object({
    nome: z.string().min(1, 'O nome � obrigat�rio'),
    preco: z.number().min(0, 'O pre�o deve ser maior ou igual a 0'),
});

export default productSchema;