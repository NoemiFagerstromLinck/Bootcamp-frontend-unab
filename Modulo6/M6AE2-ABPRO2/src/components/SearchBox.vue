<template>
  <div class="search-container">
    <div class="input-group">
      <span class="input-group-text search-icon">🔍</span>
      <input
        type="text"
        class="form-control search-input"
        placeholder="Buscar productos..."
        v-model="searchTerm"
        @input="handleSearch"
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])

const searchTerm = ref('')

function handleSearch() {
  emit('search', searchTerm.value)
}
</script>

<style scoped>
.search-container {
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-left: none;
  color: #fff;
  font-weight: 500;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  color: #fff;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.search-icon {
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-right: none;
  color: rgba(255, 255, 255, 0.9);
}

.input-group:focus-within .search-icon {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.6);
}
</style>