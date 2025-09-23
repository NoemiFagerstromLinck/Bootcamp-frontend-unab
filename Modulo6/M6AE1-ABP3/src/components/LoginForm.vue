<template>
  <div class="login-form-container">
    <div class="login-form">
      <div class="form-header">
        <h3>Iniciar Sesión</h3>
      </div>
      
      <form @submit.prevent="handleSubmit" class="login-form-content">
        <div class="form-group">
          <label for="username" class="form-label">Usuario:</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            class="form-input"
            required
            placeholder="Ingresa tu usuario"
          >
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            class="form-input"
            required
            placeholder="Ingresa tu contraseña"
          >
        </div>
        
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Iniciando sesión...' : 'Ingresar' }}
        </button>
      </form>
      
      <div class="login-hint">
        <p><strong>Usuario:</strong> admin</p>
        <p><strong>Contraseña:</strong> admin</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login'])

const credentials = ref({
  username: '',
  password: ''
})

const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  try {
    await emit('login', credentials.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-form-container {
  width: 100%;
  max-width: 100%;
}

.login-form {
  background: transparent;
  width: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(213, 63, 140, 0.2);
}

.form-header h3 {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.login-form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
  margin: 0;
}

.form-input {
  padding: 1rem 1.25rem;
  border: 2px solid rgba(213, 63, 140, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  color: #2d3748;
}

.form-input:focus {
  outline: none;
  border-color: #d53f8c;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(213, 63, 140, 0.1);
}

.form-input::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

.login-btn {
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, #d53f8c 0%, #b794f6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(213, 63, 140, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-hint {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(213, 63, 140, 0.1);
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(213, 63, 140, 0.2);
}

.login-hint p {
  margin: 0.5rem 0;
  color: #4a5568;
  font-size: 1rem;
}

.login-hint strong {
  color: #d53f8c;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .form-header h3 {
    font-size: 1.6rem;
  }
  
  .form-input {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }
  
  .login-btn {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
  
  .login-hint {
    padding: 1rem;
  }
  
  .login-hint p {
    font-size: 0.9rem;
  }
}
</style>