
<template>
  <div class="tabla-box pastel-bg shadow p-4 mb-5 w-100">
    <h2 class="mb-4 pastel-title">Usuarios (Datos al Revés)</h2>
    <div v-for="usuario in usuarios" :key="usuario.nombre + usuario.apellido" class="usuario-card mb-3">
      <div class="row g-0 align-items-center">
  <div class="col-2"><span class="label">Edad:</span> <span class="dato">{{ usuario.edad }}</span></div>
  <div class="col-4" v-if="usuario.fechaNacimiento"><span class="label">Fecha de Nacimiento:</span> <span class="dato">{{ usuario.fechaNacimiento }}</span></div>
  <div class="col-3" v-if="usuario.apellido"><span class="label">Apellido:</span> <span class="dato">{{ usuario.apellido }}</span></div>
  <div class="col-3"><span class="label">Nombre:</span> <span class="dato">{{ usuario.nombre }}</span></div>
      </div>
      <hr class="separador" />
    </div>
  </div>
</template>

<script setup>
defineProps({ usuarios: Array })
</script>

<style scoped>
.tabla-box.pastel-bg {
  background: linear-gradient(135deg, #fceabb 0%, #f8b6d2 100%);
  border-radius: 18px;
  border: 1.5px solid #f8b6d2;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 600px;
  min-width: 350px;
}
.pastel-title {
  color: #333;
  font-weight: 700;
  letter-spacing: 1px;
}
.usuario-card {
  padding: 0.5rem 0.2rem 0.2rem 0.2rem;
}
.label {
  color: #222;
  font-weight: 600;
}
.dato {
  color: #333;
  font-weight: 500;
}
.separador {
  border: none;
  border-top: 1.5px solid #b6e0f8;
  margin: 0.5rem 0 0.2rem 0;
}
</style>
