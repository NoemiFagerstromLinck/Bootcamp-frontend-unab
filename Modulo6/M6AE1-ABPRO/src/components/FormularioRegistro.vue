<template>
  <div class="form-box pastel-bg shadow p-4 mb-4 w-100" style="max-width: 700px;">
    <h2 class="mb-4 text-center pastel-title">Formulario de Registro</h2>
    <form @submit.prevent="enviarFormulario">
      <div class="mb-3 row align-items-center">
        <label for="nombre" class="col-3 col-form-label text-pastel-label text-end">Nombre</label>
        <div class="col-9">
          <input type="text" id="nombre" class="form-control input-pastel" v-model="nombre" required />
        </div>
      </div>
      <div class="mb-3 row align-items-center">
        <label for="correo" class="col-3 col-form-label text-pastel-label text-end">Correo electrónico</label>
        <div class="col-9">
          <input type="email" id="correo" class="form-control input-pastel" v-model="correo" required />
        </div>
      </div>
      <div class="mb-3 row align-items-center">
        <label for="edad" class="col-3 col-form-label text-pastel-label text-end">Edad</label>
        <div class="col-9">
          <input type="number" id="edad" class="form-control input-pastel" v-model="edad" min="1" required />
        </div>
      </div>
      <div class="d-flex justify-content-center botones-formulario">
        <button type="submit" class="btn btn-pastel me-2" :disabled="!nombre || !correo || !edad">Registrar</button>
        <button type="button" class="btn btn-outline-pastel" @click="limpiarFormulario">Limpiar</button>
      </div>
    </form>
    <div v-if="mostrarResumen && nombre && correo && edad" class="card resumen-box pastel-bg2 shadow w-100 mt-3" style="max-width: 700px;">
      <div class="card-body">
        <h5 class="card-title text-center pastel-title">Resumen de Registro</h5>
        <p class="card-text pastel-text"><strong>Nombre:</strong> {{ nombre }}</p>
        <p class="card-text pastel-text"><strong>Correo electrónico:</strong> {{ correo }}</p>
        <p class="card-text pastel-text"><strong>Edad:</strong> {{ edad }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const nombre = ref('')
const correo = ref('')
const edad = ref('')
const mostrarResumen = ref(false)

const emit = defineEmits(['registrar-usuario'])

function enviarFormulario() {
  mostrarResumen.value = true
  emit('registrar-usuario', {
    nombre: nombre.value,
    apellido: '', 
    correo: correo.value,
    edad: Number(edad.value),
    fechaNacimiento: '' 
  })
  limpiarFormulario()
}

function limpiarFormulario() {
  nombre.value = ''
  correo.value = ''
  edad.value = ''
  mostrarResumen.value = false
}
</script>

<style scoped>
.form-box.pastel-bg {
  background: linear-gradient(135deg, #fceabb 0%, #f8b6d2 100%);
  border-radius: 18px;
  border: 1.5px solid #f8b6d2;
  padding: 2.2rem 2.5rem 2rem 2.5rem;
}
.pastel-title {
  color: #333;
  font-weight: 700;
  letter-spacing: 1px;
}
.text-pastel-label {
  color: #222;
  font-weight: 600;
  font-size: 1rem;
}
.input-pastel {
  background-color: #fff6f6;
  border-radius: 10px;
  border: 1px solid #f8b6d2;
  color: #222;
  font-weight: 500;
}
.input-pastel:focus {
  background-color: #fff;
  border-color: #b6e0f8;
  color: #222;
}
.btn-pastel {
  background: #3b3b4f;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1.3rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.07);
}
.btn-pastel:disabled {
  background: #888;
  color: #eee;
}
.btn-pastel:hover:not(:disabled) {
  background: #22223b;
  color: #fff;
}
.btn-outline-pastel {
  background: #fff;
  color: #3b3b4f;
  border: 2px solid #3b3b4f;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1.3rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
}
.btn-outline-pastel:hover {
  background: #3b3b4f;
  color: #fff;
}
.resumen-box.pastel-bg2 {
  background: linear-gradient(135deg, #b6e0f8 0%, #fceabb 100%);
  border-radius: 18px;
  border: 1.5px solid #b6e0f8;
}
.pastel-text {
  color: #222;
  font-weight: 500;
}
.botones-formulario {
  margin-top: 1.2rem;
}
</style>
