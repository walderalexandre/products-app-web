import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductFormPage from '@/views/ProductFormPage.vue';

const routes = [
    { path: '/', component: ProductList },
    { path: '/product/create', component: ProductFormPage },
    { path: '/product/edit/:id', component: ProductFormPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
