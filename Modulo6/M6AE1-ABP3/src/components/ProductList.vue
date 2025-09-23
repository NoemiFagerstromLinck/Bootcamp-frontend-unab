<template>
  <div class="mb-4">
    <h2 class="text-center mb-4">🛍️ Productos Disponibles</h2>
    
    <div v-if="products.length === 0" class="text-center">
      <p class="text-muted">No se encontraron productos disponibles.</p>
    </div>
    
    <div v-else class="row g-3">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12"
      >
        <ProductCard
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-to-cart'])

function handleAddToCart(product) {
  emit('add-to-cart', product)
}
</script>