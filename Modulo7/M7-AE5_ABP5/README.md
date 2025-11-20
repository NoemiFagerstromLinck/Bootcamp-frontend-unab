# Pokeguía - Proyecto Completo Vue.js

## Módulo 7 - Actividades Evaluativas

Este proyecto integra múltiples actividades del Módulo 7:
- **M7-AE1-ABP1**: Buscador de Pokémon con Vue.js
- **M7-AE2-ABP2**: Autenticación con Firebase
- **M7-AE5-ABP5**: Exploración de Librerías UI y SSR

---

# Pokeguía + Autenticación (M7-AE2-ABP2)

Esta entrega agrega una Pokeguía que consume la PokéAPI con axios y un flujo de autenticación con Firebase + vue-router:

- Búsqueda por nombre usando `https://pokeapi.co/api/v2/pokemon/<nombre>`.
- Carga automática de Pikachu al abrir (hook `created`).
- Computed para foto, movimientos y habilidades.
- Login/Register con Firebase (correo y contraseña).
- Rutas con `vue-router`, redirecciones a Login (`/` y rutas no existentes) y guard de autenticación.

## Rutas
- `/login`: formulario de acceso/registro.
- `/home`: Pokeguía (protegida; requiere estar autenticado).
- `/` y cualquier otra ruta inválida redirigen a `/login`.

## Configuración de Firebase
1) Habilita el proveedor Email/Password en Firebase Authentication.
2) Crea una app Web en tu proyecto Firebase y copia su configuración.
3) Crea el archivo `.env.local` en la raíz del proyecto con estas variables:

```
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

4) Ejecuta la app y verifica en consola el mensaje "[Firebase] Inicializado".

## Scripts útiles
```bash
npm install
npm run dev
```

La aplicación corre en `http://localhost:3000/`.

---

# Buscador de Pokémon - Región Hoenn

Una aplicación web desarrollada en Vue.js para buscar Pokémon de la región Hoenn (Ruby/Sapphire/Emerald).

## Cumplimiento de Requerimientos del Trabajo (M7-AE1-ABP1)

### Requerimientos Obligatorios

**Utilizar Vue y sus directivas**
- Se usan directivas: `v-for`, `v-if`, `v-model`, `@click`, `@input`, `@change`, `@error`, `:class`, `:style`, etc.

**Crear estructura Vue y componentes**
- **App.vue**: Componente principal que maneja el estado global
- **PokemonList.vue**: Componente que recibe array de Pokémon por props
- **PokemonCard.vue**: Componente reutilizable que muestra cada Pokémon individual

**Usar arreglo que recorra (nombre, descripción)**
- El arreglo `pokemonData` contiene objetos con: `id`, `nombre`, y `descripcion`
- Se recorre con `v-for` en PokemonList.vue
- Ejemplo de datos:
```javascript
{
   "id": "252",
   "nombre": "treecko",
   "descripcion": "Pokémon lagarto con ganchos en sus patas que le permiten trepar paredes verticales."
}
```

**Crear mínimo 2 componentes y pasar datos por props**
- **PokemonList.vue** recibe props:
   - `pokemonList` (Array): Lista de Pokémon a mostrar
   - `searchTerm` (String): Término de búsqueda actual
- **PokemonCard.vue** recibe props:
   - `id` (String): ID del Pokémon
   - `nombre` (String): Nombre del Pokémon
   - `descripcion` (String): Descripción del Pokémon

**Datos en objeto "data" y template con datos dinámicos**
- App.vue tiene `data()` con: `pokemonList`, `searchTerm`, `hasError`, etc.
- El template usa interpolación `{{ }}` y v-bind `:` para mostrar datos dinámicamente

### Estructura de Componentes

```
App.vue (Componente Padre)
   ├── data: pokemonList, searchTerm, filteredPokemon
   └── PokemonList.vue (Componente Hijo 1)
         ├── props: pokemonList, searchTerm
         └── PokemonCard.vue (Componente Hijo 2)
               └── props: id, nombre, descripcion
```

## Características

- **Búsqueda de Pokémon**: Encuentra Pokémon por nombre con búsqueda en tiempo real
- **Validación de formularios**: Validación completa del input de búsqueda
- **Diseño responsive**: Interfaz adaptada con Bootstrap 5
- **Datos de Hoenn**: Incluye todos los 135 Pokémon de la 3ª generación + clásicos
- **Manejo de errores**: Mensajes informativos cuando no se encuentran resultados
- **Reproductor de música**: Sistema de audio con temas de Pokémon Ruby
- **Estilo auténtico**: Colores, efectos y tipografía del Game Boy Advance

## Tecnologías utilizadas

- **Vue.js 3**: Framework principal
- **Bootstrap 5**: Estilos y componentes UI
- **Vite**: Herramienta de desarrollo y construcción
- **HTML5/CSS3**: Estructura y estilos personalizados

## Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001/`

## Requerimientos cumplidos

**Proyecto Vue.js**: Aplicación completa en Vue.js 3
**Input de búsqueda**: Campo para buscar Pokémon por nombre
**Lista de Pokémon**: Muestra todos los Pokémon de la región Hoenn
**Métodos de validación**: Validación completa del formulario de búsqueda
**Bootstrap**: Diseño responsive con Bootstrap 5
**Mensaje de error**: "El pokemon que desea buscar no existe"
**Datos de Hoenn**: Pokémon de Ruby/Sapphire/Emerald (GBA)

## Pokémon incluidos

La aplicación incluye **152 Pokémon** en total:
- **Clásicos**: Bulbasaur, Charmander, Squirtle, Pikachu, Mewtwo, Mew
- **Populares Kanto**: Jigglypuff, Psyduck, Cubone, Chansey, Lapras, Ditto, Eevee
- **Aves legendarias**: Articuno, Zapdos, Moltres
- **Hoenn completo**: Treecko, Torchic, Mudkip y sus evoluciones
- **Legendarios Hoenn**: Rayquaza, Kyogre, Groudon, Latias, Latios, Jirachi, Deoxys
- **Región completa**: Desde Poochyena (#261) hasta Deoxys (#386)

## Sistema de música

- **Reproductor integrado**: Controles para play/pause
- **4 temas disponibles**: Littleroot Town, Route 101, Petalburg City, Oldale Town
- **Selección de pistas**: Menú desplegable para cambiar entre temas
- **Notificaciones visuales**: Alerts estilo Ruby al cambiar música
- **Loop infinito**: La música se repite automáticamente
- **Fallback inteligente**: Audio sintético 8-bit si no hay archivos

### Para activar la música:

1. **Opción fácil**: Abre `audio-generator.html` en tu navegador
2. **Genera archivos**: Haz clic en cada botón para descargar los WAV
3. **Coloca archivos**: Mueve los archivos a `/public/audio/`
4. **Nombres correctos**: 
   - `littleroot-town.wav`
   - `route101-town.wav`
   - `petalburg-town.wav`
   - `oldale-town.wav`

### Sin archivos de audio:
- El reproductor funciona con **audio sintético 8-bit**
- **Notificaciones visuales** indican qué tema está "sonando"
- **Experiencia completa** sin necesidad de archivos externos

## Funciones de búsqueda

- **Búsqueda en tiempo real**: Los resultados se filtran mientras escribes
- **Búsqueda parcial**: Encuentra Pokémon escribiendo parte del nombre
- **Validaciones incluidas**:
  - Solo letras y espacios permitidos
  - Mínimo 2 caracteres
  - Máximo 20 caracteres
  - Mensaje de error si no se encuentran resultados

## Modal Pokédex

- **Click en cualquier Pokémon**: Abre modal con información detallada
- **Información completa**: Tipo, altura, peso, categoría, habilidades
- **Descripción de la Pokédex**: Texto descriptivo de cada Pokémon
- **Estadísticas visuales**: Barras de progreso para HP, Ataque, Defensa, Velocidad
- **Badges de tipos**: Colores auténticos para cada tipo de Pokémon
- **Controles intuitivos**: Cerrar con X, Escape, o clic fuera del modal
- **Diseño responsive**: Funciona perfectamente en móviles

## Diseño

- **Interfaz moderna**: Gradientes y animaciones sutiles
- **Tarjetas interactivas**: Efectos hover en las tarjetas de Pokémon
- **Responsive**: Funciona en móviles, tablets y escritorio
- **Tema Hoenn**: Colores inspirados en los juegos Ruby/Sapphire/Emerald

## Uso

1. Ingresa el nombre de un Pokémon en el campo de búsqueda
2. Los resultados se filtrarán automáticamente
3. Si no encuentra coincidencias, aparecerá un mensaje informativo
4. Usa el botón "Mostrar todos los Pokémon" para limpiar la búsqueda

## Estructura del proyecto

```
src/
├── App.vue           # Componente principal
├── main.js          # Punto de entrada de la aplicación
├── style.css        # Estilos personalizados
├── components/
│   ├── PokemonList.vue    # Componente que renderiza lista de Pokémon
│   ├── PokemonCard.vue    # Componente tarjeta individual (recibe props)
│   └── MusicPlayer.js     # Lógica del reproductor de música
└── data/
      ├── pokemon.js         # Datos de Pokémon (id, nombre, descripcion)
      ├── pokemonDetails.js  # Detalles completos para el modal
      └── pokemonImages.js   # Funciones para manejar imágenes
```

### Flujo de Props

```
App.vue
   | (pasa filteredPokemon y searchTerm como props)
   ↓
PokemonList.vue
   | (recibe pokemonList[] y renderiza múltiples cards)
   | (pasa id, nombre, descripcion como props a cada card)
   ↓
PokemonCard.vue
   | (recibe props individuales de cada Pokémon)
   | (emite evento 'pokemon-selected' al hacer click)
   ↓
App.vue (maneja el evento y abre modal)
```


**Desarrollado para el Bootcamp Frontend UNAB - Módulo 7**

---

## M7-AE5-ABP5: Exploración de Librerías UI y SSR

### Actividad 1: Comparación de Librerías UI para Vue.js

Este proyecto incluye implementaciones completas de la misma interfaz usando cuatro librerías UI diferentes:

#### Librerías implementadas:
1. **BootstrapVue** - `/bootstrap-demo`
2. **Vuetify** - `/vuetify-demo`
3. **Buefy** - `/buefy-demo`
4. **Element UI (Element Plus)** - `/element-demo`

#### Comparación visual:
- **Ruta de comparación**: `/ui-comparison`
- Tabla comparativa con ratings
- Evaluación de ventajas y desventajas
- Recomendaciones por tipo de proyecto

#### Documentación completa:
- `ACTIVIDAD1_INVESTIGACION.md` - Análisis teórico de las 4 librerías
- Comparación de características, ventajas y desventajas
- Casos de uso ideales para cada librería
- Tabla comparativa de métricas clave

#### Vistas implementadas:
Cada demo incluye:
- ✅ Navbar con navegación
- ✅ Cards informativas con iconos
- ✅ Formulario de registro con validación
- ✅ Tabla de datos con CRUD
- ✅ Modales/Dialogs
- ✅ Sistema de alertas/notificaciones
- ✅ Diseño responsive

### Actividad 2: Server Side Rendering con Nuxt.js

#### Investigación teórica:
- `ACTIVIDAD2_INVESTIGACION_SSR.md` - Documentación completa sobre SSR
- ¿Qué es Server Side Rendering?
- CSR vs SSR - Comparación detallada
- Ventajas y desventajas de SSR
- ¿Cuándo usar SSR?
- Introducción a Nuxt.js y Quasar Framework

#### Implementación práctica:
- `ACTIVIDAD2_IMPLEMENTACION_NUXT.md` - Guía de implementación
- Comparación Vue.js (proyecto actual) vs Nuxt.js
- Estructura de proyecto Nuxt
- Migración de componentes y vistas
- Data fetching con `useFetch()`
- Sistema de rutas automático
- Meta tags dinámicos para SEO

#### Contenido de la documentación:
- ✅ Comparación CSR vs SSR con ejemplos de código
- ✅ Ventajas de Nuxt.js para SEO y performance
- ✅ Implementación de fetch desde API
- ✅ Rutas dinámicas con parámetros
- ✅ Guía completa de migración del proyecto actual
- ✅ Comparación de métricas de rendimiento

### Estructura de archivos del proyecto

```
M7-AE5_ABP5/
├── ACTIVIDAD1_INVESTIGACION.md          # Análisis de librerías UI
├── ACTIVIDAD2_INVESTIGACION_SSR.md      # Teoría sobre SSR
├── ACTIVIDAD2_IMPLEMENTACION_NUXT.md    # Guía práctica Nuxt.js
├── src/
│   ├── views/
│   │   ├── Home.vue              # Pokeguía original
│   │   ├── Login.vue             # Autenticación Firebase
│   │   ├── BootstrapDemo.vue     # Demo con Bootstrap 5
│   │   ├── VuetifyDemo.vue       # Demo con Vuetify
│   │   ├── BuefyDemo.vue         # Demo con Buefy
│   │   ├── ElementDemo.vue       # Demo con Element Plus
│   │   └── UIComparison.vue      # Comparación visual
│   └── router/
│       └── index.js              # Rutas actualizadas
└── README.md                     # Este archivo
```

### Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Redirección a login |
| `/login` | Autenticación con Firebase |
| `/home` | Pokeguía principal (protegida) |
| `/bootstrap-demo` | Interfaz con Bootstrap 5 |
| `/vuetify-demo` | Interfaz con Vuetify (Material Design) |
| `/buefy-demo` | Interfaz con Buefy (Bulma) |
| `/element-demo` | Interfaz con Element Plus |
| `/ui-comparison` | Comparación de las 4 librerías |

### Conclusiones de las actividades

#### Actividad 1 - Librerías UI:
- **BootstrapVue**: Ideal para prototipos rápidos y equipos con experiencia en Bootstrap
- **Vuetify**: Mejor opción para aplicaciones empresariales complejas con Material Design
- **Buefy**: Excelente para proyectos pequeños donde el peso del bundle es crítico
- **Element UI**: Perfecto para sistemas administrativos con formularios complejos

**Recomendación para este proyecto**: Vuetify, por su diseño moderno y componentes avanzados ideales para una Pokeguía.

#### Actividad 2 - SSR con Nuxt.js:
- **SSR mejora significativamente el SEO** con HTML pre-renderizado
- **First Contentful Paint hasta 4x más rápido** que CSR
- **Nuxt.js simplifica el desarrollo** con routing automático y data fetching integrado
- **Ideal para contenido público** como esta Pokeguía

**Casos de uso recomendados para SSR**:
- ✅ Blogs y sitios de contenido
- ✅ E-commerce (páginas de productos)
- ✅ Landing pages de marketing
- ✅ Esta Pokeguía (contenido público + SEO importante)

---

## Notas del Desarrollo

- **152 Pokémon** con nombre y descripción
- **Componentes reutilizables** con props bien definidas
- **Comunicación entre componentes** mediante props y eventos
- **Validación de datos** en formularios de búsqueda
- **Responsive design** con Bootstrap 5
- **Modal con información detallada** usando pokemonDetails.js
- **Sistema de imágenes con fallback** para sprites faltantes