<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h1 class="h4 mb-3 text-center">Pokeguía - Login</h1>

            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Correo</label>
                <input id="email" v-model="email" type="email" required class="form-control" placeholder="tu@correo.com" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input id="password" v-model="password" type="password" required minlength="6" class="form-control" placeholder="Mínimo 6 caracteres" />
              </div>

              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit" :disabled="loading">
                  {{ isRegister ? 'Crear cuenta' : 'Ingresar' }}
                </button>
                <button class="btn btn-outline-secondary" type="button" @click="toggleMode" :disabled="loading">
                  {{ isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}
                </button>
              </div>

              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const isRegister = ref(false)
    const loading = ref(false)
    const error = ref('')

    const toggleMode = () => {
      isRegister.value = !isRegister.value
      error.value = ''
    }

    const onSubmit = async () => {
      error.value = ''
      loading.value = true
      try {
        if (isRegister.value) {
          await createUserWithEmailAndPassword(auth, email.value, password.value)
        } else {
          await signInWithEmailAndPassword(auth, email.value, password.value)
        }
        router.push({ name: 'Home' })
      } catch (e) {
        error.value = mapAuthError(e)
      } finally {
        loading.value = false
      }
    }

    function mapAuthError(e) {
      const code = e?.code || ''
      if (code.includes('invalid-email')) return 'Correo inválido.'
      if (code.includes('user-not-found')) return 'Usuario no encontrado.'
      if (code.includes('wrong-password')) return 'Contraseña incorrecta.'
      if (code.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.'
      if (code.includes('email-already-in-use')) return 'El correo ya está en uso.'
      return 'Error de autenticación. Revisa tus datos.'
    }

    return { email, password, isRegister, loading, error, toggleMode, onSubmit }
  }
}
</script>
