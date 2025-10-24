
<template>
  <div id="app" class="min-vh-100">
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-wrapper">
                  <div class="text-center mb-4">
            <h1 class="brand-title">Tiendita</h1>
            <p class="brand-subtitle">Vue Lite Edition</p>
          </div>
        <LoginForm @login="handleLogin" />
      </div>
    </div>
    
    <div v-else class="main-app">
      <header class="app-header">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-4">
              <h1 class="app-title">Tiendita</h1>
            </div>
            <div class="col-md-4">
              <SearchBox @search="handleSearch" />
            </div>
            <div class="col-md-4 text-end">
              <div class="cart-summary">
                <button 
                  class="cart-toggle-btn" 
                  @click="toggleCart"
                  :class="{ 'active': showCart }"
                >
                  Carrito ({{ cart.length }})
                  <span class="toggle-icon">{{ showCart ? '▼' : '▶' }}</span>
                </button>
                <button class="logout-btn" @click="logout">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main class="main-content">
        <div class="container-fluid">
          <ProductList :products="filteredProducts" @add-to-cart="addToCart" />
          
          <div v-if="showCart" class="cart-dropdown">
            <CartTable 
              :cart="cart" 
              :products="products"
              @remove-from-cart="removeFromCart"
              @increase-quantity="increaseQuantity"
              @decrease-quantity="decreaseQuantity"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { state } from './state.js'
import { getProducts } from './api/products.js'
import { login } from './api/auth.js'
import LoginForm from './components/LoginForm.vue'
import SearchBox from './components/SearchBox.vue'
import ProductList from './components/ProductList.vue'
import CartTable from './components/CartTable.vue'

const isAuthenticated = ref(false)
const products = ref([])
const cart = ref([])
const searchTerm = ref('')
const showCart = ref(false)

const filteredProducts = computed(() => {
  if (!searchTerm.value) {
    return products.value.filter(product => product.stock > 0)
  }
  return products.value.filter(product => 
    product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) && 
    product.stock > 0
  )
})

async function handleLogin(credentials) {
  try {
    const result = await login(credentials)
    if (result.success) {
      isAuthenticated.value = true
      await loadProducts()
    }
  } catch (error) {
    console.error('Error en login:', error)
    alert('Error de autenticación: ' + error.message)
  }
}

function handleSearch(term) {
  searchTerm.value = term
}

async function loadProducts() {
  try {
    products.value = await getProducts()
  } catch (error) {
    console.error('Error cargando productos:', error)
  }
}

function addToCart(product) {
  if (product.stock <= 0) return
  
  const existingItem = cart.value.find(item => item.id === product.id)
  
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++
      const productInList = products.value.find(p => p.id === product.id)
      productInList.stock--
    }
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    })
    const productInList = products.value.find(p => p.id === product.id)
    productInList.stock--
  }
}

function removeFromCart(productId) {
  const itemIndex = cart.value.findIndex(item => item.id === productId)
  if (itemIndex !== -1) {
    const item = cart.value[itemIndex]
    const product = products.value.find(p => p.id === productId)
    product.stock += item.quantity
    
    cart.value.splice(itemIndex, 1)
  }
}

function increaseQuantity(productId) {
  const cartItem = cart.value.find(item => item.id === productId)
  const product = products.value.find(p => p.id === productId)
  
  if (cartItem && product && product.stock > 0) {
    cartItem.quantity++
    product.stock--
  }
}

function decreaseQuantity(productId) {
  const cartItem = cart.value.find(item => item.id === productId)
  const product = products.value.find(p => p.id === productId)
  
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--
    product.stock++
  }
}

function logout() {
  isAuthenticated.value = false
  cart.value = []
  searchTerm.value = ''
  showCart.value = false
}

function toggleCart() {
  showCart.value = !showCart.value
}

onMounted(() => {
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: normal !important;
  display: block !important;
  grid-template-columns: none !important;
  min-height: 100vh;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  color: #2d3748;
  display: block !important;
  place-items: initial !important;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
}

.login-wrapper {
  background: rgba(255, 255, 255, 0.9);
  padding: 4rem 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(255, 154, 158, 0.3);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.brand-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #d53f8c;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(213, 63, 140, 0.1);
}

.brand-subtitle {
  color: #a0aec0;
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 3rem;
}

.main-app {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #d53f8c 0%, #b794f6 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(213, 63, 140, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.cart-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-toggle-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.cart-toggle-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: #d53f8c;
  border-color: rgba(255, 255, 255, 0.9);
}

.toggle-icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.logout-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  background: #ffffff;
}

.cart-dropdown {
  position: fixed;
  top: 100px;
  right: 2rem;
  width: 400px;
  max-height: 70vh;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border: 2px solid #f7fafc;
  animation: slideInRight 0.3s ease-out;
  overflow: hidden;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.container-fluid {
  max-width: 95% !important;
  padding-left: 2rem;
  padding-right: 2rem;
}

@media (max-width: 768px) {
  .login-wrapper {
    padding: 2rem;
    margin: 1rem;
  }
  
  .brand-title {
    font-size: 2rem;
  }
  
  .app-header .row > div {
    margin-bottom: 1rem;
  }
  
  .app-header .text-end {
    text-align: start !important;
  }
  
  .cart-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .main-content {
    padding: 1rem 0;
  }
  
  .cart-dropdown {
    position: fixed;
    top: 80px;
    right: 1rem;
    left: 1rem;
    width: auto;
    max-height: 60vh;
  }
  
  .cart-toggle-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  
  .logout-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 576px) {
  .app-header {
    padding: 0.5rem 0;
  }
  
  .app-title {
    font-size: 1.4rem;
  }
  
  .cart-count {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(213, 63, 140, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(213, 63, 140, 0.7);
}
</style>