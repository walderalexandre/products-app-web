import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/**/*.{vue,js,ts,jsx,tsx}', // Certifique-se de que o caminho est� correto
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config;