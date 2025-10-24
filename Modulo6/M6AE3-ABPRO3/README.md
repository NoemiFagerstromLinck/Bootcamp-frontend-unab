# Tiendita - Vue Lite Edition

Una aplicación de e-commerce desarrollada con Vue 3 y Vite que simula una tienda online completa.

## Funcionalidades Implementadas

### ✅ Autenticación
- **Formulario de login** con campos de nombre, correo y contraseña
- **Credenciales válidas**: 
  - Email: `usuario1@mitienda.com`
  - Password: `password`
- **Simulación de API REST** para autenticación
- **Manejo de sesión** con logout
- **Navegación condicional** (muestra login cuando no está autenticado)

### ✅ Gestión de Productos
- **Lista de productos** obtenida desde módulo JavaScript externo (simula API)
- **Respuesta asíncrona** a través de promesas
- **Búsqueda de productos** por nombre en tiempo real
- **Productos con stock limitado** y manejo de disponibilidad
- **Vista detallada** de cada producto con modal

### ✅ Carrito de Compras
- **Agregar productos al carrito** con validación de stock
- **Control de cantidad individual** (+ / -) para cada producto
- **Eliminar productos** del carrito completamente
- **Vista del carrito** en dropdown deslizable
- **Cálculo automático** de subtotales y total
- **Sincronización de stock** entre productos y carrito

### ✅ Interfaz de Usuario
- **Diseño responsive** con Bootstrap 5
- **Animaciones y transiciones** suaves
- **Colores y gradientes modernos**
- **Componentes reutilizables**
- **Indicadores visuales** de stock y estado

## Estructura del Proyecto

```
src/
├── api/
│   ├── auth.js          # Simulación de API de autenticación
│   └── products.js      # Simulación de API de productos
├── components/
│   ├── CartTable.vue    # Componente del carrito de compras
│   ├── LoginForm.vue    # Formulario de inicio de sesión
│   ├── ProductCard.vue  # Tarjeta individual de producto
│   ├── ProductList.vue  # Lista de productos
│   └── SearchBox.vue    # Buscador de productos
├── App.vue              # Componente principal
├── main.js              # Punto de entrada
└── state.js             # Estado global (si aplica)
```

## Instalación y Ejecución

### Instalar dependencias
```sh
npm install
```

### Ejecutar en modo desarrollo
```sh
npm run dev
```

### Compilar para producción
```sh
npm run build
```

## Tecnologías Utilizadas

- **Vue 3** - Framework progresivo
- **Vite** - Build tool rápido
- **Bootstrap 5** - Framework CSS
- **JavaScript ES6+** - Lenguaje de programación
- **CSS3** - Estilos personalizados

## Credenciales de Prueba

Para acceder a la aplicación, utiliza:
- **Nombre**: Cualquier nombre
- **Email**: usuario1@mitienda.com
- **Contraseña**: password

## Funcionalidades Destacadas

1. **Autenticación Completa**: Sistema de login con validación de credenciales y manejo de sesión.

2. **Carrito Inteligente**: 
   - Incremento/decremento de cantidades
   - Validación de stock en tiempo real
   - Eliminación de productos completos

3. **Búsqueda Dinámica**: Filtrado de productos en tiempo real por nombre.

4. **Gestión de Stock**: Sincronización automática entre productos disponibles y carrito.

5. **UI/UX Moderna**: Diseño responsivo con animaciones y efectos visuales atractivos.
