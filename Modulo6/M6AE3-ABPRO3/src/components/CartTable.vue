<template>
  <div class="cart-container">
    <div class="cart-header">
      <h3>Carrito de Compras</h3>
      <span class="cart-count">{{ cart.length }} productos</span>
    </div>
    
    <div v-if="cart.length === 0" class="empty-cart">
      <p>Tu carrito está vacío</p>
      <small>¡Agrega algunos productos!</small>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-info">
            <img
              :src="item.image"
              :alt="item.name"
              class="item-image"
            >
            <div class="item-details">
              <h5 class="item-name">{{ item.name }}</h5>
              <div class="item-price">
                <span class="price">${{ formatPrice(item.price) }}</span>
              </div>
              <div class="quantity-controls">
                <button 
                  class="quantity-btn" 
                  @click="decreaseQuantity(item.id)"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button 
                  class="quantity-btn" 
                  @click="increaseQuantity(item.id)"
                  :disabled="!canIncreaseQuantity(item)"
                >
                  +
                </button>
              </div>
              <div class="item-subtotal">
                Subtotal: ${{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>
          <button
            class="remove-btn"
            @click="removeFromCart(item.id)"
            title="Eliminar producto completo"
          >
            Eliminar
          </button>
        </div>
      </div>
      
      <div class="cart-footer">
        <div class="cart-total">
          <strong>Total: ${{ formatPrice(total) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  },
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['remove-from-cart', 'increase-quantity', 'decrease-quantity'])

const total = computed(() => {
  return props.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

function formatPrice(price) {
  return price.toLocaleString('es-CL')
}

function removeFromCart(productId) {
  emit('remove-from-cart', productId)
}

function increaseQuantity(productId) {
  emit('increase-quantity', productId)
}

function decreaseQuantity(productId) {
  emit('decrease-quantity', productId)
}

function canIncreaseQuantity(item) {
  const product = props.products.find(p => p.id === item.id)
  return product && product.stock > 0
}
</script>

<style scoped>
.cart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 1rem;
  border-bottom: 2px solid #f7fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.cart-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2d3748;
  font-weight: 600;
}

.cart-count {
  background: #d53f8c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.empty-cart {
  padding: 2rem;
  text-align: center;
  color: #a0aec0;
}

.empty-cart p {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #4a5568;
}

.empty-cart small {
  color: #a0aec0;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.cart-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  transition: box-shadow 0.2s ease;
}

.cart-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-price {
  margin-bottom: 0.5rem;
}

.price {
  font-weight: 600;
  color: #d53f8c;
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 2px solid #d53f8c;
  background: white;
  color: #d53f8c;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #d53f8c;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
  border-color: #ccc;
  color: #999;
}

.quantity {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #2d3748;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.item-subtotal {
  font-size: 0.8rem;
  color: #4a5568;
  font-weight: 500;
}

.remove-btn {
  width: 100%;
  padding: 0.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.cart-footer {
  padding: 1rem;
  border-top: 2px solid #f7fafc;
  background: #f8f9fa;
}

.cart-total {
  text-align: center;
  font-size: 1.1rem;
  color: #2d3748;
}

.cart-items::-webkit-scrollbar {
  width: 4px;
}

.cart-items::-webkit-scrollbar-track {
  background: #f7fafc;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #d53f8c;
  border-radius: 2px;
}

.cart-items::-webkit-scrollbar-thumb:hover {
  background: #be185d;
}
</style>