<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 m-0">Pokeguía</h1>
      <button class="btn btn-outline-danger" @click="logout">Salir</button>
    </div>

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-sm-8 position-relative">
            <label for="q" class="form-label">Buscar Pokémon</label>
            <input 
              id="q" 
              v-model.trim="query" 
              @input="onInputChange"
              @keyup.enter="search" 
              @focus="showSuggestions = true"
              type="text" 
              class="form-control" 
              placeholder="Ej: pikachu, char, bul..." 
            />
            
            <!-- Sugerencias -->
            <div v-if="showSuggestions && filteredSuggestions.length > 0" class="suggestions-dropdown">
              <div 
                v-for="suggestion in filteredSuggestions" 
                :key="suggestion"
                @click="selectSuggestion(suggestion)"
                class="suggestion-item"
              >
                {{ suggestion }}
              </div>
            </div>
          </div>
          <div class="col-sm-4 d-grid">
            <button class="btn btn-primary" @click="search" :disabled="!query || loading">
              {{ loading ? 'Buscando...' : 'Buscar' }}
            </button>
          </div>
        </div>

        <small class="text-muted">Se carga Pikachu automáticamente al abrir. Escribe para ver sugerencias.</small>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="pokemon" class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <img :src="photoUrl" :alt="pokemon.name" class="img-fluid" style="max-height:240px" />
            <h2 class="h4 mt-3 text-capitalize">{{ pokemon.name }}</h2>
            <div class="text-muted">ID: {{ pokemon.id }}</div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="h5 mb-3">Habilidades</h3>
            <ul class="list-group list-group-flush">
              <li v-for="ab in abilities" :key="ab" class="list-group-item text-capitalize">{{ ab }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="h5 mb-3">Movimientos</h3>
            <ul class="list-group list-group-flush" style="max-height:300px; overflow:auto;">
              <li v-for="mv in moves" :key="mv" class="list-group-item text-capitalize">{{ mv }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default {
  name: 'Home',
  data() {
    return {
      query: 'pikachu',
      pokemon: null,
      loading: false,
      error: '',
      showSuggestions: false,
      pokemonList: [
        'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
        'squirtle', 'wartortle', 'blastoise', 'pikachu', 'raichu', 'meowth', 'persian',
        'psyduck', 'golduck', 'machop', 'machoke', 'machamp', 'geodude', 'graveler', 'golem',
        'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'cubone', 'marowak',
        'hitmonlee', 'hitmonchan', 'chansey', 'jynx', 'electabuzz', 'magmar', 'gyarados',
        'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'snorlax',
        'articuno', 'zapdos', 'moltres', 'dragonite', 'mewtwo', 'mew',
        'chikorita', 'bayleef', 'meganium', 'cyndaquil', 'quilava', 'typhlosion',
        'totodile', 'croconaw', 'feraligatr', 'sentret', 'furret', 'hoothoot', 'noctowl',
        'ledyba', 'ledian', 'spinarak', 'ariados', 'mareep', 'flaaffy', 'ampharos',
        'marill', 'azumarill', 'sudowoodo', 'wooper', 'quagsire', 'espeon', 'umbreon',
        'murkrow', 'slowking', 'girafarig', 'dunsparce', 'heracross', 'sneasel', 'teddiursa',
        'ursaring', 'swinub', 'piloswine', 'corsola', 'mantine', 'skarmory', 'houndour',
        'houndoom', 'kingdra', 'stantler', 'smeargle', 'tyrogue', 'hitmontop', 'elekid',
        'magby', 'blissey', 'raikou', 'entei', 'suicune', 'tyranitar', 'lugia', 'ho-oh',
        'celebi',
        'treecko', 'grovyle', 'sceptile', 'torchic', 'combusken', 'blaziken',
        'mudkip', 'marshtomp', 'swampert', 'poochyena', 'mightyena', 'zigzagoon', 'linoone',
        'wurmple', 'silcoon', 'beautifly', 'cascoon', 'dustox', 'lotad', 'lombre', 'ludicolo',
        'seedot', 'nuzleaf', 'shiftry', 'taillow', 'swellow', 'wingull', 'pelipper',
        'ralts', 'kirlia', 'gardevoir', 'shroomish', 'breloom', 'slakoth', 'vigoroth', 'slaking',
        'nincada', 'ninjask', 'shedinja', 'whismur', 'loudred', 'exploud', 'makuhita', 'hariyama',
        'azurill', 'nosepass', 'skitty', 'delcatty', 'sableye', 'mawile', 'aron', 'lairon',
        'aggron', 'meditite', 'medicham', 'electrike', 'manectric', 'plusle', 'minun',
        'volbeat', 'illumise', 'roselia', 'gulpin', 'swalot', 'carvanha', 'sharpedo',
        'wailmer', 'wailord', 'numel', 'camerupt', 'torkoal', 'spoink', 'grumpig',
        'spinda', 'trapinch', 'vibrava', 'flygon', 'cacnea', 'cacturne', 'swablu', 'altaria',
        'zangoose', 'seviper', 'lunatone', 'solrock', 'barboach', 'whiscash', 'corphish',
        'crawdaunt', 'baltoy', 'claydol', 'lileep', 'cradily', 'anorith', 'armaldo',
        'feebas', 'milotic', 'castform', 'kecleon', 'shuppet', 'banette', 'duskull', 'dusclops',
        'tropius', 'chimecho', 'absol', 'wynaut', 'snorunt', 'glalie', 'spheal', 'sealeo',
        'walrein', 'clamperl', 'huntail', 'gorebyss', 'relicanth', 'luvdisc', 'bagon',
        'shelgon', 'salamence', 'beldum', 'metang', 'metagross', 'regirock', 'regice',
        'registeel', 'latias', 'latios', 'kyogre', 'groudon', 'rayquaza', 'jirachi', 'deoxys'
      ]
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
    filteredSuggestions() {
      if (!this.query || this.query.length < 1) return []
      const q = this.query.toLowerCase()
      return this.pokemonList
        .filter(p => p.toLowerCase().startsWith(q))
        .slice(0, 10)
    }
  },
  created() {
    this.fetchPokemon('pikachu')
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    onInputChange() {
      this.showSuggestions = true
    },
    selectSuggestion(name) {
      this.query = name
      this.showSuggestions = false
      this.fetchPokemon(name)
    },
    handleClickOutside(event) {
      if (!event.target.closest('.position-relative')) {
        this.showSuggestions = false
      }
    },
    async search() {
      if (!this.query) return
      this.showSuggestions = false
      await this.fetchPokemon(this.query.toLowerCase())
    },
    async fetchPokemon(name) {
      this.loading = true
      this.error = ''
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`
        const { data } = await axios.get(url)
        this.pokemon = data
      } catch (e) {
        this.pokemon = null
        this.error = 'Pokémon no encontrado. Verifica el nombre.'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.$router.push({ name: 'Login' })
      } catch (e) {
        console.error('Error al cerrar sesión', e)
      }
    }
  }
}
</script>

<style scoped>
.position-relative {
  position: relative;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
}

.suggestion-item {
  padding: 10px 15px;
  cursor: pointer;
  text-transform: capitalize;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
  color: #0d6efd;
}
</style>