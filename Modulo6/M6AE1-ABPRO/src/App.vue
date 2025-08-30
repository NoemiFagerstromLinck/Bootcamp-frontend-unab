
<script setup>
import { ref } from 'vue'
import TablaUsuarios from './components/TablaUsuarios.vue'
import TablaUsuariosReves from './components/TablaUsuariosReves.vue'
import FormularioRegistro from './components/FormularioRegistro.vue'

const usuarios = ref([
  {
    nombre: 'Ana',
    apellido: 'García',
    fechaNacimiento: '1995-04-12',
    edad: 30
  },
  {
    nombre: 'Luis',
    apellido: 'Pérez',
    fechaNacimiento: '1990-09-23',
    edad: 34
  },
  {
    nombre: 'María',
    apellido: 'López',
    fechaNacimiento: '2000-01-15',
    edad: 25
  }
])

function agregarUsuario(nuevoUsuario) {
  usuarios.value.push(nuevoUsuario)
}
</script>



<template>
  <main>
    <div class="container mt-5">
      <div class="tablas-flex mb-5">
        <div class="tabla-flex-item">
          <TablaUsuariosReves :usuarios="usuarios" />
        </div>
        <div class="tabla-flex-item">
          <TablaUsuarios :usuarios="usuarios" />
        </div>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
        <FormularioRegistro @registrar-usuario="agregarUsuario" />
      </div>
    </div>
  </main>
</template>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.container {
  max-width: 1400px;
}
.tablas-flex {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
}
.tabla-flex-item {
  flex: 1 1 0;
  min-width: 400px;
  max-width: 600px;
  display: flex;
  justify-content: center;
}

.text-pastel-label {
  color: #4a4a4a;
  font-weight: 600;
  font-size: 1rem;
}
.btn-pastel {
  background: #b6e0f8;
  color: #4a4a4a;
  border: none;
  border-radius: 10px;
  transition: background 0.2s;
}
.btn-pastel:disabled {
  background: #e0e0e0;
  color: #aaa;
}
.btn-pastel:hover:not(:disabled) {
  background: #f8b6d2;
  color: #fff;
}
.btn-outline-pastel {
  background: transparent;
  color: #b6e0f8;
  border: 2px solid #b6e0f8;
  border-radius: 10px;
  transition: background 0.2s, color 0.2s;
}
.btn-outline-pastel:hover {
  background: #b6e0f8;
  color: #fff;
}
.resumen-box {
  border-radius: 18px;
  margin-top: 10px;
  border: 1.5px solid #b6e0f8;
}
.pastel-bg {
  background: linear-gradient(135deg, #fceabb 0%, #f8b6d2 100%);
}
.pastel-bg2 {
  background: linear-gradient(135deg, #b6e0f8 0%, #fceabb 100%);
}
.pastel-text {
  color: #333;
  font-weight: 500;
}
</style>
