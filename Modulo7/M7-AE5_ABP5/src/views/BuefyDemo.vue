<template>
  <div class="buefy-pokeguia">
    <b-navbar type="is-danger" wrapper-class="container">
      <template #brand>
        <b-navbar-item tag="div">
          <span class="icon-text">
            <span class="icon"><i class="bi bi-circle-fill"></i></span>
            <span><strong>Pokeguía - Buefy Demo</strong></span>
          </span>
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" to="/ui-comparison">
          <b-button type="is-light" icon-left="bi-arrow-left">
            Volver
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8-desktop is-10-tablet">
            <b-box>
              <div class="has-text-centered mb-5">
                <h1 class="title is-3">
                  <span class="icon-text">
                    <span class="icon"><i class="bi bi-search"></i></span>
                    <span>Buscador de Pokémon</span>
                  </span>
                </h1>
              </div>

              <b-field label="Buscar Pokémon" label-position="on-border">
                <b-autocomplete
                  v-model="query"
                  :data="getFilteredPokemon(query)"
                  placeholder="Ejemplo: pikachu, charizard..."
                  icon="bi-controller"
                  @keyup.enter="searchPokemon"
                  @select="option => { query = option; searchPokemon() }"
                  size="is-medium"
                  open-on-focus
                ></b-autocomplete>
              </b-field>

              <div class="has-text-centered mt-4">
                <b-button
                  type="is-danger"
                  size="is-medium"
                  icon-left="bi-circle-fill"
                  @click="searchPokemon"
                  :loading="loading"
                >
                  Buscar
                </b-button>
              </div>

              <b-message v-if="!pokemon && !loading" type="is-info" class="mt-5">
                <p class="mb-3"><strong>💡 Sugerencias:</strong></p>
                <b-taglist>
                  <b-tag
                    v-for="suggestion in suggestions"
                    :key="suggestion"
                    type="is-danger"
                    size="is-medium"
                    rounded
                    clickable
                    @click="query = suggestion; searchPokemon()"
                  >
                    {{ suggestion }}
                  </b-tag>
                </b-taglist>
              </b-message>
            </b-box>
          </div>
        </div>

        <div v-if="pokemon" class="columns is-centered mt-5">
          <div class="column is-8-desktop is-10-tablet">
            <b-box :style="boxStyle" class="has-background-light">
              <div class="has-text-centered mb-4">
                <h2 class="title is-4">
                  <span class="icon-text">
                    <span class="icon has-text-warning"><i class="bi bi-star-fill"></i></span>
                    <span>{{ pokemon.name.toUpperCase() }}</span>
                  </span>
                  <b-tag type="is-danger" class="ml-2">#{{ pokemon.id }}</b-tag>
                  <b-tag v-if="dominantType" :style="{ backgroundColor: dominantColor, color: '#fff' }" class="ml-2 is-capitalized">{{ dominantType }}</b-tag>
                </h2>
              </div>

              <div class="has-text-centered mb-5">
                <figure class="image is-inline-block" style="width: 200px;">
                  <img :src="photoUrl" :alt="pokemon.name">
                </figure>
              </div>

              <hr>

              <div class="mb-5">
                <p class="title is-6 mb-3">
                  <span class="icon-text">
                    <span class="icon has-text-primary"><i class="bi bi-shield-fill"></i></span>
                    <span>Habilidades</span>
                  </span>
                </p>
                <div class="tags">
                  <b-tooltip
                    v-for="ability in abilities"
                    :key="ability"
                    :label="abilityDetails[ability]?.effect || 'Click para cargar efecto'"
                    position="is-top"
                  >
                    <b-tag
                      @click="fetchAbilityDetail(ability)"
                      type="is-primary"
                      size="is-medium"
                      class="is-clickable is-capitalized"
                      :outlined="!abilityDetails[ability]"
                    >
                      <i class="bi bi-shield-fill me-1"></i>{{ ability }}
                    </b-tag>
                  </b-tooltip>
                </div>
                <p v-if="abilityLoading" class="is-size-7 has-text-grey mt-2">Cargando habilidad...</p>
              </div>

              <hr>

              <div>
                <p class="title is-6 mb-3">
                  <span class="icon-text">
                    <span class="icon has-text-warning"><i class="bi bi-lightning-fill"></i></span>
                    <span>Movimientos (primeros 10)</span>
                  </span>
                </p>
                <div v-if="moveDetailsLoading" class="has-text-centered py-4">
                  <b-icon icon="spinner" custom-class="fa-spin" size="is-large"></b-icon>
                </div>
                <div v-else class="content" style="max-height:300px; overflow-y:auto;">
                  <ul>
                    <li v-for="detail in moveDetails" :key="detail.name" class="mb-3">
                      <div class="is-flex is-align-items-center is-justify-content-space-between">
                        <span class="tag is-rounded is-capitalized" :style="{ backgroundColor: BTYPE_COLORS[detail.type] || '#888', color: '#fff' }">
                          <i :class="detail.damageClass === 'physical' ? 'bi bi-hand-index' : detail.damageClass === 'special' ? 'bi bi-magic' : 'bi bi-shield'" class="mr-1"></i>
                          {{ detail.type }}
                        </span>
                        <strong class="is-capitalized">{{ detail.name }}</strong>
                        <b-button size="is-small" type="is-light" @click="detail.show = !detail.show">
                          <i :class="detail.show ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                        </b-button>
                      </div>
                      <transition name="fade">
                        <div v-if="detail.show" class="mt-2 pl-3" style="border-left:3px solid #ddd;">
                          <div class="columns is-multiline is-mobile is-size-7">
                            <div class="column is-4"><strong>Potencia:</strong> {{ detail.power ?? '—' }}</div>
                            <div class="column is-4"><strong>Precisión:</strong> {{ detail.accuracy ?? '—' }}</div>
                            <div class="column is-4"><strong>PP:</strong> {{ detail.pp ?? '—' }}</div>
                            <div class="column is-12"><em class="has-text-grey">{{ detail.effect }}</em></div>
                          </div>
                        </div>
                      </transition>
                    </li>
                  </ul>
                </div>
              </div>
            </b-box>
          </div>
        </div>

        <div v-if="error" class="columns is-centered mt-5">
          <div class="column is-8-desktop is-10-tablet">
            <b-message type="is-danger">
              <strong>Error:</strong> {{ error }}
            </b-message>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
const BTYPE_COLORS = {
  grass: '#78C850', fire: '#F08030', water: '#6890F0', electric: '#F8D030', ice: '#98D8D8', ground: '#E0C068',
  rock: '#B8A038', fairy: '#EE99AC', poison: '#A040A0', bug: '#A8B820', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', psychic: '#F85888', flying: '#A890F0', fighting: '#C03028', ghost: '#705898', normal: '#A8A878'
}
const TYPE_COLORS = {
  grass: '#78C850', fire: '#F08030', water: '#6890F0', electric: '#F8D030', ice: '#98D8D8', ground: '#E0C068',
  rock: '#B8A038', fairy: '#EE99AC', poison: '#A040A0', bug: '#A8B820', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', psychic: '#F85888', flying: '#A890F0', fighting: '#C03028', ghost: '#705898', normal: '#A8A878'
}
import { pokemonData } from '../data/pokemon'

export default {
  name: 'BuefyDemo',
  data() {
    return {
      query: '',
      pokemon: null,
      error: null,
      loading: false,
      suggestions: ['pikachu', 'charizard', 'mewtwo', 'bulbasaur', 'squirtle'],
      allPokemonNames: [],
      filteredSuggestions: [],
      dominantType: '',
      dominantColor: '#ddd',
      moveDetailsLoading: false,
      moveDetails: [],
      abilityDetails: {},
      abilityLoading: false
    }
  },
  mounted() {
    this.allPokemonNames = pokemonData[0].pokemones.map(p => p.nombre)
  },
  computed: {
    photoUrl() {
      return this.pokemon?.sprites?.other?.['official-artwork']?.front_default || 
             this.pokemon?.sprites?.front_default
    },
    abilities() {
      return this.pokemon?.abilities?.map(a => a.ability.name) || []
    },
    moves() {
      return this.pokemon?.moves?.slice(0, 10).map(m => m.move.name) || []
    },
    boxStyle() {
      return {
        border: `3px solid ${this.dominantColor}`,
        boxShadow: `0 0 15px ${this.dominantColor}55`,
        background: `linear-gradient(150deg, ${this.dominantColor}22, #ffffff)`
      }
    }
  },
  methods: {
    getFilteredPokemon(text) {
      if (!text) return []
      return this.allPokemonNames.filter(name => 
        name.toLowerCase().includes(text.toLowerCase())
      ).slice(0, 10)
    },
    async searchPokemon() {
      if (!this.query || !this.query.trim()) return
      
      this.loading = true
      this.error = null
      this.pokemon = null

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.query.toLowerCase()}`
        )
        this.pokemon = response.data
        const type = this.pokemon.types?.[0]?.type?.name || ''
        this.dominantType = type
        this.dominantColor = BTYPE_COLORS[type] || '#999'
        this.fetchMoveDetails()
      } catch (err) {
        this.error = 'No se encontró el Pokémon. Intenta con otro nombre.'
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
        const responses = await Promise.all(firstMoves.map(m => axios.get(m.move.url).catch(() => null)))
        this.moveDetails = responses.filter(r => r).map(r => {
          const mv = r.data
          return {
            name: mv.name,
            power: mv.power,
            accuracy: mv.accuracy,
            pp: mv.pp,
            type: mv.type?.name,
            damageClass: mv.damage_class?.name,
            effect: (mv.effect_entries?.[0]?.short_effect || '').replace(/\n/g, ' '),
            show: false
          }
        })
      } finally {
        this.moveDetailsLoading = false
      }
    }
    ,
    async fetchAbilityDetail(ability) {
      if (this.abilityDetails[ability]) return
      this.abilityLoading = true
      try {
        const abilObj = this.pokemon.abilities.find(a => a.ability.name === ability)
        if (!abilObj) return
        const { data } = await axios.get(abilObj.ability.url)
        const es = data.effect_entries.find(e => e.language.name === 'es')
        const en = data.effect_entries.find(e => e.language.name === 'en')
        this.abilityDetails[ability] = { effect: (es?.short_effect || en?.short_effect || 'Sin descripción').replace(/\n/g,' ') }
      } catch (e) {
        this.abilityDetails[ability] = { effect: 'Error cargando efecto' }
      } finally {
        this.abilityLoading = false
      }
    }
  }
}
</script>

<style scoped>
.buefy-pokeguia {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
