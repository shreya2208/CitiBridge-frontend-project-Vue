import { createRouter, createWebHistory } from 'vue-router'
import TrendingStocks from '../components/TrendingStocks.vue'
import Login from '../components/Login.vue'
import Capchoice from '../components/Capchoice.vue'
import Favourites from '../components/Favourites.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/trending',
      name: 'trending',
      component: TrendingStocks,
      requiresAuth: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/capchoice',
      name: 'capchoice',
      component: Capchoice
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites
    },
   {
    path: '/',
    redirect: true,
    redirectPath: '/trending'
   }
  ]
})

//Meta Handling



export default router
