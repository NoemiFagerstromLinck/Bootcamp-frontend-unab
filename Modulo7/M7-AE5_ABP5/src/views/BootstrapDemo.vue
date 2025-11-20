<template>
  <div class="bootstrap-pokeguia">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container-fluid">
        <span class="navbar-brand">
          Pokeguía - Bootstrap 5
        </span>
        <div class="d-flex gap-2">
          <router-link to="/home" class="btn btn-outline-light btn-sm">Home Original</router-link>
          <router-link to="/ui-comparison" class="btn btn-outline-light btn-sm">Comparación</router-link>
        </div>
      </div>
    </nav>

    <div class="container py-4">
      <div class="text-center mb-4">
        <h1 class="display-5">Pokeguía con Bootstrap 5</h1>
        <p class="text-muted">Misma funcionalidad, estilo Bootstrap</p>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-9 position-relative">
              <label for="searchInput" class="form-label">Buscar Pokémon</label>
              <input 
                id="searchInput"
                v-model.trim="query" 
                @keyup.enter="searchPokemon"
                @input="filterSuggestions"
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Ej: pikachu, charizard, bulbasaur..." 
              />
              <small class="form-text text-muted">Intenta con: pikachu, charizard, mewtwo</small>
              
              <div v-if="filteredSuggestions.length > 0 && query" class="list-group position-absolute w-100 shadow" style="z-index: 1000; max-height: 300px; overflow-y: auto;">
                <button 
                  v-for="suggestion in filteredSuggestions" 
                  :key="suggestion"
                  @click="selectSuggestion(suggestion)"
                  class="list-group-item list-group-item-action text-capitalize"
                  type="button"
                >
                  {{ suggestion }}
                </button>
              </div>
            </div>
            <div class="col-md-3 d-flex align-items-end">
              <button 
                class="btn btn-primary btn-lg w-100" 
                @click="searchPokemon"
                :disabled="!query || loading"
              >
                {{ loading ? 'Buscando...' : 'Buscar' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> {{ error }}
        <button type="button" class="btn-close" @click="error = ''" aria-label="Close"></button>
      </div>

      <div v-if="pokemon" class="row g-4">
        <div class="col-lg-4">
          <div class="card h-100 shadow" :style="cardStyle">
            <div class="card-body text-center">
              <img 
                :src="photoUrl" 
                :alt="pokemon.name" 
                class="img-fluid mb-3" 
                style="max-height: 200px"
              />
              <h2 class="card-title text-capitalize h3">{{ pokemon.name }}</h2>
              <p v-if="pokemonDescription" class="text-muted small">{{ pokemonDescription }}</p>
              <p class="card-text">
                <span class="badge bg-primary">ID: {{ pokemon.id }}</span>
                <span class="badge bg-success ms-2">Peso: {{ pokemon.weight / 10 }} kg</span>
                <span v-if="dominantType" class="badge ms-2 text-capitalize" :style="{ backgroundColor: dominantColor, color: '#fff' }">Tipo: {{ dominantType }}</span>
              </p>
              <p class="text-muted">Altura: {{ pokemon.height / 10 }} m</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card h-100 shadow">
            <div class="card-header bg-success text-white">
              <h3 class="h5 mb-0">Habilidades</h3>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="ability in abilities" :key="ability"
                  class="btn btn-sm ability-btn text-capitalize"
                  :class="{ 'btn-outline-success': !abilityDetails[ability], 'btn-success': abilityDetails[ability] }"
                  @click="toggleAbility(ability)"
                  :title="abilityDetails[ability]?.effect || 'Ver detalle'"
                >
                  <i class="bi bi-shield-fill"></i> {{ ability }}
                </button>
              </div>
              <div v-if="abilityLoading" class="mt-3 small text-muted">Cargando habilidad...</div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card h-100 shadow">
            <div class="card-header bg-info text-white">
              <h3 class="h5 mb-0">Movimientos</h3>
            </div>
            <div class="card-body">
              <div v-if="moveDetailsLoading" class="text-center py-3">
                <div class="spinner-border text-info" role="status"><span class="visually-hidden">Cargando...</span></div>
              </div>
              <div v-else style="max-height: 300px; overflow-y: auto">
                <ul class="list-group list-group-flush">
                  <li
                    v-for="detail in moveDetails"
                    :key="detail.name"
                    class="list-group-item small"
                  >
                    <div class="d-flex justify-content-between align-items-start">
                      <div class="d-flex align-items-center gap-2">
                        <span class="move-type-pill" :style="{ backgroundColor: typeColors[detail.type] || '#999' }">
                          <i :class="detail.damageClassIcon" class="me-1"></i>{{ detail.type }}
                        </span>
                        <strong class="text-capitalize">{{ detail.name }}</strong>
                      </div>
                      <button class="btn btn-sm btn-outline-secondary" @click="detail.show = !detail.show">
                        <i :class="detail.show ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                      </button>
                    </div>
                    <transition name="fade">
                      <div v-if="detail.show" class="mt-2 ps-2 border-start">
                        <div class="row g-2 small">
                          <div class="col-4"><span class="fw-semibold">Potencia:</span> {{ detail.power ?? '—' }}</div>
                          <div class="col-4"><span class="fw-semibold">Precisión:</span> {{ detail.accuracy ?? '—' }}</div>
                          <div class="col-4"><span class="fw-semibold">PP:</span> {{ detail.pp ?? '—' }}</div>
                          <div class="col-12"><em class="text-muted">{{ detail.effect }}</em></div>
                        </div>
                      </div>
                    </transition>
                  </li>
                </ul>
              </div>
              <small class="text-muted">Mostrando detalles de los primeros {{ moveDetails.length }} movimientos</small>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="text-center py-5">
        <p class="lead">Busca un Pokémon para comenzar</p>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3">Buscando Pokémon...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { pokemonData } from '../data/pokemon'

const TYPE_COLORS = {
  grass: '#78C850', fire: '#F08030', water: '#6890F0', electric: '#F8D030', ice: '#98D8D8', ground: '#E0C068',
  rock: '#B8A038', fairy: '#EE99AC', poison: '#A040A0', bug: '#A8B820', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', psychic: '#F85888', flying: '#A890F0', fighting: '#C03028', ghost: '#705898', normal: '#A8A878'
}

export default {
  name: 'BootstrapDemo',
  data() {
    return {
      query: 'pikachu',
      pokemon: null,
      loading: false,
      error: '',
      allPokemonNames: [],
      filteredSuggestions: [],
      dominantType: '',
      dominantColor: '#ffffff',
      moveDetailsLoading: false,
      moveDetails: [],
      abilityDetails: {},
      abilityLoading: false,
      pokemonDescription: '',
      typeColors: TYPE_COLORS
    }
  },
  computed: {
    photoUrl() {
      if (!this.pokemon) return ''
      return (
        this.pokemon?.sprites?.other?.['official-artwork']?.front_default ||
        this.pokemon?.sprites?.front_default ||
        ''
      )
    },
    abilities() {
      if (!this.pokemon) return []
      return this.pokemon.abilities.map(a => a.ability.name)
    },
    moves() {
      if (!this.pokemon) return []
      return this.pokemon.moves.map(m => m.move.name)
    },
    cardStyle() {
      return {
        border: `3px solid ${this.dominantColor}`,
        background: `linear-gradient(145deg, ${this.dominantColor}22, #ffffff)`
      }
    }
  },
  mounted() {
    this.allPokemonNames = pokemonData[0].pokemones.map(p => p.nombre)
  },
  created() {
    this.searchPokemon()
  },
  methods: {
    filterSuggestions() {
      if (!this.query || this.query.length < 1) {
        this.filteredSuggestions = []
        return
      }
      const searchTerm = this.query.toLowerCase()
      this.filteredSuggestions = this.allPokemonNames
        .filter(name => name.toLowerCase().includes(searchTerm))
        .slice(0, 10)
    },
    selectSuggestion(name) {
      this.query = name
      this.filteredSuggestions = []
      this.searchPokemon()
    },
    async searchPokemon() {
      if (!this.query) return
      
      this.filteredSuggestions = []
      
      this.loading = true
      this.error = ''
      
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(this.query.toLowerCase())}`
        const { data } = await axios.get(url)
        this.pokemon = data
        const type = data.types?.[0]?.type?.name || ''
        this.dominantType = type
        this.dominantColor = TYPE_COLORS[type] || '#666'
        this.fetchMoveDetails()
        this.fetchPokemonDescription()
      } catch (e) {
        this.pokemon = null
        this.error = `No se encontró el Pokémon "${this.query}". Verifica el nombre e intenta nuevamente.`
      } finally {
        this.loading = false
      }
    }
    ,
    async fetchMoveDetails() {
      if (!this.pokemon) return
      this.moveDetailsLoading = true
      this.moveDetails = []
      const firstMoves = this.pokemon.moves.slice(0, 10)
      try {
        const responses = await Promise.all(
          firstMoves.map(m => axios.get(m.move.url).catch(() => null))
        )
        this.moveDetails = responses.filter(r => r).map(r => {
          const mv = r.data
          return {
            name: mv.name,
            power: mv.power,
            accuracy: mv.accuracy,
            pp: mv.pp,
            type: mv.type?.name,
            damageClass: mv.damage_class?.name,
            damageClassIcon: mv.damage_class?.name === 'physical' ? 'bi bi-hand-index' : mv.damage_class?.name === 'special' ? 'bi bi-magic' : 'bi bi-shield',
            effect: (() => {
              const entries = mv.effect_entries || []
              const esEntry = entries.find(e => e.language.name === 'es')
              const enEntry = entries.find(e => e.language.name === 'en')
              const chosen = esEntry || enEntry || entries[0]
              return chosen ? (chosen.short_effect || chosen.effect || '').replace(/\n/g, ' ') : ''
            })(),
            show: false
          }
        })
      } finally {
        this.moveDetailsLoading = false
      }
    },
    async fetchPokemonDescription() {
      if (!this.pokemon) return
      try {
        const speciesUrl = this.pokemon.species?.url
        if (!speciesUrl) return
        const { data } = await axios.get(speciesUrl)
        const entries = data.flavor_text_entries || []
        const esEntry = entries.find(e => e.language.name === 'es')
        const enEntry = entries.find(e => e.language.name === 'en')
        const chosen = esEntry || enEntry || entries[0]
        this.pokemonDescription = chosen ? chosen.flavor_text.replace(/\n|\f/g, ' ') : ''
      } catch (e) {
      }
    },
    async toggleAbility(ability) {
      if (this.abilityDetails[ability]) {
        return
      }
      this.abilityLoading = true
      try {
        const abilObj = this.pokemon.abilities.find(a => a.ability.name === ability)
        if (!abilObj) return
        const { data } = await axios.get(abilObj.ability.url)
        const entries = data.effect_entries || []
        const esEntry = entries.find(e => e.language.name === 'es')
        const enEntry = entries.find(e => e.language.name === 'en')
        const chosen = esEntry || enEntry || entries[0]
        const effect = chosen ? (chosen.short_effect || chosen.effect || 'Sin descripción') : 'Sin descripción'
        this.abilityDetails[ability] = { effect }
      } catch (e) {
        this.abilityDetails[ability] = { effect: 'Error cargando detalle' }
      } finally {
        this.abilityLoading = false
      }
    }
  }
}
</script>

<style scoped>
.bootstrap-pokeguia {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding-bottom: 50px;
}

.card {
  border-radius: 12px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.list-group-item {
  border-left: none;
  border-right: none;
}

.list-group-item:first-child {
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}
</style>
