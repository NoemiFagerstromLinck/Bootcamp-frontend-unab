<template>
  <v-container>
    <v-card rounded="xl" variant="outlined" class="mb-4">
      <v-card-title class="text-subtitle-1 d-flex align-center">
        <v-icon start color="purple">mdi-scale-balance</v-icon>
        Comparar Pokémon
        <v-spacer />
        <v-btn size="x-small" variant="text" @click="reset">Reset</v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="leftInput" label="Izquierda (nombre o ID)" variant="outlined" density="compact" @keyup.enter="loadLeft" />
            <div v-if="leftLoading" class="py-2"><v-progress-linear indeterminate color="purple" /></div>
            <PokemonMini v-if="left" :pokemon="left" side="left" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="rightInput" label="Derecha (nombre o ID)" variant="outlined" density="compact" @keyup.enter="loadRight" />
            <div v-if="rightLoading" class="py-2"><v-progress-linear indeterminate color="pink" /></div>
            <PokemonMini v-if="right" :pokemon="right" side="right" />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-row v-if="left && right">
          <v-col cols="12">
            <v-table density="compact">
              <thead>
                <tr>
                  <th>Stat</th>
                  <th style="text-transform:capitalize">{{ left.name }}</th>
                  <th style="text-transform:capitalize">{{ right.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in statNames" :key="s">
                  <td>{{ s }}</td>
                  <td :class="cellClass(statValue(left,s), statValue(right,s), 'left')">{{ statValue(left,s) }}</td>
                  <td :class="cellClass(statValue(right,s), statValue(left,s), 'right')">{{ statValue(right,s) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
        <v-alert v-else type="info" variant="tonal" title="Selecciona dos" text="Ingresa nombre o ID y presiona Enter para cada lado." />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { ref } from 'vue'
import { usePokemonStore } from '../store/pokemon'

const STAT_MAP = {
  hp: 'hp', attack: 'attack', defense: 'defense', 'special-attack': 'special-attack', 'special-defense': 'special-defense', speed: 'speed'
}

export default {
  name: 'Comparator',
  components: {
    PokemonMini: {
      name: 'PokemonMini',
      props: { pokemon: Object, side: String },
      setup(props) { return { props } },
      template: `<v-card variant="tonal" :color="side==='left' ? 'purple' : 'pink'" rounded="xl" class="mb-2">
        <v-card-title class="d-flex align-center">
          <v-avatar size="64" class="me-2">
            <img :src="pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default" :alt="pokemon.name" />
          </v-avatar>
          <div>
            <div style="text-transform:capitalize" class="text-subtitle-2">#{{ pokemon.id }} {{ pokemon.name }}</div>
            <div>
              <v-chip v-for="t in pokemon.types" :key="t.type.name" size="x-small" style="text-transform:capitalize" class="me-1" :color="typeColor(t.type.name)" />
            </div>
          </div>
        </v-card-title>
      </v-card>`,
      methods: {
        typeColor(t){
          const store = usePokemonStore();
          return store.typeColors[t] || undefined;
        }
      }
    }
  },
  setup() {
    const store = usePokemonStore()
    const leftInput = ref('')
    const rightInput = ref('')
    const left = ref(null)
    const right = ref(null)
    const leftLoading = ref(false)
    const rightLoading = ref(false)

    const statNames = Object.keys(STAT_MAP)

    function statValue(p, key) {
      if (!p) return '-'
      const found = p.stats.find(s => s.stat.name === key)
      return found ? found.base_stat : 0
    }

    function cellClass(val, other, side) {
      if (val === other) return ''
      return val > other ? (side==='left' ? 'text-success' : 'text-success') : 'text-error'
    }

    async function loadLeft() {
      const raw = leftInput.value.trim().toLowerCase()
      if (!raw) return
      leftLoading.value = true
      left.value = await store.getPokemon(raw)
      leftLoading.value = false
    }
    async function loadRight() {
      const raw = rightInput.value.trim().toLowerCase()
      if (!raw) return
      rightLoading.value = true
      right.value = await store.getPokemon(raw)
      rightLoading.value = false
    }
    function reset() {
      leftInput.value=''; rightInput.value=''; left.value=null; right.value=null
    }

    return { store, leftInput, rightInput, left, right, loadLeft, loadRight, reset, statNames, statValue, cellClass, leftLoading, rightLoading }
  }
}
</script>
<style scoped>
.text-success { color: #2e7d32; font-weight: 600; }
.text-error { color: #c62828; font-weight: 600; }
</style>
