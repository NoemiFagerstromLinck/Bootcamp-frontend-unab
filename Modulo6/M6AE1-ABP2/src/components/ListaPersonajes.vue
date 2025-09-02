<template>
  <div>
    <h2>Lista de Personajes</h2>
    <ul>
      <li v-for="personaje in personajes" :key="personaje.id" class="personaje-item">
        <img :src="personaje.foto" :alt="personaje.nombre" class="personaje-foto" />
        <div class="personaje-info">
          <strong>{{ personaje.nombre }}</strong>: {{ personaje.descripcion }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListaPersonajes',
  data() {
    return {
      personajes: [
        { id: '1', nombre: 'Pikachu', descripcion: 'Cuando se encuentra con algo nuevo, lo sacude con electricidad. A veces se electrocuta a sí mismo por accidente.', foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
        { id: '2', nombre: 'Kakuna', descripcion: 'Casi incapaz de moverse, este Pokémon sólo puede endurecer su caparazón para protegerse de los depredadores.', foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png' },
        { id: '3', nombre: 'Beedrill', descripcion: 'Vuela a gran velocidad y ataca usando los aguijones venenosos de sus patas y su cola.', foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png' },
        { id: '4', nombre: 'Metapod', descripcion: 'Este Pokémon es vulnerable al ataque mientras su caparazón es blando, por lo que permanece quieto hasta que se endurece.', foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png' },
        { id: '5', nombre: 'Rattata', descripcion: 'Rattata es cauteloso y se agrupa en grandes colonias. Su mordida puede atravesar hasta madera dura.', foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png' }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
.personaje-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.personaje-foto {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 16px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}
.personaje-info {
  flex: 1;
  color: #111;
}
</style>
