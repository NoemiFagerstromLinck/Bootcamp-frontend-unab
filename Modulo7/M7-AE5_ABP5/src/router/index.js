import { createRouter, createWebHistory } from 'vue-router'

const BootstrapDemo = () => import('../views/BootstrapDemo.vue')
const VuetifyDemo = () => import('../views/VuetifyDemo.vue')
const BuefyDemo = () => import('../views/BuefyDemo.vue')
const ElementDemo = () => import('../views/ElementDemo.vue')
const UIComparison = () => import('../views/UIComparison.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/ui-comparison' },
    
    // Rutas de comparación de librerías UI (Actividad 1)
    { path: '/bootstrap-demo', name: 'BootstrapDemo', component: BootstrapDemo },
    { path: '/vuetify-demo', name: 'VuetifyDemo', component: VuetifyDemo },
    { path: '/buefy-demo', name: 'BuefyDemo', component: BuefyDemo },
    { path: '/element-demo', name: 'ElementDemo', component: ElementDemo },
    { path: '/ui-comparison', name: 'UIComparison', component: UIComparison },
    
    { path: '/:pathMatch(.*)*', redirect: '/ui-comparison' }
  ]
})

export default router
