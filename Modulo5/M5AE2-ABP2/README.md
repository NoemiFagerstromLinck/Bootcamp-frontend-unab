# Tecno Chile - Carrito de Compras

## Descripción del Proyecto

Sistema de carrito de compras desarrollado para la empresa Tecno Chile, que permite a los usuarios navegar por productos tecnológicos, agregarlos al carrito y realizar compras con control completo de inventario.

## Características Implementadas

### Funcionalidades Principales
- **Carrito de compras interactivo** con agregar, modificar y eliminar productos
- **Control de inventario en tiempo real** con validaciones de stock
- **Gestión de cantidades** con límites basados en stock disponible
- **Sistema de notificaciones** para alertas de stock y confirmaciones
- **Persistencia de carrito** usando localStorage
- **Proceso de compra completo** con actualización de stock
- **Alertas automáticas** cuando productos quedan sin stock

### Control de Stock
- **Productos agotados**: Marcados claramente y no seleccionables
- **Stock bajo** (< 4 unidades): Muestra advertencia con cantidad exacta
- **Último producto**: Alerta especial cuando solo queda 1 unidad
- **Validación en tiempo real**: Previene agregar más productos de los disponibles

### Notificaciones por Email
- **Alerta automática** al administrador cuando productos se agotan
- **Envío real de emails** mediante EmailJS (configurable)
- **Log completo** de productos sin stock después de cada venta
- **Información detallada** incluye stock anterior y actual
- **Alternativa mailto** si EmailJS no está configurado

## Requerimientos Cumplidos

| Requerimiento | Estado | Implementación |
|--------------|---------|----------------|
| Sitio web HTML5 | Implementado | Estructura semántica completa |
| Productos desde JSON | Implementado | Carga dinámica desde productos.json |
| Control mensajes stock | Implementado | 4 estados: disponible, bajo, último, agotado |
| Carrito de compras | Implementado | Agregar, modificar, eliminar productos |
| Modificar cantidades | Implementado | Controles + / - y input directo |
| Rebajar stock compras | Implementado | Actualización automática post-compra |
| Email sin stock | Implementado | Sistema de alertas automático |

## Estructura de Archivos

```
M5AE1-ABPRO1/
├── index.html              # Página principal
├── carrito.js              # Lógica del carrito y gestión
├── productos.json          # Base de datos de productos
├── EMAILJS_SETUP.md        # Instrucciones configuración email
├── INSTRUCCIONES_EJECUCION.md  # Cómo ejecutar el proyecto
└── README.md              # Esta documentación
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con gradientes morados
- **JavaScript ES6+**: Programación orientada a objetos
- **JSON**: Base de datos de productos
- **Font Awesome**: Iconografía profesional
- **LocalStorage**: Persistencia de datos del carrito
- **EmailJS**: Servicio de envío de correos electrónicos

## Productos Incluidos

El sistema incluye 15 productos tecnológicos de diferentes categorías:

- **Laptops**: MacBook Pro, Dell XPS, HP Pavilion Gaming
- **Smartphones**: iPhone 15 Pro, Samsung Galaxy S24 Ultra
- **Tablets**: iPad Air, Microsoft Surface Pro
- **Audio**: AirPods Pro, Sony WH-1000XM5, SteelSeries Arctis
- **Gaming**: Nintendo Switch OLED
- **Wearables**: Apple Watch Series 9
- **Accesorios**: Logitech MX Master, Cámaras Canon

## Diseño y UX

### Paleta de Colores
- **Principal**: Morados (#6b46c1, #7c3aed, #a78bfa)
- **Gradientes**: Degradados suaves para fondos
- **Estados**: Verde (éxito), Rojo (error), Amarillo (advertencia)

### Características de Diseño
- **Responsive Design**: Adaptable a móviles y desktop
- **Glassmorphism**: Efectos de cristal con backdrop-filter
- **Animaciones suaves**: Transiciones y hover effects
- **Iconografía clara**: Font Awesome para mejor UX
- **Notificaciones toast**: Feedback inmediato al usuario

## Funcionalidades Técnicas

### Gestión de Estado
```javascript
class TecnoChileStore {
    - products[]     // Inventario de productos
    - cart[]        // Productos en carrito
    - config{}      // Configuración del sistema
}
```

### Validaciones Implementadas
- Stock disponible vs cantidad solicitada
- Límites máximos por producto
- Verificación de productos existentes
- Validación de cantidades positivas

### Sistema de Alertas
- Notificaciones visuales en pantalla
- Log detallado en consola
- Almacenamiento de alertas en localStorage
- Información completa para administrador

## Instrucciones de Uso

### Para el Usuario
1. Navegar por los productos disponibles
2. Seleccionar cantidad deseada (respetando límites de stock)
3. Agregar productos al carrito
4. Modificar cantidades desde el carrito
5. Proceder al checkout para finalizar compra

### Para el Administrador
1. Configurar EmailJS siguiendo las instrucciones en `EMAILJS_SETUP.md`
2. Recibir emails automáticos cuando productos se agotan
3. Revisar alertas de stock en consola del navegador
4. Verificar localStorage para historial de alertas
5. Monitorear productos.json para estado actual de inventario

### Setup para Desarrollo
1. Instalar Live Server en VS Code
2. Abrir proyecto en VS Code
3. Click derecho en `index.html` → "Open with Live Server"
4. Desarrollo con recarga automática

## Cómo Ejecutar el Proyecto

**IMPORTANTE**: NO abrir `index.html` directamente. Usar Live Server para evitar errores CORS.

### Ejecutar con Live Server (VS Code)
1. Instalar Live Server en VS Code (extensión de Ritwick Dey)
2. Click derecho en `index.html` → "Open with Live Server"
3. Se abre automáticamente con recarga en vivo

### Instrucciones detalladas
Ver `INSTRUCCIONES_EJECUCION.md` para pasos completos de instalación y uso

## Estado del Proyecto

**Completado y funcional**

Todos los requerimientos han sido implementados y probados. El sistema está listo para producción con todas las validaciones y controles de stock funcionando correctamente.

---

**Desarrollado para**: Bootcamp Frontend UNAB  
**Módulo**: M5 - JavaScript Avanzado  
**Actividad**: M5AE1-ABPRO1  
**Fecha**: Octubre 2025