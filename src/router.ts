import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/HomePage.vue'
import Convert from './views/ConvertPage.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home },
    { path: '/convert', name: 'Convert', component: Convert }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;