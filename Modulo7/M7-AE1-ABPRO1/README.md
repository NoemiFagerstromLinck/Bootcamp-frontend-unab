# Catálogo Interactivo de Productos (Vue 3 + Vite)

Implementación del catálogo solicitado en la actividad: componentización con jerarquía padre/hijo, props, emisión de eventos, slots, componentes dinámicos, hooks del ciclo de vida y estilos dinámicos.

Nota: Se eliminó Firebase por completo. La app usa estado en memoria (Vuex) y las rutas del catálogo son públicas. El módulo de cursos y autenticación se mantiene funcionando con datos locales.

## ✔️ Cumplimiento de Requerimientos

- Componentización y jerarquía: `CatalogoProductos.vue` (padre) + `TarjetaProducto.vue` (hijo)
- Uso de props: `TarjetaProducto.vue` recibe `id, nombre, precio, imagen, stock, descripcion`
- Emisión de eventos: botón “Agregar al carrito” emite `agregar` con el `id`
- Slots: `TarjetaProducto.vue` incluye un slot para contenido personalizado en la parte inferior
- Componentes dinámicos: `DetalleProducto.vue` se renderiza dinámicamente al hacer clic en un producto
- Ciclo de vida: `TarjetaProducto.vue` usa `created`, `mounted`, `unmounted` con logs en consola
- Estilos dinámicos: clases reactivas para indicar falta de stock

## 🧭 ¿Dónde probarlo?

- Inicia el servidor y navega a: `http://localhost:5173/catalogo`
- También hay un acceso directo en la barra superior “Catálogo”

## 📦 Requisitos previos

- Node.js 20+ (o >= 22)
- npm

## 🛠️ Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

La app queda disponible en `http://localhost:5173`.

## 🗂️ Estructura relevante

- `src/views/CatalogoProductos.vue`: Componente padre con listado, detalle dinámico y carrito en memoria.
- `src/components/TarjetaProducto.vue`: Hijo reutilizable con props, slot, eventos y hooks de ciclo de vida.
- `src/components/DetalleProducto.vue`: Vista de detalle que se renderiza dinámicamente.
- `src/router/index.js`: Ruta pública `/catalogo` registrada.
- `src/store/modules/{auth,courses}.js`: Implementaciones locales sin Firebase.

## 🧪 Pruebas (opcional)

El proyecto incluye configuración de Cypress. Las pruebas existentes fueron creadas para el flujo de cursos; pueden requerir ajustes si decides ejecutarlas con el nuevo enfoque sin Firebase.

Comandos útiles:
```bash
npm run cypress:open
npm run cypress:run
```

## 🛠️ Tecnologías

- Vue 3, Vite, Vue Router, Vuex 4
- Bootstrap 5, bootstrap-vue-next
- Cypress (opcional, ya configurado)

## ℹ️ Notas

- Firebase fue removido del proyecto y de las dependencias.
- El catálogo funciona completamente sin servicios externos.
