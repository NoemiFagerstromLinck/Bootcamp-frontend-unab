<template>
  <v-app>
    <v-app-bar color="teal-darken-2" dark app>
      <v-toolbar-title class="d-flex align-center">
        <v-icon left>mdi-grid</v-icon>
        Explorar Pokémon
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="outlined" color="yellow">
        <v-icon left>mdi-arrow-left</v-icon> Volver
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid class="py-6">
        <v-row>
          <v-col 
            v-for="p in displayedPokemon" 
            :key="p.id" 
            cols="6" 
            sm="4" 
            md="3" 
            lg="2"
          >
            <v-card 
              rounded="xl" 
              elevation="3" 
              class="explore-card"
              @click="goToDetail(p.name)"
            >
              <v-img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`"
                :alt="p.name"
                height="120"
                cover
                class="card-image"
              />
              <v-card-title class="text-center pa-2">
                <div class="text-caption text-capitalize">{{ p.name }}</div>
                <v-chip size="x-small" color="red" class="mt-1">#{{ p.id }}</v-chip>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="loading" justify="center" class="mt-4">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="teal" size="48" />
            <p class="mt-2 text-caption">Cargando más Pokémon...</p>
          </v-col>
        </v-row>
        <v-row v-if="!loading && displayedPokemon.length >= totalPokemon" justify="center" class="mt-4">
          <v-col cols="12" class="text-center">
            <v-chip color="success" size="large">🎉 Has visto todos los Pokémon disponibles</v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { pokemonData } from '../data/pokemon'

export default {
  name: 'ExploreView',
  data() {
    return {
      allPokemon: [],
      displayedPokemon: [],
      page: 0,
      pageSize: 20,
      loading: false,
      totalPokemon: 0
    }
  },
  mounted() {
    this.allPokemon = pokemonData[0].pokemones.map(p => ({
      id: parseInt(p.id, 10),
      name: p.nombre
    })).sort((a, b) => a.id - b.id)
    this.totalPokemon = this.allPokemon.length
    this.loadMore()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    loadMore() {
      if (this.loading) return
      if (this.displayedPokemon.length >= this.totalPokemon) return
      
      this.loading = true
      setTimeout(() => {
        const start = this.page * this.pageSize
        const end = start + this.pageSize
        const nextBatch = this.allPokemon.slice(start, end)
        this.displayedPokemon.push(...nextBatch)
        this.page++
        this.loading = false
      }, 500)
    },
    handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      
      if (scrollTop + windowHeight >= docHeight - 200) {
        this.loadMore()
      }
    },
    goToDetail(name) {
      this.$router.push(`/?pokemon=${name}`)
    }
  }
}
</script>

<style scoped>
.explore-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.explore-card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
}
.card-image {
  transition: transform 0.3s ease;
}
.explore-card:hover .card-image {
  transform: scale(1.15);
}
</style>
