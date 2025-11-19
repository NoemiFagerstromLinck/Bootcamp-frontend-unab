<template>
  <div class="catalogo">
    <div class="catalogo-header">
      <h1>Catálogo de Productos</h1>
      <button class="btn-carrito" @click="cartOpen = true">
        <i class="bi bi-cart"></i> Carrito <span v-if="totalItems">({{ totalItems }})</span>
      </button>
    </div>

    <div class="grid">
      <TarjetaProducto
        v-for="p in productos"
        :key="p.id"
        :id="p.id"
        :nombre="p.nombre"
        :precio="p.precio"
        :imagen="p.imagen"
        :stock="p.stock"
        :descripcion="p.descripcion"
        @agregar="agregarAlCarrito"
        @click="verDetalle(p)"
      >
        <span v-if="p.oferta" class="badge-oferta">{{ p.oferta }}</span>
      </TarjetaProducto>
    </div>

    <hr />

    <component
      v-if="productoSeleccionado"
      :is="DetalleProducto"
      :producto="productoSeleccionado"
      @cerrar="productoSeleccionado = null"
    />

    <div v-if="cartOpen" class="overlay" @click="cartOpen = false" />
    <aside class="drawer" :class="{ open: cartOpen }" aria-label="Carrito de compras">
      <header class="drawer-header">
        <h2>Tu Carrito</h2>
        <button class="btn-cerrar" @click="cartOpen = false" aria-label="Cerrar carrito">
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <div v-if="carritoDetalle.length" class="drawer-content">
        <div v-for="item in carritoDetalle" :key="item.id" class="cart-item">
          <img :src="item.imagen" :alt="item.nombre" />
          <div class="info">
            <div class="nombre">{{ item.nombre }}</div>
            <div class="controles">
              <button class="qty-btn" @click="decrementar(item.id)" :disabled="item.qty <= 1">-</button>
              <span class="qty">{{ item.qty }}</span>
              <button class="qty-btn" @click="incrementar(item.id)">+</button>
            </div>
          </div>
          <div class="precio">${{ formatNumber(item.precio * item.qty) }}</div>
          <button class="btn-remove" @click="remover(item.id)">Eliminar</button>
        </div>
      </div>
      <div v-else class="drawer-empty">Tu carrito está vacío.</div>

      <footer class="drawer-footer">
        <div class="total">
          <span>Total</span>
          <strong>${{ formatNumber(totalPrice) }}</strong>
        </div>
        <div class="acciones">
          <button class="btn-secondary" @click="vaciar" :disabled="!carritoDetalle.length">Vaciar</button>
          <button class="btn-primary" @click="checkout" :disabled="!carritoDetalle.length">Pagar</button>
        </div>
      </footer>
    </aside>
  </div>
</template>

<script>
import TarjetaProducto from '@/components/TarjetaProducto.vue'
import DetalleProducto from '@/components/DetalleProducto.vue'

export default {
  name: 'CatalogoProductos',
  components: { TarjetaProducto },
  data() {
    return {
      productos: [
        { id: 1, nombre: 'Teclado Mecánico', precio: 39990, imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', stock: 5, descripcion: 'Teclado mecánico con switches rojos.', oferta: 'Recomendado' },
        { id: 2, nombre: 'Mouse Inalámbrico', precio: 19990, imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop', stock: 0, descripcion: 'Mouse ergonómico con 6 botones programables.' },
        { id: 3, nombre: 'Monitor 27" 144Hz', precio: 249990, imagen: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop', stock: 8, descripcion: 'Monitor IPS 144Hz QHD de alta fidelidad de color.' },
        { id: 4, nombre: 'Audífonos Inalámbricos', precio: 59990, imagen: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1200', stock: 12, descripcion: 'Cancelación de ruido activa y estuche de carga.' },
        { id: 5, nombre: 'SSD NVMe 1TB', precio: 109990, imagen: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop', stock: 3, descripcion: 'Almacenamiento ultra rápido para acelerar el sistema.', oferta: 'Oferta' }
      ],
      carrito: [],
      productoSeleccionado: null,
      DetalleProducto,
      cartOpen: false
    }
  },
  computed: {
    carritoDetalle() {
      // Mapear carrito (id, qty) a objetos con info de producto
      return this.carrito.map(ci => {
        const p = this.productos.find(px => px.id === ci.id) || {}
        return {
          id: ci.id,
          qty: ci.qty,
          nombre: p.nombre,
          precio: Number(p.precio) || 0,
          imagen: p.imagen
        }
      })
    },
    totalItems() {
      return this.carrito.reduce((acc, it) => acc + it.qty, 0)
    },
    totalPrice() {
      return this.carritoDetalle.reduce((acc, it) => acc + (it.precio * it.qty), 0)
    }
  },
  methods: {
    agregarAlCarrito(id) {
      const idx = this.carrito.findIndex(it => it.id === id)
      if (idx >= 0) {
        this.carrito[idx].qty += 1
      } else {
        this.carrito.push({ id, qty: 1 })
      }
      console.log('[Catalogo] Producto agregado al carrito -> id:', id)
    },
    verDetalle(prod) {
      this.productoSeleccionado = prod
      console.log('[Catalogo] Mostrar detalle de producto ->', prod.nombre)
    },
    incrementar(id) {
      const item = this.carrito.find(it => it.id === id)
      if (item) item.qty += 1
    },
    decrementar(id) {
      const item = this.carrito.find(it => it.id === id)
      if (item && item.qty > 1) item.qty -= 1
    },
    remover(id) {
      this.carrito = this.carrito.filter(it => it.id !== id)
    },
    vaciar() {
      this.carrito = []
    },
    checkout() {
      alert(`Compra realizada por $${this.formatNumber(this.totalPrice)} (items: ${this.totalItems})`)
      this.vaciar()
      this.cartOpen = false
    },
    formatNumber(n) {
      return new Intl.NumberFormat('es-CL', { style: 'decimal', minimumFractionDigits: 0 }).format(Number(n) || 0)
    }
  }
}
</script>

<style scoped>
.catalogo {
  padding: 1.5rem;
}
.catalogo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 1rem;
}
.badge-oferta {
  background: #e1bee7;
  color: #4a148c;
  padding: 6px 10px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: .8rem;
}

.btn-carrito {
  border: none;
  background: linear-gradient(135deg, #8e24aa, #5e35b1);
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

/* Drawer y overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 999;
}
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 320px;
  background: #ffffff;
  box-shadow: -6px 0 20px rgba(0,0,0,0.15);
  transform: translateX(100%);
  transition: transform .25s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
.drawer.open {
  transform: translateX(0);
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.btn-cerrar {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}
.drawer-content {
  flex: 1;
  overflow: auto;
  padding: 12px 8px;
}
.drawer-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}
.cart-item {
  display: grid;
  grid-template-columns: 56px 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f1f5f9;
}
.cart-item img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  background: #f8fafc;
  border-radius: 8px;
}
.cart-item .info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cart-item .nombre {
  font-weight: 700;
  color: #4a148c;
}
.controles {
  display: flex;
  align-items: center;
  gap: 8px;
}
.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: #ede7f6;
  color: #4a148c;
  cursor: pointer;
  font-weight: 800;
}
.qty {
  min-width: 20px;
  text-align: center;
}
.precio {
  font-weight: 700;
}
.btn-remove {
  border: none;
  background: transparent;
  color: #9c27b0;
  cursor: pointer;
}
.drawer-footer {
  border-top: 1px solid #eee;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.total {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.btn-secondary {
  border: 1px solid #b39ddb;
  background: #f3e5f5;
  color: #4a148c;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}
.btn-primary {
  border: none;
  background: linear-gradient(135deg, #8e24aa, #5e35b1);
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}
</style>