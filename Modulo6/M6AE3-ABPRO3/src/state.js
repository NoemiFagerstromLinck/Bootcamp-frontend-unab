import { reactive } from 'vue'

export const state = reactive({
  user: null,
  isAuthenticated: false,
  cart: [],
  products: []
})