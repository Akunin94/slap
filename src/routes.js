import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/Main.vue') },
  { path: '/rating', component: () => import('./pages/Rating.vue') },
  { path: '/daily', component: () => import('./pages/DailyQuest.vue') },
  { path: '/collections', component: () => import('./pages/Collections.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router