import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
export const LAYOUT = () => import('@/layouts/index.vue');

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LAYOUT
    },
    {
      path: '/',
      name: 'Layout',
      redirect: '/dashboard',
      component: LAYOUT,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/mineClassics',
          name: 'mineClassics',
          component: () => import('../views/game/mineClearance/classics.vue')
        },
        {
          path: '/minePurgatory',
          name: 'minePurgatory',
          component: () => import('../views/game/mineClearance/purgatory.vue')
        },
        {
          path: '/gluttonousSnake',
          name: 'gluttonousSnake',
          component: () => import('../views/game/gluttonousSnake/index.vue')
        },
        {
          path: '/battleClassics',
          name: 'battleClassics',
          component: () => import('../views/game/aircraftBattle/classics.vue')
        },
        {
          path: '/battlePurgatory',
          name: 'battlePurgatory',
          component: () => import('../views/game/aircraftBattle/purgatory.vue')
        },
        {
          path: '/tetris',
          name: 'tetris',
          component: () => import('../views/game/tetris/index.vue')
        },
        {
          path: '/five-in-a-row',
          name: 'five-in-a-row',
          component: () => import('../views/game/five-in-a-row/index.vue')
        },
      ]
    }
  ]
})

export default router
