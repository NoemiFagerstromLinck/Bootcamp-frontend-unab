<template>
  <div class="tarjeta" :class="{ 'sin-stock': Number(stock) === 0 }" @click="onCardClick">
    <img class="tarjeta-img" :src="imagen" :alt="nombre" @error="onImgError" />
    <div class="tarjeta-body">
      <h3 class="tarjeta-titulo">{{ nombre }}</h3>
      <p class="tarjeta-descripcion">{{ descripcion }}</p>

      <div class="tarjeta-info">
        <span class="precio">${{ formatoPrecio }}</span>
        <span class="stock" :class="{ agotado: Number(stock) === 0 }">
          {{ Number(stock) === 0 ? 'Sin stock' : `Stock: ${stock}` }}
        </span>
      </div>

      <div class="tarjeta-actions">
        <button
          class="btn-agregar"
          :disabled="Number(stock) === 0"
          @click.stop="onAgregar"
        >
          Agregar al carrito
        </button>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TarjetaProducto',
  props: {
    id: { type: [String, Number], required: true },
    nombre: { type: String, required: true },
    precio: { type: [Number, String], required: true },
    imagen: { type: String, required: true },
    stock: { type: [Number, String], required: true },
    descripcion: { type: String, required: true }
  },
  emits: ['agregar', 'click'],
  computed: {
    formatoPrecio() {
      const n = Number(this.precio) || 0
      return new Intl.NumberFormat('es-CL', {
        style: 'decimal',
        minimumFractionDigits: 0
      }).format(n)
    }
  },
  methods: {
    onAgregar() {
      this.$emit('agregar', this.id)
    },
    onCardClick() {
      this.$emit('click')
    },
    onImgError(e) {
      if (e && e.target && !e.target.dataset.fallback) {
        e.target.src = 'https://via.placeholder.com/640x480.jpg?text=Producto'
        e.target.dataset.fallback = '1'
      }
    }
  },
  created() {
    console.log(`[TarjetaProducto] created -> ${this.nombre}`)
  },
  mounted() {
    console.log(`[TarjetaProducto] mounted -> ${this.nombre}`)
  },
  unmounted() {
    console.log(`[TarjetaProducto] destroyed -> ${this.nombre}`)
  }
}
</script>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: transform .15s ease, box-shadow .15s ease;
}

.tarjeta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.tarjeta.sin-stock {
  opacity: 0.8;
  filter: grayscale(0.15);
}

.tarjeta-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: #f3e5f5;
}

.tarjeta-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tarjeta-titulo {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
}

.tarjeta-descripcion {
  margin: 0;
  font-size: .95rem;
  color: #4b5563;
}

.tarjeta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}

.precio {
  font-weight: 700;
  color: #7e57c2;
}

.stock {
  font-size: .9rem;
  color: #059669;
}

.stock.agotado {
  color: #dc2626;
}

.tarjeta-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
}

.btn-agregar {
  border: none;
  background: linear-gradient(135deg, #8e24aa, #5e35b1);
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.btn-agregar:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>