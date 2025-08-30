<template>
  <div class="container mt-5">
    <h2 class="mb-4">Tabla de Usuarios</h2>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha de Nacimiento</th>
          <th>Edad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.nombre + usuario.apellido">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellido }}</td>
          <td>{{ usuario.fechaNacimiento }}</td>
          <td>{{ usuario.edad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
</script>
