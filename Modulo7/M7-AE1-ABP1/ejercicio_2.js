import { createApp } from 'vue'
const PersonajeCard = {
  name: 'PersonajeCard',
  props: {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
  },
  template: `
    <article style="border:1px solid #ccc; border-radius:8px; padding:12px; margin-bottom:8px;">
      <header style="display:flex; align-items:center; gap:8px;">
        <span style="font-weight:bold; color:#b00;">#{{ id }}</span>
        <h4 style="margin:0; text-transform:capitalize;">{{ nombre }}</h4>
      </header>
      <p style="margin:6px 0 0 0;">{{ descripcion }}</p>
    </article>
  `
}

const PersonajeList = {
  name: 'PersonajeList',
  components: { PersonajeCard },
  props: {
    personajes: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  template: `
    <section>
      <h3 style="margin-bottom:10px;">Listado de Personajes ({{ personajes.length }})</h3>
      <PersonajeCard
        v-for="p in personajes"
        :key="p.id"
        :id="p.id"
        :nombre="p.nombre"
        :descripcion="p.descripcion"
      />
    </section>
  `
}

createApp({
  components: { PersonajeList },
  data() {
    return {
      personajes: [
        { id: '1', nombre: 'pikachu', descripcion: 'lorem ipsum uhiuhiuhihoi' },
        { id: '2', nombre: 'kakuna', descripcion: 'lorem ipsum uhiuhiuhihoi' },
        { id: '3', nombre: 'beedrill', descripcion: 'lorem ipsum uhiuhiuhihoi' },
        { id: '4', nombre: 'metapod', descripcion: 'lorem ipsum uhiuhiuhihoi' },
        { id: '5', nombre: 'rattata', descripcion: 'lorem ipsum uhiuhiuhihoi' }
      ]
    }
  },
  template: `
    <section>
      <h2>Ejercicio 2 - Componentes Reutilizables con Props</h2>
      <PersonajeList :personajes="personajes" />
    </section>
  `
}).mount('#ejercicio_2')
