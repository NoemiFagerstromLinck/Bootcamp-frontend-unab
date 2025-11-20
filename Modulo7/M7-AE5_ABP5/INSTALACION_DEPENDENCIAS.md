# Instrucciones de Instalación - Librerías UI

## Nota Importante

**Las vistas de las demos de librerías UI están creadas pero requieren la instalación de las dependencias correspondientes para funcionar completamente.**

Este proyecto incluye las **implementaciones de código** para demostrar cada librería, pero debido a posibles conflictos entre diferentes frameworks UI y el tamaño de los node_modules, las dependencias no están instaladas por defecto.

---

## Estado Actual del Proyecto

### ✅ Implementado y funcionando:
- Vue.js 3 con Vite
- Vue Router
- Bootstrap 5 (ya instalado)
- Firebase Authentication
- Pokeguía original

### 📝 Implementado pero requiere instalación:
- BootstrapDemo.vue (requiere Bootstrap Icons)
- VuetifyDemo.vue (requiere Vuetify 3)
- BuefyDemo.vue (requiere Buefy)
- ElementDemo.vue (requiere Element Plus)
- UIComparison.vue (funciona con Bootstrap ya instalado)

---

## Opción 1: Ver las demos (Instalación de dependencias)

### Para BootstrapVue (Bootstrap 5)

**Bootstrap 5 ya está instalado**, solo necesitas Bootstrap Icons:

```bash
npm install bootstrap-icons
```

Luego agrega al `main.js`:
```javascript
import 'bootstrap-icons/font/bootstrap-icons.css'
```

### Para Vuetify

```bash
npm install vuetify@^3.4.0 @mdi/font
```

Crear `src/plugins/vuetify.js`:
```javascript
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})
```

Actualizar `main.js`:
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
```

### Para Buefy

```bash
npm install @ntohq/buefy-next @mdi/font
```

Actualizar `main.js`:
```javascript
import Buefy from '@ntohq/buefy-next'
import '@ntohq/buefy-next/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'

app.use(Buefy)
```

### Para Element Plus

```bash
npm install element-plus @element-plus/icons-vue
```

Actualizar `main.js`:
```javascript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```

---

## Opción 2: Instalar todas las librerías (Recomendado para evaluación)

Si quieres probar todas las demos a la vez:

```bash
# Instalar todas las dependencias UI
npm install bootstrap-icons vuetify@^3.4.0 @mdi/font @ntohq/buefy-next element-plus @element-plus/icons-vue
```

Luego actualiza `src/main.js`:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap (ya instalado)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives
})

// Buefy
import Buefy from '@ntohq/buefy-next'
import '@ntohq/buefy-next/dist/buefy.css'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Estilos personalizados
import './style.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(Buefy)
app.use(ElementPlus)

app.mount('#app')
```

---

## Opción 3: Solo revisar la documentación (Sin instalación)

Si prefieres solo revisar la investigación y documentación sin ejecutar las demos:

1. Lee `ACTIVIDAD1_INVESTIGACION.md` para el análisis teórico
2. Lee `ACTIVIDAD2_INVESTIGACION_SSR.md` para teoría de SSR
3. Lee `ACTIVIDAD2_IMPLEMENTACION_NUXT.md` para implementación de Nuxt.js
4. Revisa el código fuente de las vistas en `src/views/`
5. La ruta `/ui-comparison` funciona solo con Bootstrap (ya instalado)

---

## Advertencias sobre conflictos

### Conflictos potenciales:

1. **Estilos CSS**: Diferentes librerías pueden tener estilos conflictivos
   - Solución: Cada demo está aislada en su propia ruta
   - Los estilos con `scoped` minimizan conflictos

2. **Tamaño del bundle**: Instalar todas las librerías aumenta significativamente el tamaño
   - Bundle sin librerías: ~500KB
   - Bundle con todas: ~3-4MB
   - Solución: En producción, usa solo una librería

3. **Componentes globales**: Algunas librerías registran componentes globalmente
   - Puede causar advertencias en consola
   - No afecta funcionalidad si los nombres no colisionan

---

## Recomendación para evaluación

### Para evaluadores del Bootcamp:

**Opción A - Instalación mínima (solo Bootstrap Icons):**
```bash
npm install bootstrap-icons
```
Agrega al `main.js`:
```javascript
import 'bootstrap-icons/font/bootstrap-icons.css'
```

Con esto funcionan:
- ✅ `/bootstrap-demo` (completo)
- ✅ `/ui-comparison` (completo)
- ⚠️ Otras demos: Verás el layout pero sin estilos específicos

**Opción B - Instalación completa:**
Sigue las instrucciones de "Opción 2" arriba para instalar todo.

**Opción C - Solo documentación:**
Revisa los archivos `.md` con toda la investigación y análisis.

---

## Verificación de instalación

Después de instalar cualquier librería, ejecuta:

```bash
npm run dev
```

Y navega a las rutas correspondientes:
- http://localhost:3001/bootstrap-demo
- http://localhost:3001/vuetify-demo
- http://localhost:3001/buefy-demo
- http://localhost:3001/element-demo
- http://localhost:3001/ui-comparison

Si ves errores en consola sobre componentes no encontrados, significa que falta instalar esa librería específica.

---

## Estructura sin dependencias adicionales

El proyecto **funciona perfectamente** sin instalar las librerías adicionales para:
- ✅ Login con Firebase
- ✅ Pokeguía principal (/home)
- ✅ Toda la funcionalidad de búsqueda de Pokémon
- ✅ Sistema de música
- ✅ Modal con detalles

Las demos de librerías UI son **adicionales** para cumplir con la Actividad 1 de comparación.

---

## Soporte

Si tienes problemas con la instalación:

1. Borra `node_modules` y `package-lock.json`
2. Ejecuta `npm install`
3. Instala solo la librería que quieras probar
4. Ejecuta `npm run dev`

Las vistas están diseñadas para **degradar gracefully** - si falta una dependencia, verás el contenido pero sin los estilos específicos de esa librería.
