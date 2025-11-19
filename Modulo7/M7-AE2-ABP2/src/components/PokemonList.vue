<template>
  <div class="pokemon-list-container">
    <div class="row">
      <div class="col-12 mb-3">
        <h5 style="color: #FFFFFF; font-weight: bold; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9); font-family: 'Courier New', monospace; -webkit-font-smoothing: antialiased;">
          <span class="me-2" style="background: #DC143C; padding: 2px 8px; border-radius: 4px; border: 1px solid #FFD700;">DATA</span>
          Mostrando {{ pokemonList.length }} 
          {{ pokemonList.length === 1 ? 'Pokémon' : 'Pokémon' }}
          {{ searchTerm ? `para "${searchTerm}"` : 'de la región Hoenn' }}
        </h5>
      </div>
    </div>
    
    <div class="row">
      <div 
        v-for="pokemon in pokemonList" 
        :key="pokemon.id"
        class="col-lg-6 col-md-6 col-sm-12 mb-3"
      >
        <PokemonCard
          :id="pokemon.id"
          :nombre="pokemon.nombre"
          :descripcion="pokemon.descripcion"
          @pokemon-selected="handlePokemonSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue'

export default {
  name: 'PokemonList',
  components: {
    PokemonCard
  },
  props: {
    pokemonList: {
      type: Array,
      required: true,
      default: () => []
    },
    searchTerm: {
      type: String,
      default: ''
    }
  },
  methods: {
    handlePokemonSelected(pokemon) {
      this.$emit('pokemon-selected', pokemon)
    }
  }
}
</script>

<style scoped>
</style>
