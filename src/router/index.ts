import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/archive', name: 'archive', component: () => import('../views/ArchiveView.vue') },
    { path: '/article/:id', name: 'article', component: () => import('../views/ArticleView.vue'), props: true },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
