import { createApp } from 'vue'
createApp({
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
      <h2>Ejercicio 1 - Lista de Personajes</h2>
      <ul>
        <li v-for="p in personajes" :key="p.id">
          <strong>{{ p.nombre }}</strong>: {{ p.descripcion }}
        </li>
      </ul>
    </section>
  `
}).mount('#ejercicio_1')
