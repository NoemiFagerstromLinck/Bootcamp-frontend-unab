<template>
  <div class="detalle">
    <img class="detalle-img" :src="producto.imagen" :alt="producto.nombre" @error="onImgError" />
    <div class="detalle-info">
      <h2>{{ producto.nombre }}</h2>
      <p class="descripcion">{{ producto.descripcion }}</p>
      <p><strong>Precio:</strong> ${{ precioFormateado }}</p>
      <p>
        <strong>Stock:</strong>
        <span :class="{ agotado: Number(producto.stock) === 0 }">
          {{ Number(producto.stock) === 0 ? 'Sin stock' : producto.stock }}
        </span>
      </p>
      <button class="btn-cerrar" @click="$emit('cerrar')">Cerrar detalle</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalleProducto',
  props: {
    producto: { type: Object, required: true }
  },
  emits: ['cerrar'],
  methods: {
    onImgError(e) {
      if (e && e.target && !e.target.dataset.fallback) {
        e.target.src = 'https://via.placeholder.com/800x600.jpg?text=Producto'
        e.target.dataset.fallback = '1'
      }
    }
  },
  computed: {
    precioFormateado() {
      const n = Number(this.producto?.precio) || 0
      return new Intl.NumberFormat('es-CL', {
        style: 'decimal',
        minimumFractionDigits: 0
      }).format(n)
    }
  }
}
</script>

<style scoped>
.detalle {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 16px;
  padding: 16px;
}
.detalle-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  background: #f3e5f5;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.detalle-info h2 {
  margin: 0 0 8px 0;
}
.descripcion {
  color: #4b5563;
}
.agotado {
  color: #dc2626;
}
.btn-cerrar {
  margin-top: 12px;
  border: none;
  background: linear-gradient(135deg, #8e24aa, #5e35b1);
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .detalle {
    grid-template-columns: 1fr;
  }
}
</style>