import { createApp } from 'vue'
createApp({
  data() {
    return {
      personajes: [
        { id: '1', nombre: 'pikachu', descripcion: 'Almacena electricidad en las bolsas de sus mejillas. Las descarga cuando está en peligro.' },
        { id: '2', nombre: 'kakuna', descripcion: 'Permanece casi inmóvil. Se endurece preparándose para la evolución.' },
        { id: '3', nombre: 'beedrill', descripcion: 'Vuela a gran velocidad. Lucha con los aguijones venenosos de sus brazos.' },
        { id: '4', nombre: 'metapod', descripcion: 'Su caparazón es duro como el hierro. Apenas puede moverse.' },
        { id: '5', nombre: 'rattata', descripcion: 'Vive donde sea. Es muy cauto y huye al menor ruido.' }
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
