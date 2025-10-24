<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <h1 class="header-title display-4">
          Pokedex Ruby - Region Hoenn
        </h1>
        
        <div class="text-center mb-4">
          <div class="music-player-container d-inline-block">
            <button 
              @click="toggleMusic" 
              class="btn music-btn me-2"
              :class="{ 'playing': isPlaying }"
            >
              <span v-if="!isPlaying">PLAY RUBY MUSIC</span>
              <span v-else>PAUSE MUSIC</span>
            </button>
            <select 
              v-model="selectedTrack" 
              @change="changeTrack"
              class="form-select music-select d-inline-block"
              style="width: auto;"
            >
              <option value="littleroot">Littleroot Town</option>
              <option value="route101">Route 101</option>
              <option value="petalburg">Petalburg City</option>
              <option value="oldale">Oldale Town</option>
            </select>
            <div class="mt-2">
              <small style="color: #FFD700; font-weight: bold;">
                Si no hay audio, abre audio-generator.html para crear los archivos
              </small>
            </div>
          </div>
          <audio 
            ref="musicPlayer"
            loop
            :volume="0.4"
          >
            Tu navegador no soporta audio HTML5.
          </audio>
        </div>
        
        <div class="text-center mb-4">
          <span class="fs-3" style="color: #FFFFFF; font-weight: bold; text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 215, 0, 0.8); font-family: 'Courier New', monospace; background: linear-gradient(145deg, #DC143C, #8B0000); padding: 8px 16px; border-radius: 8px; border: 2px solid #FFD700;">
            RUBY VERSION
          </span>
        </div>
        
        <div class="pokemon-container">
          <div class="row align-items-end mb-4">
            <div class="col-md-8 mb-3 mb-md-0">
              <label for="searchInput" class="form-label fw-bold" style="color: #FFFFFF; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(255, 215, 0, 0.6); font-family: 'Courier New', monospace;">
                <span class="me-2" style="background: #DC143C; padding: 2px 6px; border-radius: 4px; border: 1px solid #FFD700;">BUSCAR</span>Pokemon
              </label>
              <input 
                id="searchInput"
                type="text" 
                v-model="searchTerm" 
                @input="validateSearch"
                @keyup.enter="searchPokemon"
                class="form-control search-input" 
                placeholder="Ingresa el nombre del Pokemon"
                :class="{ 'is-invalid': hasError }"
              />
              <div v-if="hasError" class="invalid-feedback">
                {{ errorMessage }}
              </div>
            </div>
            <div class="col-md-4">
              <button 
                @click="searchPokemon" 
                class="btn btn-search w-100"
                :disabled="!isValidSearch"
              >
                <span class="me-2">SEARCH</span>BUSCAR
              </button>
            </div>
          </div>

          <div class="text-center mb-3" v-if="searchTerm">
            <button 
              @click="resetSearch" 
              class="btn btn-outline-danger btn-sm ruby-text"
              style="border-color: #DC143C; font-family: 'Courier New', monospace;"
            >
              <span class="me-1">RESET</span>Mostrar todos los Pokemon
            </button>
          </div>

          <div v-if="showNoResults" class="alert alert-custom text-center">
            <h5 class="mb-2 ruby-text">
              <span class="me-2">ERROR</span>Pokemon no encontrado!
            </h5>
            <p class="mb-0 ruby-text">
              El pokemon que desea buscar no existe en la region de Hoenn.
              <br>
              <small class="text-muted ruby-text">
                Intenta con: treecko, torchic, mudkip, blaziken, rayquaza, etc.
              </small>
            </p>
          </div>

          <div v-if="!showNoResults && filteredPokemon.length > 0" class="pokemon-list-container">
            <div class="row">
              <div class="col-12 mb-3">
                <h5 style="color: #FFFFFF; font-weight: bold; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9); font-family: 'Courier New', monospace; -webkit-font-smoothing: antialiased;">
                  <span class="me-2" style="background: #DC143C; padding: 2px 8px; border-radius: 4px; border: 1px solid #FFD700;">DATA</span>
                  Mostrando {{ filteredPokemon.length }} 
                  {{ filteredPokemon.length === 1 ? 'Pokemon' : 'Pokemon' }}
                  {{ searchTerm ? `para "${searchTerm}"` : 'de la region Hoenn' }}
                </h5>
              </div>
            </div>
            
            <div class="row">
              <div 
                v-for="pokemon in filteredPokemon" 
                :key="pokemon.id"
                class="col-lg-6 col-md-6 col-sm-12 mb-3"
              >
                <div class="card pokemon-card h-100" @click="openPokemonModal(pokemon)" style="cursor: pointer;">
                  <div class="card-body d-flex align-items-center">
                    <div class="pokemon-id me-3">
                      #{{ pokemon.id }}
                    </div>
                    <div class="me-3">
                      <img 
                        :src="getPokemonImage(pokemon.id)" 
                        :alt="pokemon.nombre"
                        :data-pokemon-id="pokemon.id"
                        class="pokemon-sprite"
                        @error="handleImageError"
                        loading="lazy"
                      />
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="card-title pokemon-name mb-1">
                        {{ capitalizeFirst(pokemon.nombre) }}
                      </h6>
                      <small style="color: #654321; font-weight: 600; text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8); font-family: 'Courier New', monospace;">
                        Pokemon de la region Hoenn
                      </small>
                    </div>
                    <div class="text-end">
                      <small class="ruby-text fw-bold" style="font-family: 'Courier New', monospace;">
                        INFO
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="pokemonList.length > 0" class="row mt-4">
            <div class="col-12 text-center">
              <div class="pokemon-counter ruby-text">
                <strong>Total Pokemon: {{ pokemonList.length }}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="pokemon-modal" @click.stop>
        <div class="modal-header">
          <button class="close-btn" @click="closeModal">X</button>
        </div>
        <div class="modal-content">
          <div v-if="pokemonDetail" class="pokemon-details">
            
            <div class="text-center mb-4">
              <img 
                :src="getPokemonImage(selectedPokemon.id)" 
                :alt="selectedPokemon.nombre"
                class="pokemon-modal-image"
              />
              <h2 class="pokemon-modal-title">
                {{ capitalizeFirst(selectedPokemon.nombre) }}
              </h2>
              <p class="pokemon-modal-id">
                #{{ selectedPokemon.id.toString().padStart(3, '0') }}
              </p>
            </div>

            <div class="pokemon-info-grid">
              <div class="info-section">
                <h4>Información General</h4>
                <div class="info-row">
                  <span class="label">Altura:</span>
                  <span class="value">{{ pokemonDetail.altura }}</span>
                </div>
                <div class="info-row">
                  <span class="label">Peso:</span>
                  <span class="value">{{ pokemonDetail.peso }}</span>
                </div>
                <div class="info-row">
                  <span class="label">Categoria:</span>
                  <span class="value">{{ pokemonDetail.categoria }}</span>
                </div>
              </div>

              <div class="info-section">
                <h4>Tipos</h4>
                <div class="types-container">
                  <span 
                    v-for="tipo in pokemonDetail.tipos" 
                    :key="tipo"
                    class="type-badge"
                    :style="{ backgroundColor: getTypeColor(tipo) }"
                  >
                    {{ tipo }}
                  </span>
                </div>
              </div>

              <div class="info-section">
                <h4>Habilidades</h4>
                <div class="abilities-container">
                  <div 
                    v-for="habilidad in pokemonDetail.habilidades" 
                    :key="habilidad.nombre"
                    class="ability-item"
                  >
                    <strong>{{ habilidad.nombre }}</strong>
                    <p>{{ habilidad.descripcion }}</p>
                  </div>
                </div>
              </div>

              <div class="info-section">
                <h4>Estadisticas Base</h4>
                <div class="stats-container">
                  <div 
                    v-for="(valor, stat) in pokemonDetail.stats" 
                    :key="stat"
                    class="stat-row"
                  >
                    <span class="stat-name">{{ getStatName(stat) }}</span>
                    <div class="stat-bar-container">
                      <div 
                        class="stat-bar"
                        :style="{ 
                          width: Math.min((valor / 150) * 100, 100) + '%',
                          backgroundColor: getStatColor(valor)
                        }"
                      ></div>
                      <span class="stat-value">{{ valor }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="info-section full-width" v-if="pokemonDetail.descripcion">
                <h4>Descripcion</h4>
                <p class="description-text">{{ pokemonDetail.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pokemonData } from './data/pokemon.js'
import { getPokemonDetails } from './data/pokemonDetails.js'
import { getSpecificPokemonImage, getAlternativeUrls } from './data/pokemonImages.js'

export default {
  name: 'PokemonApp',
  data() {
    return {
      pokemonList: [],
      searchTerm: '',
      hasError: false,
      errorMessage: '',
      showNoResults: false,
      selectedPokemon: null,
      pokemonDetail: null,
      showModal: false,
      isPlaying: false,
      selectedTrack: 'littleroot',
      tracks: {
        littleroot: './audio/littleroot-town.mp3',
        route101: './audio/route-101.mp3',
        petalburg: './audio/petalburg-city.mp3',
        oldale: './audio/oldale-town.mp3'
      },
      trackNames: {
        littleroot: 'Littleroot Town',
        route101: 'Route 101',
        petalburg: 'Petalburg City',
        oldale: 'Oldale Town'
      }
    }
  },
  computed: {
    filteredPokemon() {
      if (!this.searchTerm.trim()) {
        return this.pokemonList
      }
      
      const searchTermLower = this.searchTerm.toLowerCase().trim()
      return this.pokemonList.filter(pokemon => 
        pokemon.nombre.toLowerCase().includes(searchTermLower)
      )
    },
    isValidSearch() {
      if (!this.searchTerm.trim()) return true
      
      const trimmedSearch = this.searchTerm.trim()
      const validNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
      
      return trimmedSearch.length >= 2 && 
             trimmedSearch.length <= 20 && 
             validNameRegex.test(trimmedSearch)
    }
  },
  mounted() {
    this.loadPokemonData()
    this.preloadProblematicImages()
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showModal) {
        this.closeModal()
      }
    })
  },
  methods: {
    preloadProblematicImages() {
      const problematicIds = ['150', '151', '249', '250', '251', '144', '145', '146']
      
      problematicIds.forEach(id => {
        const alternativeUrls = getAlternativeUrls(id)
        alternativeUrls.forEach(url => {
          const img = new Image()
          img.src = url
        })
      })
    },
    loadPokemonData() {
      if (pokemonData && pokemonData.length > 0 && pokemonData[0].pokemones) {
        this.pokemonList = pokemonData[0].pokemones
        console.log(`Cargados ${this.pokemonList.length} Pokemon`)
      } else {
        console.log('Error: No se pudieron cargar los datos de Pokemon')
        console.log('pokemonData:', pokemonData)
      }
    },
    validateSearch() {
      this.hasError = false
      this.errorMessage = ''
      this.showNoResults = false
      
      const trimmedSearch = this.searchTerm.trim()
      
      if (trimmedSearch.length === 0) {
        return
      }
      
      const validNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
      if (!validNameRegex.test(trimmedSearch)) {
        this.hasError = true
        this.errorMessage = 'El nombre del Pokemon solo puede contener letras'
        return
      }
      
      if (trimmedSearch.length < 2) {
        this.hasError = true
        this.errorMessage = 'Ingresa al menos 2 caracteres para buscar'
        return
      }
      
      if (trimmedSearch.length > 20) {
        this.hasError = true
        this.errorMessage = 'El nombre es demasiado largo (máximo 20 caracteres)'
        return
      }
    },
    searchPokemon() {
      if (!this.isValidSearch) {
        this.validateSearch()
        return
      }
      
      this.$nextTick(() => {
        if (this.filteredPokemon.length === 0) {
          this.showNoResults = true
        }
      })
    },
    resetSearch() {
      this.searchTerm = ''
      this.hasError = false
      this.errorMessage = ''
      this.showNoResults = false
    },
    capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getPokemonImage(id) {
      return getSpecificPokemonImage(id)
    },
    getPokemonName(id) {
      const pokemon = this.pokemonList.find(p => p.id === id.toString())
      return pokemon ? pokemon.nombre : 'unknown'
    },
    handleImageError(event) {
      const currentSrc = event.target.src
      const id = event.target.getAttribute('data-pokemon-id') || this.extractIdFromUrl(currentSrc)
      
      const alternativeSources = getAlternativeUrls(id)
      
      const allSources = [
        ...alternativeSources,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        `https://img.pokemondb.net/sprites/ruby-sapphire/normal/${this.getPokemonName(id)}.png`,
        'data:image/svg+xml;base64,' + btoa(this.createDefaultSprite(id))
      ]
      
      let nextUrl = null
      for (let i = 0; i < allSources.length; i++) {
        if (allSources[i] !== currentSrc) {
          const triedUrls = event.target.getAttribute('data-tried-urls') || ''
          if (!triedUrls.includes(allSources[i])) {
            nextUrl = allSources[i]
            break
          }
        }
      }
      
      if (nextUrl) {
        const triedUrls = event.target.getAttribute('data-tried-urls') || ''
        event.target.setAttribute('data-tried-urls', triedUrls + '|' + currentSrc)
        event.target.src = nextUrl
        
        console.log(`Probando imagen alternativa para Pokemon #${id}: ${nextUrl}`)
      } else {
        event.target.src = 'data:image/svg+xml;base64,' + btoa(this.createDefaultSprite(id))
        console.log(`Usando sprite por defecto para Pokemon #${id}`)
      }
    },
    extractIdFromUrl(url) {
      const matches = url.match(/\/(\d+)\.png/)
      return matches ? matches[1] : '0'
    },
    createDefaultSprite(id) {
      const pokemon = this.pokemonList.find(p => p.id === id.toString())
      const name = pokemon ? pokemon.nombre : 'Unknown'
      
      return `
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#DC143C;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <circle cx="32" cy="32" r="30" fill="url(#redGrad)" stroke="#8B0000" stroke-width="2"/>
          <path d="M 2 32 L 62 32" stroke="#2C1810" stroke-width="3"/>
          <circle cx="32" cy="32" r="8" fill="url(#goldGrad)" stroke="#8B0000" stroke-width="2"/>
          <circle cx="32" cy="32" r="4" fill="white" stroke="#8B0000" stroke-width="1"/>
          
          <text x="32" y="18" font-family="Courier New, monospace" font-size="7" 
                text-anchor="middle" fill="white" font-weight="bold" 
                stroke="#8B0000" stroke-width="0.5">
            #${id.toString().padStart(3, '0')}
          </text>
          <text x="32" y="48" font-family="Courier New, monospace" font-size="6" 
                text-anchor="middle" fill="white" font-weight="bold"
                stroke="#8B0000" stroke-width="0.5">
            ${name.toUpperCase().substring(0, 7)}
          </text>
        </svg>
      `
    },
    toggleMusic() {
      const audio = this.$refs.musicPlayer
      if (!audio) {
        console.log('No se encontro el elemento de audio')
        return
      }
      
      if (this.isPlaying) {
        audio.pause()
        this.isPlaying = false
        console.log('Musica pausada')
        this.showMusicNotification('Musica pausada')
      } else {
        const trackUrl = this.tracks[this.selectedTrack]
        const trackName = this.trackNames[this.selectedTrack]
        
        console.log(`Intentando cargar: ${trackName}`)
        console.log(`URL: ${trackUrl}`)
        
        audio.src = trackUrl
        audio.volume = 0.3
        audio.loop = true
        
        const playPromise = audio.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true
              console.log(`Reproduciendo: ${trackName}`)
              this.showMusicNotification(`${trackName}`)
            })
            .catch(error => {
              console.log('Error al reproducir:', error.message)
              
              if (error.name === 'NotAllowedError') {
                this.showMusicNotification('Haz clic para permitir audio en el navegador')
                this.isPlaying = false
              } else {
                console.log('Intentando audio sintetico...')
                const synthSuccess = this.createSynthAudio()
                
                this.isPlaying = true
                if (synthSuccess) {
                  this.showMusicNotification(`${trackName} (8-bit)`)
                } else {
                  this.showMusicNotification(`${trackName} (Modo silencioso)`)
                }
              }
            })
        }
        
        audio.addEventListener('loadstart', () => {
          console.log('Cargando audio...')
        }, { once: true })
        
        audio.addEventListener('canplay', () => {
          console.log('Audio listo para reproducir')
        }, { once: true })
        
        audio.addEventListener('error', (e) => {
          console.log('Error de audio:', e.target.error)
          this.isPlaying = true
          this.showMusicNotification(`${trackName} (Sin audio)`)
        }, { once: true })
      }
    },
    changeTrack() {
      if (this.isPlaying) {
        this.toggleMusic()
        this.$nextTick(() => {
          this.toggleMusic()
        })
      }
    },
    createSynthAudio() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        const frequencies = {
          littleroot: [262, 330, 392],
          route101: [294, 370, 440],
          petalburg: [330, 415, 494],
          oldale: [247, 311, 370]
        }
        
        const trackFreqs = frequencies[this.selectedTrack] || frequencies.littleroot
        
        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(trackFreqs[0], audioContext.currentTime)
        
        let time = audioContext.currentTime
        trackFreqs.forEach((freq, index) => {
          oscillator.frequency.setValueAtTime(freq, time + index * 0.5)
        })
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 2)
        
        return true
      } catch (error) {
        console.log('No se pudo crear audio sintetico:', error)
        return false
      }
    },
    showMusicNotification(trackName) {
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(145deg, #DC143C, #8B0000);
        color: #FFD700;
        padding: 15px 20px;
        border-radius: 10px;
        border: 2px solid #FFD700;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 8px 25px rgba(220, 20, 60, 0.6);
        animation: slideIn 0.5s ease-out;
      `
      notification.innerHTML = `${trackName}<br><small>Reproduciendo</small>`
      
      document.body.appendChild(notification)
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'slideOut 0.5s ease-in'
          setTimeout(() => {
            document.body.removeChild(notification)
          }, 500)
        }
      }, 3000)
    },
    openPokemonModal(pokemon) {
      this.selectedPokemon = pokemon
      this.pokemonDetail = getPokemonDetails(pokemon.id)
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      this.selectedPokemon = null
      this.pokemonDetail = null
      document.body.style.overflow = 'auto'
    },
    getTypeColor(tipo) {
      const typeColors = {
        'Fuego': '#F08030',
        'Agua': '#6890F0',
        'Planta': '#78C850',
        'Eléctrico': '#F8D030',
        'Psíquico': '#F85888',
        'Hielo': '#98D8D8',
        'Dragón': '#7038F8',
        'Siniestro': '#705848',
        'Lucha': '#C03028',
        'Veneno': '#A040A0',
        'Tierra': '#E0C068',
        'Volador': '#A890F0',
        'Bicho': '#A8B820',
        'Roca': '#B8A038',
        'Fantasma': '#705898',
        'Acero': '#B8B8D0',
        'Normal': '#A8A878'
      }
      return typeColors[tipo] || '#68A090'
    },
    getStatName(stat) {
      const statNames = {
        hp: 'HP',
        ataque: 'Ataque',
        defensa: 'Defensa',
        velocidad: 'Velocidad'
      }
      return statNames[stat] || stat
    },
    getStatColor(value) {
      if (value >= 100) return '#4CAF50'
      if (value >= 70) return '#FF9800'
      if (value >= 50) return '#FFC107'
      return '#F44336'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #654321 0%,
    #8B4513 25%, 
    #A0522D 50%, 
    #CD853F 75%, 
    #DEB887 100%);
  background-attachment: fixed;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.header-title {
  color: #FFFFFF;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Courier New', monospace;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(145deg, #DC143C, #8B0000);
  padding: 20px;
  border-radius: 15px;
  border: 3px solid #FFD700;
  box-shadow: 0 10px 30px rgba(220, 20, 60, 0.7);
  position: relative;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 215, 0, 0.3), 
    transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.music-player-container {
  background: linear-gradient(145deg, #8B0000, #654321);
  padding: 15px;
  border-radius: 12px;
  border: 2px solid #FFD700;
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
  margin-bottom: 1rem;
}

.music-btn {
  background: linear-gradient(145deg, #DC143C, #8B0000);
  color: #FFD700;
  border: 2px solid #FFD700;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.music-btn:hover {
  background: linear-gradient(145deg, #8B0000, #DC143C);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 20, 60, 0.6);
}

.music-btn.playing {
  background: linear-gradient(145deg, #228B22, #006400);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.music-select {
  background: #654321;
  color: #FFD700;
  border: 2px solid #FFD700;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
}

.pokemon-container {
  background: rgba(139, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  border: 3px solid #FFD700;
  box-shadow: 
    0 15px 40px rgba(220, 20, 60, 0.7),
    inset 0 2px 10px rgba(255, 215, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.pokemon-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 215, 0, 0.1) 50%, 
    transparent 70%);
  pointer-events: none;
}

.search-input {
  background: rgba(255, 255, 255, 0.95);
  border: 3px solid #FFD700;
  border-radius: 10px;
  padding: 12px 15px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.search-input:focus {
  border-color: #DC143C;
  box-shadow: 0 0 15px rgba(220, 20, 60, 0.5);
  background: #FFFFFF;
  outline: none;
}

.btn-search {
  background: linear-gradient(145deg, #DC143C, #8B0000);
  color: #FFD700;
  border: 3px solid #FFD700;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.btn-search:hover:not(:disabled) {
  background: linear-gradient(145deg, #8B0000, #DC143C);
  color: #FFFFFF;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(220, 20, 60, 0.6);
}

.btn-search:disabled {
  background: #666;
  border-color: #999;
  color: #ccc;
  cursor: not-allowed;
}

.alert-custom {
  background: linear-gradient(145deg, #8B0000, #654321);
  border: 2px solid #FFD700;
  border-radius: 12px;
  color: #FFD700;
  font-family: 'Courier New', monospace;
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
}

.ruby-text {
  color: #FFD700 !important;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.pokemon-card {
  background: linear-gradient(145deg, #FFEAA7, #FDCB6E);
  border: 3px solid #8B4513;
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
  position: relative;
  overflow: hidden;
}

.pokemon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent);
  transition: left 0.5s ease;
}

.pokemon-card:hover::before {
  left: 100%;
}

.pokemon-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 35px rgba(139, 69, 19, 0.6);
  border-color: #DC143C;
}

.pokemon-sprite {
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-sprite {
  transform: scale(1.1) rotate(5deg);
}

.pokemon-id {
  background: linear-gradient(145deg, #DC143C, #8B0000);
  color: #FFD700;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 8px;
  border: 2px solid #FFD700;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.pokemon-name {
  color: #654321;
  font-weight: bold;
  font-size: 1.1rem;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);
  font-family: 'Courier New', monospace;
  text-transform: capitalize;
}

.pokemon-counter {
  background: linear-gradient(145deg, #DC143C, #8B0000);
  color: #FFD700;
  padding: 15px 25px;
  border-radius: 12px;
  border: 2px solid #FFD700;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  display: inline-block;
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.pokemon-modal {
  background: linear-gradient(145deg, #FFEAA7, #FDCB6E);
  border: 4px solid #8B4513;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(139, 69, 19, 0.8);
}

.modal-header {
  position: sticky;
  top: 0;
  background: linear-gradient(145deg, #DC143C, #8B0000);
  padding: 15px;
  border-radius: 16px 16px 0 0;
  z-index: 10;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: #FFD700;
  color: #8B0000;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.close-btn:hover {
  background: #FFFFFF;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.modal-content {
  padding: 30px;
}

.pokemon-modal-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  filter: drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.5));
}

.pokemon-modal-title {
  color: #654321;
  font-weight: bold;
  font-size: 2.5rem;
  text-shadow: 2px 2px 6px rgba(255, 255, 255, 0.8);
  font-family: 'Courier New', monospace;
  text-transform: capitalize;
  margin: 15px 0 5px 0;
}

.pokemon-modal-id {
  color: #8B4513;
  font-weight: bold;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  margin-bottom: 20px;
}

.pokemon-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-section {
  background: rgba(139, 0, 0, 0.1);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #8B4513;
}

.info-section.full-width {
  grid-column: 1 / -1;
}

.info-section h4 {
  color: #654321;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 2px solid #8B4513;
  padding-bottom: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(139, 69, 19, 0.3);
}

.info-row .label {
  font-weight: bold;
  color: #654321;
  font-family: 'Courier New', monospace;
}

.info-row .value {
  color: #8B4513;
  font-weight: 600;
}

.types-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.type-badge {
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  font-size: 0.9rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.abilities-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ability-item {
  background: rgba(255, 234, 167, 0.5);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #8B4513;
}

.ability-item strong {
  color: #654321;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  font-size: 0.95rem;
}

.ability-item p {
  margin: 8px 0 0 0;
  color: #8B4513;
  font-size: 0.9rem;
  line-height: 1.4;
}

.stats-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-name {
  font-weight: bold;
  color: #654321;
  font-family: 'Courier New', monospace;
  width: 80px;
  font-size: 0.9rem;
}

.stat-bar-container {
  flex: 1;
  position: relative;
  height: 20px;
  background: rgba(139, 69, 19, 0.2);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #8B4513;
}

.stat-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.8s ease;
  position: relative;
}

.stat-value {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  color: #654321;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.description-text {
  color: #654321;
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  background: rgba(255, 234, 167, 0.3);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #8B4513;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .pokemon-container {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  .header-title {
    font-size: 1.8rem;
    padding: 15px;
  }
  
  .pokemon-modal {
    width: 95%;
    margin: 10px;
  }
  
  .pokemon-info-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .modal-content {
    padding: 20px 15px;
  }
  
  .pokemon-modal-title {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .music-player-container {
    padding: 10px;
  }
  
  .music-btn, .music-select {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
  
  .pokemon-sprite {
    width: 48px;
    height: 48px;
  }
  
  .pokemon-name {
    font-size: 0.95rem;
  }
  
  .pokemon-id {
    padding: 6px 8px;
    font-size: 0.8rem;
  }
}
</style>