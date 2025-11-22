<template>
  <v-card class="mb-4" variant="outlined" rounded="xl">
    <v-card-title class="text-subtitle-1 d-flex align-center">
      <v-icon left color="red">mdi-filter</v-icon>
      Filtros Avanzados
      <v-spacer />
      <v-btn size="x-small" variant="text" @click="reset">Reset</v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="localSearch" label="Nombre contiene" variant="outlined" density="compact" @input="emitFilters" clearable />
        </v-col>
        <v-col cols="12" md="4">
          <v-range-slider
            v-model="idRange"
            :max="386"
            :min="1"
            step="1"
            thumb-label="always"
            class="mt-6"
            @end="emitFilters"
          ></v-range-slider>
          <div class="text-caption">ID: {{ idRange[0] }} - {{ idRange[1] }}</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption mb-1">Tipos</div>
          <div class="d-flex flex-wrap">
            <v-chip
              v-for="t in allTypes"
              :key="t"
              size="x-small"
              class="ma-1"
              :color="isSelectedType(t) ? typeColors[t] : undefined"
              :variant="isSelectedType(t) ? 'elevated' : 'outlined'"
              @click="toggleType(t)"
              style="cursor:pointer; text-transform:capitalize;"
            >{{ t }}</v-chip>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { usePokemonStore } from '../store/pokemon'
export default {
  name: 'FilterPanel',
  emits: ['update:filters'],
  setup() { const store = usePokemonStore(); return { store } },
  data() {
    return {
      localSearch: '',
      idRange: [1, 200],
      selectedTypes: []
    }
  },
  computed: {
    typeColors() { return this.store.typeColors },
    allTypes() { return Object.keys(this.store.typeColors) }
  },
  methods: {
    emitFilters() {
      this.$emit('update:filters', { text: this.localSearch.trim(), idRange: this.idRange, types: this.selectedTypes })
    },
    toggleType(t) {
      const idx = this.selectedTypes.indexOf(t)
      if (idx >= 0) {
        this.selectedTypes.splice(idx, 1)
      } else {
        this.selectedTypes.push(t)
      }
      this.emitFilters()
    },
    isSelectedType(t) { return this.selectedTypes.includes(t) },
    reset() { this.localSearch=''; this.idRange=[1,200]; this.selectedTypes=[]; this.emitFilters() }
  }
}
</script>
