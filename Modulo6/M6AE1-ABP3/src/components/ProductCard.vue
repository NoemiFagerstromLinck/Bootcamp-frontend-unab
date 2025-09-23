<template>
  <div class="product-card">
    <div class="card-image-container">
      <img :src="product.image" :alt="product.name" class="product-image">
      <div class="stock-badge" :class="stockBadgeClass">
        <span>{{ product.stock > 0 ? `${product.stock} disponibles` : 'Agotado' }}</span>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="price-section">
        <span class="price">${{ formatPrice(product.price) }}</span>
        <span class="price-label">CLP</span>
      </div>
      
      <div class="action-buttons">
        <button
          class="btn-primary"
          @click="addToCart"
          :disabled="product.stock === 0"
          :class="{ 'btn-disabled': product.stock === 0 }"
        >
          {{ product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito' }}
        </button>
        
        <button class="btn-secondary" @click="showDetail">
          Ver Detalles
        </button>
      </div>
    </div>
    
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeDetail">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ product.name }}</h2>
            <button class="close-btn" @click="closeDetail" type="button">
              <span>&times;</span>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="modal-image-container">
              <img :src="product.image" :alt="product.name" class="modal-image">
            </div>
            
            <div class="modal-info">
              <div class="info-section">
                <h4>Descripción</h4>
                <p>{{ product.description }}</p>
              </div>
              
              <div class="info-section">
                <h4>Precio</h4>
                <div class="modal-price">
                  <span class="price-large">${{ formatPrice(product.price) }}</span>
                  <span class="price-currency">CLP</span>
                </div>
              </div>
              
              <div class="info-section">
                <h4>Disponibilidad</h4>
                <div class="stock-info" :class="stockBadgeClass">
                  <span v-if="product.stock > 0">
                    {{ product.stock }} unidades disponibles
                  </span>
                  <span v-else>
                    Producto agotado
                  </span>
                </div>
              </div>
              
              <button
                class="modal-add-btn"
                @click="addToCartAndClose"
                :disabled="product.stock === 0"
                :class="{ 'btn-disabled': product.stock === 0 }"
                type="button"
              >
                {{ product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

const showModal = ref(false)

const stockBadgeClass = computed(() => {
  if (props.product.stock === 0) return 'stock-out'
  if (props.product.stock <= 5) return 'stock-low'
  return 'stock-high'
})

function formatPrice(price) {
  return price.toLocaleString('es-CL')
}

function addToCart() {
  emit('add-to-cart', props.product)
}

function addToCartAndClose() {
  emit('add-to-cart', props.product)
  closeDetail()
}

function showDetail() {
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeDetail() {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

function handleEscape(event) {
  if (event.key === 'Escape' && showModal.value) {
    closeDetail()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  if (showModal.value) {
    document.body.style.overflow = 'auto'
  }
})
</script>

<style scoped>
/* Card principal */
.product-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 420px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  max-width: 300px;
  margin: 0 auto;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #e0e0e0;
}

/* Contenedor de imagen */
.card-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
  flex-shrink: 0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* Badge de stock */
.stock-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stock-badge.stock-high {
  background: rgba(213, 63, 140, 0.9);
  color: white;
}

.stock-badge.stock-low {
  background: rgba(251, 191, 36, 0.9);
  color: #92400e;
}

.stock-badge.stock-out {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

/* Contenido de la card */
.card-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 2.6em;
}

.product-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0 0 12px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 2.4em;
  flex-shrink: 0;
}

/* Sección de precio */
.price-section {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #d53f8c;
}

.price-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* Botones de acción */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.btn-primary, .btn-secondary {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #d53f8c 0%, #b794f6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(213, 63, 140, 0.3);
}

.btn-primary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(213, 63, 140, 0.4);
}

.btn-secondary {
  background: #f8fafc;
  color: #475569;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.btn-disabled {
  background: #e5e7eb !important;
  color: #9ca3af !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
}

.btn-disabled:hover {
  transform: none !important;
}

.btn-icon {
  font-size: 1rem;
}

/* Modal mejorado */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease-out;
  position: relative;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
}

.close-btn {
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #6b7280;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e5e7eb;
  color: #374151;
  transform: scale(1.1);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.modal-image-container {
  margin-bottom: 24px;
}

.modal-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.info-section p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.modal-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-large {
  font-size: 2rem;
  font-weight: 800;
  color: #d53f8c;
}

.price-currency {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
}

.stock-info {
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 600;
}

.stock-info.stock-high {
  background: #fce7f3;
  color: #be185d;
}

.stock-info.stock-low {
  background: #fef3c7;
  color: #92400e;
}

.stock-info.stock-out {
  background: #fecaca;
  color: #991b1b;
}

.modal-add-btn {
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(135deg, #d53f8c 0%, #b794f6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(213, 63, 140, 0.3);
}

.modal-add-btn:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(213, 63, 140, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    margin: 10px;
    max-height: 95vh;
  }
  
  .modal-header, .modal-body {
    padding: 16px;
  }
  
  .product-title {
    font-size: 1.1rem;
  }
  
  .price {
    font-size: 1.5rem;
  }
}
</style>