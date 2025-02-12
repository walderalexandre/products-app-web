import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import ProductFormPage from "@/views/ProductFormPage.vue";
import ProductDetail from "@/views/ProductDetail.vue";

const routes = [
  { path: "/", component: ProductList },
  { path: "/product/create", component: ProductFormPage },
  { path: "/product/edit/:id", component: ProductFormPage },
  { path: "/product/details/:id", component: ProductDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
