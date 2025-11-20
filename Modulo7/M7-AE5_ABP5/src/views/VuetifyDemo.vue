<template>
  <v-app>
    <v-app-bar color="red darken-2" dark app>
      <v-toolbar-title>
        <v-icon left>mdi-pokeball</v-icon>
        Pokeguía - Vuetify Demo
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/ui-comparison">Volver a Comparación</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
              <v-card-title class="text-h4 text-center py-5 bg-red-darken-1 text-white">
                <v-icon left size="large">mdi-magnify</v-icon>
                Buscador de Pokémon
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-autocomplete
                  v-model="query"
                  :items="filteredSuggestions"
                  label="Buscar Pokémon"
                  placeholder="Ejemplo: pikachu, charizard..."
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-pokemon-go"
                  clearable
                  @update:search="filterSuggestions"
                  @keyup.enter="searchPokemon"
                  class="mb-4"
                  no-data-text="No hay sugerencias"
                ></v-autocomplete>

                <div class="text-center">
                  <v-btn
                    color="red darken-1"
                    size="large"
                    @click="searchPokemon"
                    :loading="loading"
                    prepend-icon="mdi-pokeball"
                  >
                    Buscar
                  </v-btn>
                </div>

                <v-card v-if="!pokemon && !loading" variant="tonal" color="blue-grey-lighten-5" class="mt-6">
                  <v-card-text>
                    <p class="text-subtitle-1 font-weight-bold mb-3">
                      <v-icon left color="info">mdi-lightbulb-outline</v-icon>
                      Sugerencias:
                    </p>
                    <v-chip-group>
                      <v-chip
                        v-for="suggestion in suggestions"
                        :key="suggestion"
                        @click="query = suggestion; searchPokemon()"
                        color="red"
                        variant="outlined"
                        class="ma-1"
                      >
                        {{ suggestion }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="pokemon" justify="center" class="mt-4">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="5" :style="{ border: '4px solid ' + dominantColor }">
              <v-card-title class="text-h5 text-center py-4" :style="gradientHeader">
                <v-icon left color="yellow">mdi-star</v-icon>
                {{ pokemon.name.toUpperCase() }}
                <v-chip class="ml-2" color="red" size="small">#{{ pokemon.id }}</v-chip>
                <v-chip v-if="dominantType" class="ml-2 text-capitalize" :style="{ backgroundColor: dominantColor, color: '#fff' }" size="small">{{ dominantType }}</v-chip>
              </v-card-title>

              <v-card-text class="text-center pa-6">
                <v-avatar size="200" class="mb-4">
                  <v-img :src="photoUrl" :alt="pokemon.name"></v-img>
                </v-avatar>

                <v-divider class="my-4"></v-divider>

                <div class="mb-4">
                  <p class="text-h6 font-weight-bold mb-3">
                    <v-icon left color="purple">mdi-shield-star</v-icon>
                    Habilidades
                  </p>
                  <div class="d-flex flex-wrap">
                    <v-tooltip
                      v-for="ability in abilities"
                      :key="ability"
                      :text="abilityDetails[ability]?.effect || 'Click para cargar efecto'"
                      location="top"
                    >
                      <template #activator="{ props }">
                        <v-chip
                          v-bind="props"
                          class="ma-1 text-capitalize"
                          :color="abilityDetails[ability] ? 'purple' : 'purple-darken-3'"
                          variant="elevated"
                          @click="fetchAbilityDetail(ability)"
                        >
                          <v-icon start>mdi-shield</v-icon>{{ ability }}
                        </v-chip>
                      </template>
                    </v-tooltip>
                  </div>
                  <div v-if="abilityLoading" class="text-caption mt-2">Cargando habilidad...</div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div>
                  <p class="text-h6 font-weight-bold mb-3">
                    <v-icon left color="orange">mdi-flash</v-icon>
                    Movimientos (primeros 10)
                  </p>
                  <div v-if="moveDetailsLoading" class="text-center py-4">
                    <v-progress-circular indeterminate color="orange" size="48"></v-progress-circular>
                  </div>
                  <v-expansion-panels v-else multiple>
                    <v-expansion-panel
                      v-for="detail in moveDetails"
                      :key="detail.name"
                    >
                      <v-expansion-panel-title>
                        <v-chip :style="{ backgroundColor: TYPE_COLORS[detail.type] || '#999', color: '#fff' }" size="small" class="mr-2">
                          <v-icon size="18" class="mr-1">{{ detail.damageClassIcon }}</v-icon>{{ detail.type }}
                        </v-chip>
                        <span class="text-capitalize font-weight-medium">{{ detail.name }}</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-row dense>
                          <v-col cols="4"><strong>Potencia:</strong> {{ detail.power ?? '—' }}</v-col>
                          <v-col cols="4"><strong>Precisión:</strong> {{ detail.accuracy ?? '—' }}</v-col>
                          <v-col cols="4"><strong>PP:</strong> {{ detail.pp ?? '—' }}</v-col>
                          <v-col cols="12" class="mt-2"><em class="text-caption">{{ detail.effect }}</em></v-col>
                        </v-row>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="error" justify="center" class="mt-4">
          <v-col cols="12" md="8" lg="6">
            <v-alert type="error" variant="tonal" prominent>
              <v-alert-title>Error</v-alert-title>
              {{ error }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
const VTYPE_COLORS = {
  grass: '#78C850', fire: '#F08030', water: '#6890F0', electric: '#F8D030', ice: '#98D8D8', ground: '#E0C068',
  rock: '#B8A038', fairy: '#EE99AC', poison: '#A040A0', bug: '#A8B820', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', psychic: '#F85888', flying: '#A890F0', fighting: '#C03028', ghost: '#705898', normal: '#A8A878'
}
import { pokemonData } from '../data/pokemon'

export default {
  name: 'VuetifyDemo',
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
      dominantColor: '#764ba2',
      moveDetailsLoading: false,
      moveDetails: [],
      abilityDetails: {},
      abilityLoading: false,
      TYPE_COLORS: VTYPE_COLORS
    }
  },
  mounted() {
    this.allPokemonNames = pokemonData[0].pokemones.map(p => p.nombre)
    this.filteredSuggestions = this.allPokemonNames.slice(0, 10)
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
    gradientHeader() {
      return {
        background: `linear-gradient(135deg, ${this.dominantColor} 0%, #222 100%)`,
        color: '#fff'
      }
    }
  },
  methods: {
    filterSuggestions(searchTerm) {
      if (!searchTerm || searchTerm.length < 1) {
        this.filteredSuggestions = this.allPokemonNames.slice(0, 10)
        return
      }
      const term = searchTerm.toLowerCase()
      this.filteredSuggestions = this.allPokemonNames
        .filter(name => name.toLowerCase().includes(term))
        .slice(0, 10)
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
        this.dominantColor = VTYPE_COLORS[type] || '#764ba2'
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
            damageClassIcon: mv.damage_class?.name === 'physical' ? 'mdi-arm-flex' : mv.damage_class?.name === 'special' ? 'mdi-auto-fix' : 'mdi-shield',
            effect: (mv.effect_entries?.[0]?.short_effect || '').replace(/\n/g, ' ')
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
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
