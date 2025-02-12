# Sistema de Produtos - Frontend

Este é o frontend do Sistema de Produtos, desenvolvido com Vue.js, Tailwind CSS e Zod para validação de esquemas.

## Funcionalidades

- Listagem de produtos com paginação.
- Criação, edição e exclusão de produtos.
- Validação de formulários com Jest.
- Interface responsiva e moderna com Tailwind CSS.

## Pré-requisitos

- Node.js (v16 ou superior)
- npm (v8 ou superior)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/walderalexandre/products-app-web
   cd products-app-web

   ```bash
   npm install

   ```bash
   cp .env.example .env

   Edite o arquivo .env para apontar para a API do Laravel:
   ```bash
   VUE_APP_API_URL=http://<IP_PUBLICO_EC2>:8000/api

   Compile o projeto
   ```bash
   npm run build