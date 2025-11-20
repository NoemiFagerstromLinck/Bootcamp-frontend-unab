import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import App from './App.vue'
import router from './router'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Buefy
import Buefy from '@ntohq/buefy-next'
import '@ntohq/buefy-next/dist/buefy.css'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'light'
	}
})

const app = createApp(App)

// Registrar todos los iconos de Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app
	.use(router)
	.use(vuetify)
	.use(Buefy)
	.use(ElementPlus)
	.mount('#app')