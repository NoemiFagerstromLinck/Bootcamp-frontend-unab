<template>
  <div class="card pokemon-card h-100" @click="handleClick" style="cursor: pointer;">
    <div class="card-body d-flex align-items-center">
      <div class="pokemon-id me-3">
        #{{ id }}
      </div>
      <div class="me-3">
        <img 
          :src="pokemonImage" 
          :alt="nombre"
          :data-pokemon-id="id"
          class="pokemon-sprite"
          @error="handleImageError"
          loading="lazy"
        />
      </div>
      <div class="flex-grow-1">
        <h6 class="card-title pokemon-name mb-1">
          {{ capitalizedName }}
        </h6>
        <p class="pokemon-description mb-1">
          {{ descripcion }}
        </p>
        <small style="color: #654321; font-weight: 600; text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8); font-family: 'Courier New', monospace;">
          Pokémon de la región Hoenn
        </small>
      </div>
      <div class="text-end">
        <small class="ruby-text fw-bold" style="font-family: 'Courier New', monospace;">
          INFO
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { getSpecificPokemonImage, getAlternativeUrls } from '../data/pokemonImages.js'

export default {
  name: 'PokemonCard',
  props: {
    id: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    }
  },
  computed: {
    capitalizedName() {
      return this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1)
    },
    pokemonImage() {
      return getSpecificPokemonImage(this.id)
    }
  },
  methods: {
    handleClick() {
      this.$emit('pokemon-selected', {
        id: this.id,
        nombre: this.nombre,
        descripcion: this.descripcion
      })
    },
    handleImageError(event) {
      const currentSrc = event.target.src
      const id = event.target.getAttribute('data-pokemon-id') || this.id
      
      const alternativeSources = getAlternativeUrls(id)
      
      const allSources = [
        ...alternativeSources,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        `https://img.pokemondb.net/sprites/ruby-sapphire/normal/${this.nombre}.png`,
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
      } else {
        event.target.src = 'data:image/svg+xml;base64,' + btoa(this.createDefaultSprite(id))
      }
    },
    createDefaultSprite(id) {
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
            ${this.nombre.toUpperCase().substring(0, 7)}
          </text>
        </svg>
      `
    }
  }
}
</script>

<style scoped>
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

.pokemon-description {
  color: #654321;
  font-size: 0.85rem;
  line-height: 1.3;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.6);
}

.ruby-text {
  color: #FFD700 !important;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

@media (max-width: 576px) {
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
  
  .pokemon-description {
    font-size: 0.75rem;
  }
}
</style>
