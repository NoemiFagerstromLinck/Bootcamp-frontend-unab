<template>
  <div class="element-pokeguia">
    <el-menu mode="horizontal" background-color="#f56c6c" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">
        <el-icon><Basketball /></el-icon>
        <span class="ml-2"><strong>Pokeguía - Element Plus Demo</strong></span>
      </el-menu-item>
      <div style="flex: 1"></div>
      <el-menu-item index="2" @click="$router.push('/ui-comparison')">
        <el-icon><ArrowLeft /></el-icon>
        <span>Volver a Comparación</span>
      </el-menu-item>
    </el-menu>

    <div class="content-wrapper">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="16" :lg="12">
          <el-card shadow="hover" class="search-card">
            <template #header>
              <div class="card-header-title">
                <el-icon size="24"><Search /></el-icon>
                <span class="ml-2">Buscador de Pokémon</span>
              </div>
            </template>

            <el-autocomplete
              v-model="query"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              placeholder="Ejemplo: pikachu, charizard..."
              size="large"
              clearable
              @keyup.enter="searchPokemon"
              class="mb-4"
              style="width: 100%;"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-autocomplete>

            <div style="text-align: center;">
              <el-button
                type="danger"
                size="large"
                @click="searchPokemon"
                :loading="loading"
              >
                <el-icon class="mr-1"><Basketball /></el-icon>
                Buscar
              </el-button>
            </div>

            <el-alert v-if="!pokemon && !loading" type="info" :closable="false" class="mt-4">
              <template #title>
                <div style="display: flex; align-items: center;">
                  <el-icon><InfoFilled /></el-icon>
                  <span class="ml-2"><strong>Sugerencias:</strong></span>
                </div>
              </template>
              <div class="suggestions">
                <el-tag
                  v-for="suggestion in suggestions"
                  :key="suggestion"
                  type="danger"
                  effect="plain"
                  size="large"
                  @click="query = suggestion; searchPokemon()"
                  style="cursor: pointer; margin: 5px;"
                >
                  {{ suggestion }}
                </el-tag>
              </div>
            </el-alert>
          </el-card>
        </el-col>
      </el-row>

      <el-row v-if="pokemon" justify="center" class="mt-4">
        <el-col :xs="24" :sm="20" :md="16" :lg="12">
          <el-card shadow="always" class="pokemon-card" :style="cardStyle">
            <template #header>
              <div class="card-header-title pokemon-title" :style="headerStyle">
                <el-icon color="#ffd700" size="24"><StarFilled /></el-icon>
                <span class="ml-2">{{ pokemon.name.toUpperCase() }}</span>
                <el-tag type="danger" class="ml-2" size="small">#{{ pokemon.id }}</el-tag>
                <el-tag v-if="dominantType" :style="{ backgroundColor: dominantColor, color: '#fff', border: 'none' }" class="ml-2 text-capitalize" size="small">{{ dominantType }}</el-tag>
              </div>
            </template>

            <div style="text-align: center;">
              <el-avatar :src="photoUrl" :size="200" class="mb-4" />
            </div>

            <el-divider />

            <div class="section mb-4">
              <div class="section-title">
                <el-icon color="#409EFF"><Medal /></el-icon>
                <span class="ml-2"><strong>Habilidades</strong></span>
              </div>
              <div class="abilities">
                <el-tooltip
                  v-for="ability in abilities"
                  :key="ability"
                  :content="abilityDetails[ability]?.effect || 'Click para ver detalle'"
                  placement="top"
                >
                  <el-tag
                    type="primary"
                    size="large"
                    class="ability-tag text-capitalize"
                    @click="fetchAbilityDetail(ability)"
                    :effect="abilityDetails[ability] ? 'dark' : 'light'"
                    style="cursor: pointer;"
                  >
                    {{ ability }}
                  </el-tag>
                </el-tooltip>
              </div>
              <div v-if="abilityLoading" class="small text-muted mt-2">Cargando habilidad...</div>
            </div>

            <el-divider />

            <div class="section">
              <div class="section-title">
                <el-icon color="#E6A23C"><Lightning /></el-icon>
                <span class="ml-2"><strong>Movimientos (primeros 10)</strong></span>
              </div>
                <div v-if="moveDetailsLoading" style="text-align:center; padding: 20px;">
                  <el-icon style="font-size:32px; color:#E6A23C"><Lightning /></el-icon>
                  <p class="text-muted">Cargando detalles...</p>
                </div>
                <el-collapse v-else class="move-collapse">
                  <el-collapse-item v-for="detail in moveDetails" :key="detail.name" :name="detail.name">
                    <template #title>
                      <div class="move-header">
                        <el-tag :style="{ backgroundColor: ETYPE_COLORS[detail.type] || '#999', color:'#fff', border:'none' }" size="small" class="mr-2">
                          <el-icon class="mr-1">
                            <Lightning v-if="detail.damageClass === 'physical'" />
                            <Sunny v-else-if="detail.damageClass === 'special'" />
                            <Medal v-else />
                          </el-icon>
                          {{ detail.type }}
                        </el-tag>
                        <span class="text-capitalize">{{ detail.name }}</span>
                      </div>
                    </template>
                    <div class="move-detail-grid">
                      <div><strong>Potencia:</strong> {{ detail.power ?? '—' }}</div>
                      <div><strong>Precisión:</strong> {{ detail.accuracy ?? '—' }}</div>
                      <div><strong>PP:</strong> {{ detail.pp ?? '—' }}</div>
                      <div class="col-span"><em class="text-muted">{{ detail.effect }}</em></div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row v-if="error" justify="center" class="mt-4">
        <el-col :xs="24" :sm="20" :md="16" :lg="12">
          <el-alert type="error" :closable="false">
            <template #title>
              <strong>Error:</strong> {{ error }}
            </template>
          </el-alert>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const ETYPE_COLORS = {
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
import {
  Basketball,
  ArrowLeft,
  Search,
  InfoFilled,
  StarFilled,
  Medal,
  Lightning,
  Sunny
} from '@element-plus/icons-vue'

export default {
  name: 'ElementDemo',
  components: {
    Basketball,
    ArrowLeft,
    Search,
    InfoFilled,
    StarFilled,
    Medal,
    Lightning,
    Sunny
  },
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
      dominantColor: '#667eea',
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
    cardStyle() {
      return {
        border: `4px solid ${this.dominantColor}`,
        background: `linear-gradient(145deg, ${this.dominantColor}18, #ffffff)`
      }
    },
    headerStyle() {
      return {
        background: `linear-gradient(135deg, ${this.dominantColor} 0%, #222 100%)`,
        color: '#fff'
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const results = queryString
        ? this.allPokemonNames
            .filter(name => name.toLowerCase().includes(queryString.toLowerCase()))
            .map(name => ({ value: name }))
            .slice(0, 10)
        : this.allPokemonNames.map(name => ({ value: name })).slice(0, 10)
      cb(results)
    },
    handleSelect(item) {
      this.query = item.value
      this.searchPokemon()
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
        this.dominantColor = ETYPE_COLORS[type] || '#667eea'
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
    },
    async fetchAbilityDetail(ability) {
      if (!this.pokemon || this.abilityDetails[ability]) return
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
.element-pokeguia {
  min-height: 100vh;
  background: #f5f5f5;
}

.content-wrapper {
  padding: 30px 20px;
}

.card-header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.pokemon-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  border-radius: 4px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
}

.abilities,
.moves-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ability-tag,
.move-tag {
  margin: 0;
}

.suggestions {
  margin-top: 10px;
}

.ml-1 {
  margin-left: 4px;
}

.ml-2 {
  margin-left: 8px;
}

.mr-1 {
  margin-right: 4px;
}

.mb-4 {
  margin-bottom: 20px;
}

.mt-4 {
  margin-top: 20px;
}
</style>
