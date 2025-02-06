import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import CreateProduct from './components/CreateProduct.vue';

const routes = [
    { path: '/', component: ProductList },
    { path: '/create', component: CreateProduct },
    { path: '/edit/:id', component: CreateProduct, props: { isEdit: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;