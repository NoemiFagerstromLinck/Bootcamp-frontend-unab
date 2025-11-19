import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')

let authReady = false
let currentUser = null

onAuthStateChanged(auth, (user) => {
  currentUser = user
  authReady = true
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login, meta: { guestOnly: true } },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!authReady) {
    await new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, () => {
        authReady = true
        unsub()
        resolve()
      })
    })
  }

  if (to.meta.requiresAuth && !currentUser) {
    return next({ name: 'Login' })
  }

  if (to.meta.guestOnly && currentUser) {
    return next({ name: 'Home' })
  }

  return next()
})

export default router
