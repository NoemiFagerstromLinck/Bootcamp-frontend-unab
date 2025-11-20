# Actividad 2: Implementación Práctica con Nuxt.js

## Comparación: Proyecto Vue.js vs Proyecto Nuxt.js

Esta sección documenta cómo crear una aplicación similar usando Nuxt.js y las diferencias con el proyecto Vue.js actual.

---

## Tarea 1: Crear aplicación con Nuxt.js vs Vue.js

### Proyecto actual (Vue.js - CSR)

**Estructura:**
```
M7-AE5_ABP5/
├── src/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

**Características:**
- ✅ Cliente renderiza todo (CSR)
- ✅ Vite como bundler
- ✅ Router configurado manualmente
- ✅ Bundle JavaScript grande en carga inicial
- ❌ SEO limitado (contenido generado por JS)
- ❌ First paint lento (pantalla blanca)
- ✅ Hosting estático simple (Netlify, Vercel)

---

### Proyecto equivalente con Nuxt.js (SSR)

#### Paso 1: Crear proyecto Nuxt.js

```bash
# Opción 1: npx
npx nuxi@latest init nuxt-pokeguia

# Opción 2: pnpm (recomendado)
pnpm dlx nuxi@latest init nuxt-pokeguia

cd nuxt-pokeguia
npm install
```

#### Paso 2: Estructura del proyecto Nuxt

```
nuxt-pokeguia/
├── pages/
│   ├── index.vue                 # → / (ruta automática)
│   ├── login.vue                 # → /login
│   ├── bootstrap-demo.vue        # → /bootstrap-demo
│   ├── vuetify-demo.vue          # → /vuetify-demo
│   ├── buefy-demo.vue            # → /buefy-demo
│   └── element-demo.vue          # → /element-demo
├── components/
│   ├── PokemonCard.vue
│   └── PokemonList.vue
├── layouts/
│   └── default.vue               # Layout principal
├── public/
│   └── audio/
├── server/
│   └── api/                      # API routes (opcional)
├── nuxt.config.ts                # Configuración de Nuxt
└── package.json
```

**Diferencias clave:**
- ❌ No hay `router/index.js` - rutas automáticas basadas en `pages/`
- ❌ No hay `main.js` - Nuxt maneja la inicialización
- ❌ No hay `App.vue` - se usa `layouts/default.vue`
- ✅ Carpeta `server/` para API routes (backend integrado)
- ✅ Archivo `nuxt.config.ts` para toda la configuración

#### Paso 3: Configuración Nuxt (nuxt.config.ts)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Modo de renderizado
  ssr: true,  // true = SSR, false = SPA (como Vue.js)
  
  // Meta tags globales
  app: {
    head: {
      title: 'Pokeguía - Nuxt.js',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Aplicación de Pokémon con SSR usando Nuxt.js' 
        }
      ],
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' 
        }
      ]
    }
  },

  // CSS global
  css: ['~/assets/styles.css'],

  // Módulos de Nuxt
  modules: [],

  // Variables de entorno
  runtimeConfig: {
    // Privadas (solo servidor)
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    
    // Públicas (cliente y servidor)
    public: {
      apiBase: process.env.API_BASE_URL || 'https://pokeapi.co/api/v2'
    }
  }
})
```

#### Paso 4: Migrar componentes

**PokemonCard.vue** - Sin cambios, funciona igual:
```vue
<!-- components/PokemonCard.vue -->
<template>
  <div class="pokemon-card">
    <h3>{{ nombre }}</h3>
    <p>{{ descripcion }}</p>
  </div>
</template>

<script setup>
defineProps({
  nombre: String,
  descripcion: String
})
</script>
```

**Nota:** Los componentes en `components/` se auto-importan en Nuxt.

#### Paso 5: Convertir vistas a páginas

**Vue.js (src/views/Home.vue):**
```vue
<template>
  <div>
    <h1>Pokeguía</h1>
    <PokemonList :pokemons="pokemons" />
  </div>
</template>

<script>
import PokemonList from '@/components/PokemonList.vue'

export default {
  components: { PokemonList },
  data() {
    return { pokemons: [] }
  },
  created() {
    this.fetchPokemons()
  },
  methods: {
    async fetchPokemons() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await response.json()
      this.pokemons = data.results
    }
  }
}
</script>
```

**Nuxt.js (pages/index.vue):**
```vue
<template>
  <div>
    <h1>Pokeguía - Nuxt.js SSR</h1>
    <PokemonList :pokemons="pokemons" />
  </div>
</template>

<script setup>
// Data fetching en servidor (SSR)
const { data: pokemons } = await useFetch('https://pokeapi.co/api/v2/pokemon', {
  transform: (data) => data.results
})

// Meta tags dinámicos
useHead({
  title: 'Pokeguía - Inicio',
  meta: [
    { name: 'description', content: 'Explora la Pokédex de la región Hoenn' }
  ]
})
</script>
```

**Diferencias:**
- ✅ `useFetch()` ejecuta en servidor (SSR) - datos pre-renderizados
- ✅ `useHead()` para meta tags dinámicos (SEO)
- ✅ `<script setup>` - Composition API por defecto
- ✅ Auto-importación de componentes
- ❌ No necesitas `import` ni `components: {}`

---

## Tarea 2: Ventajas de Nuxt.js para SEO y Rendimiento

### Comparación práctica

#### 1. **First Contentful Paint (FCP)**

**Vue.js (CSR):**
```
1. Navegador carga index.html (casi vacío)
   <div id="app"></div>  <!-- Solo esto -->

2. Descarga bundle.js (500KB+)
3. JavaScript se ejecuta
4. Vue monta componentes
5. Usuario ve contenido

⏱️ Tiempo: ~2-4 segundos (conexión 3G)
```

**Nuxt.js (SSR):**
```
1. Navegador solicita página
2. Servidor ejecuta Vue y renderiza HTML completo
   <div id="__nuxt">
     <h1>Pokeguía</h1>
     <div class="pokemon-card">Pikachu</div>
     ... contenido completo ...
   </div>

3. Usuario ve contenido INMEDIATAMENTE
4. JavaScript se descarga en paralelo
5. Hidratación convierte página en interactiva

⏱️ Tiempo: ~0.5-1 segundo (conexión 3G)
```

#### 2. **SEO - Indexación por buscadores**

**Vue.js (CSR):**
```html
<!-- Lo que ve Google inicialmente -->
<!DOCTYPE html>
<html>
  <head>
    <title>Pokeguía</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/assets/index-abc123.js"></script>
  </body>
</html>
```
❌ Googlebot debe ejecutar JavaScript (no garantizado)
❌ Meta tags dinámicos difíciles de implementar
❌ Open Graph no funciona bien

**Nuxt.js (SSR):**
```html
<!-- Lo que ve Google -->
<!DOCTYPE html>
<html>
  <head>
    <title>Pikachu - Pokeguía</title>
    <meta name="description" content="Pikachu es un Pokémon tipo eléctrico...">
    <meta property="og:title" content="Pikachu - Pokeguía">
    <meta property="og:image" content="https://ejemplo.com/pikachu.png">
  </head>
  <body>
    <div id="__nuxt">
      <h1>Pikachu</h1>
      <img src="/pikachu.png" alt="Pikachu">
      <p>Pikachu es un Pokémon tipo eléctrico...</p>
    </div>
    <script>/* Hydration code */</script>
  </body>
</html>
```
✅ HTML completo para bots
✅ Meta tags dinámicos por página
✅ Open Graph perfecto para redes sociales
✅ Indexación garantizada

#### 3. **Performance Metrics**

| Métrica | Vue.js (CSR) | Nuxt.js (SSR) |
|---------|--------------|---------------|
| **First Paint** | 2-4s | 0.5-1s |
| **Time to Interactive** | 3-5s | 2-3s |
| **SEO Score** | 60-70 | 90-100 |
| **Lighthouse Performance** | 70-80 | 85-95 |
| **Initial Bundle Size** | 500KB+ | 200KB (HTML + datos) |

---

## Tarea 3: Funcionalidad dinámica con Nuxt.js

### Implementación de fetch de datos desde API

#### Página con parámetro dinámico

**pages/pokemon/[id].vue** (Ruta: `/pokemon/25` para Pikachu)

```vue
<template>
  <div class="pokemon-detail" v-if="pokemon">
    <h1>{{ pokemon.name }}</h1>
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    
    <h2>Estadísticas</h2>
    <ul>
      <li v-for="stat in pokemon.stats" :key="stat.stat.name">
        {{ stat.stat.name }}: {{ stat.base_stat }}
      </li>
    </ul>

    <h2>Habilidades</h2>
    <ul>
      <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
        {{ ability.ability.name }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Cargando Pokémon...</p>
  </div>
</template>

<script setup>
// Obtener parámetro de ruta
const route = useRoute()
const pokemonId = route.params.id

// Fetch de datos (ejecuta en servidor para SSR)
const { data: pokemon, error } = await useFetch(
  `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
)

// Manejo de errores
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Pokémon no encontrado'
  })
}

// Meta tags dinámicos basados en datos
useHead({
  title: `${pokemon.value?.name} - Pokeguía`,
  meta: [
    {
      name: 'description',
      content: `Información sobre ${pokemon.value?.name}, incluyendo estadísticas y habilidades.`
    },
    {
      property: 'og:title',
      content: `${pokemon.value?.name} - Pokeguía`
    },
    {
      property: 'og:image',
      content: pokemon.value?.sprites.front_default
    }
  ]
})
</script>

<style scoped>
.pokemon-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
```

#### Página con listado y búsqueda

**pages/search.vue**

```vue
<template>
  <div class="search-page">
    <h1>Buscar Pokémon</h1>
    
    <input 
      v-model="searchQuery"
      type="text"
      placeholder="Busca un Pokémon..."
      @input="handleSearch"
    >

    <div v-if="pending">Buscando...</div>
    
    <div v-else-if="results" class="results">
      <PokemonCard 
        v-for="pokemon in results" 
        :key="pokemon.name"
        :nombre="pokemon.name"
        :descripcion="`Pokémon #${pokemon.id}`"
      />
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')

// useLazyFetch para búsqueda sin bloquear renderizado inicial
const { data: results, pending, execute } = useLazyFetch(
  () => `https://pokeapi.co/api/v2/pokemon?limit=100`,
  {
    transform: (data) => {
      // Filtrar resultados en cliente después del fetch
      return data.results.filter(p => 
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    },
    immediate: false  // No ejecutar automáticamente
  }
)

// Debounce para búsqueda
let searchTimeout
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    execute()
  }, 300)
}
</script>
```

### Sistema de rutas de Nuxt

**Automático basado en archivos:**

```
pages/
├── index.vue                    → /
├── about.vue                    → /about
├── bootstrap-demo.vue           → /bootstrap-demo
├── pokemon/
│   ├── index.vue               → /pokemon
│   ├── [id].vue                → /pokemon/:id (dinámico)
│   └── [name]/
│       └── evolution.vue       → /pokemon/:name/evolution
└── blog/
    ├── index.vue               → /blog
    └── [...slug].vue           → /blog/* (catch-all)
```

**Navegación entre páginas:**

```vue
<template>
  <!-- NuxtLink para navegación SPA -->
  <NuxtLink to="/pokemon/25">Ver Pikachu</NuxtLink>
  <NuxtLink :to="`/pokemon/${pokemonId}`">Ver Pokémon</NuxtLink>
  
  <!-- Navegación programática -->
  <button @click="goToPokemon(25)">Ir a Pikachu</button>
</template>

<script setup>
const router = useRouter()

const goToPokemon = (id) => {
  router.push(`/pokemon/${id}`)
}
</script>
```

---

## Comparación final: Vue.js vs Nuxt.js

### Vue.js (Proyecto actual)

**✅ Pros:**
- Configuración simple
- Desarrollo rápido
- Hosting estático (barato)
- Perfecto para apps privadas (dashboard)

**❌ Contras:**
- SEO limitado
- First paint lento
- Meta tags dinámicos complejos
- No ideal para contenido público

**Comandos:**
```bash
npm run dev      # Desarrollo
npm run build    # Build estático
npm run preview  # Preview del build
```

**Hosting:** Netlify, Vercel, GitHub Pages (estático)

---

### Nuxt.js (SSR)

**✅ Pros:**
- Excelente SEO
- First paint rápido
- Meta tags fáciles
- Routing automático
- Ideal para contenido público

**❌ Contras:**
- Mayor complejidad
- Requiere servidor Node.js
- Hosting más caro
- Curva de aprendizaje

**Comandos:**
```bash
npm run dev        # Desarrollo con SSR
npm run build      # Build para producción
npm run preview    # Preview del build SSR
node .output/server/index.mjs  # Producción
```

**Hosting:** Vercel, Netlify (con funciones), Heroku, DigitalOcean

---

## Migración del proyecto actual a Nuxt

### Pasos para migrar

1. **Crear proyecto Nuxt:**
```bash
npx nuxi@latest init nuxt-pokeguia
cd nuxt-pokeguia
npm install
```

2. **Instalar dependencias:**
```bash
npm install axios firebase
```

3. **Copiar y adaptar:**
- `src/views/*.vue` → `pages/*.vue`
- `src/components/*.vue` → `components/*.vue` (sin cambios)
- `src/data/*.js` → `data/*.js` (sin cambios)
- `src/style.css` → `assets/styles.css`

4. **Configurar Firebase:**
```typescript
// plugins/firebase.client.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    // ... resto de config
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  return {
    provide: {
      firebase: app,
      auth
    }
  }
})
```

5. **Middleware de autenticación:**
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp()
  
  if (!$auth.currentUser && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

---

## Conclusión de la Actividad 2

### ¿Cuándo usar cada uno?

**Usa Vue.js (SPA) para:**
- Dashboards internos
- Admin panels
- Apps detrás de login
- Proyectos pequeños

**Usa Nuxt.js (SSR) para:**
- Blogs y contenido público
- E-commerce
- Landing pages
- Apps donde SEO es crítico
- **Esta Pokeguía** (contenido público + SEO)

### Aprendizajes clave

1. **SSR mejora SEO**: HTML completo para bots
2. **FCP más rápido**: Usuarios ven contenido inmediatamente
3. **Mayor complejidad**: Requiere aprender nuevas APIs
4. **Routing automático**: Basado en estructura de archivos
5. **Meta tags dinámicos**: Fácil con `useHead()`
6. **Fetch en servidor**: `useFetch()` ejecuta en SSR

---

## Recursos para profundizar

- **Documentación oficial de Nuxt 3**: https://nuxt.com/
- **Nuxt Modules**: https://nuxt.com/modules
- **Deployment en Vercel**: https://vercel.com/docs/frameworks/nuxt
- **SSR vs SSG vs SPA**: https://www.patterns.dev/posts/rendering-patterns/
