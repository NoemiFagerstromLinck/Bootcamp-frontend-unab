<template>
  <div class="comparison-container">
    <div class="container py-5">
      <div class="text-center mb-5">
        <h1 class="display-4 mb-3">Comparación de Librerías UI</h1>
        <p class="lead text-muted">
          Evaluación práctica de BootstrapVue, Vuetify, Buefy y Element UI
        </p>
      </div>

      <!-- Navegación a las demos -->
      <div class="row mb-5">
        <div class="col-md-6 col-lg-3 mb-3" v-for="lib in libraries" :key="lib.id">
          <div class="card h-100 shadow-sm library-card" :class="lib.color">
            <div class="card-body text-center">
              <i :class="lib.icon + ' display-1 mb-3'"></i>
              <h5 class="card-title">{{ lib.name }}</h5>
              <p class="card-text small text-muted">{{ lib.description }}</p>
              <router-link :to="lib.route" class="btn btn-outline-dark btn-sm mt-2">
                Ver Demo
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla comparativa -->
      <div class="card shadow mb-5">
        <div class="card-header bg-dark text-white">
          <h4 class="mb-0">
            <i class="bi bi-clipboard-data me-2"></i>
            Tabla Comparativa
          </h4>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Característica</th>
                  <th class="text-center">BootstrapVue</th>
                  <th class="text-center">Vuetify</th>
                  <th class="text-center">Buefy</th>
                  <th class="text-center">Element UI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="feature in comparisonFeatures" :key="feature.name">
                  <td><strong>{{ feature.name }}</strong></td>
                  <td class="text-center" v-html="getRating(feature.bootstrap)"></td>
                  <td class="text-center" v-html="getRating(feature.vuetify)"></td>
                  <td class="text-center" v-html="getRating(feature.buefy)"></td>
                  <td class="text-center" v-html="getRating(feature.element)"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Evaluación personal -->
      <div class="row">
        <div class="col-lg-6 mb-4" v-for="evaluation in evaluations" :key="evaluation.library">
          <div class="card h-100 shadow">
            <div class="card-header" :class="evaluation.headerClass">
              <h5 class="mb-0">
                <i :class="evaluation.icon + ' me-2'"></i>
                {{ evaluation.library }}
              </h5>
            </div>
            <div class="card-body">
              <h6 class="text-success">
                <i class="bi bi-check-circle me-1"></i>
                Ventajas
              </h6>
              <ul class="list-unstyled mb-3">
                <li v-for="(pro, index) in evaluation.pros" :key="index" class="mb-1">
                  <i class="bi bi-plus-circle text-success me-2"></i>{{ pro }}
                </li>
              </ul>

              <h6 class="text-danger">
                <i class="bi bi-x-circle me-1"></i>
                Desventajas
              </h6>
              <ul class="list-unstyled mb-3">
                <li v-for="(con, index) in evaluation.cons" :key="index" class="mb-1">
                  <i class="bi bi-dash-circle text-danger me-2"></i>{{ con }}
                </li>
              </ul>

              <div class="alert alert-light mb-0">
                <strong>Caso de uso ideal:</strong> {{ evaluation.useCase }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conclusión -->
      <div class="card shadow mt-5">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">
            <i class="bi bi-trophy me-2"></i>
            Conclusión y Recomendación
          </h4>
        </div>
        <div class="card-body">
          <h5>Evaluación Final</h5>
          <p class="lead">
            Después de implementar las cuatro librerías, cada una demostró fortalezas en diferentes áreas:
          </p>

          <div class="row mb-4">
            <div class="col-md-6 mb-3">
              <div class="p-3 bg-light rounded">
                <h6><i class="bi bi-award-fill text-warning me-2"></i>Mejor Diseño Moderno</h6>
                <p class="mb-0"><strong>Vuetify</strong> - Material Design completo y profesional</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="p-3 bg-light rounded">
                <h6><i class="bi bi-speedometer2 text-success me-2"></i>Más Ligera</h6>
                <p class="mb-0"><strong>Buefy</strong> - Bundle size optimizado</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="p-3 bg-light rounded">
                <h6><i class="bi bi-mortarboard-fill text-info me-2"></i>Más Fácil de Aprender</h6>
                <p class="mb-0"><strong>BootstrapVue</strong> - Familiaridad con Bootstrap</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="p-3 bg-light rounded">
                <h6><i class="bi bi-building text-primary me-2"></i>Mejor para Empresas</h6>
                <p class="mb-0"><strong>Element UI</strong> - Componentes robustos y profesionales</p>
              </div>
            </div>
          </div>

          <div class="alert alert-success">
            <h6 class="alert-heading">
              <i class="bi bi-lightbulb-fill me-2"></i>
              Recomendación Personal
            </h6>
            <p class="mb-0">
              Para este proyecto de Pokeguía, <strong>Vuetify</strong> sería la elección ideal debido a:
            </p>
            <ul class="mb-0 mt-2">
              <li>Diseño moderno y atractivo para una aplicación de Pokémon</li>
              <li>Componentes avanzados (data tables, cards, modals)</li>
              <li>Excelente sistema de temas para personalización</li>
              <li>Gran documentación y comunidad activa</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center mt-5">
        <router-link to="/home" class="btn btn-lg btn-primary">
          <i class="bi bi-arrow-left me-2"></i>
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIComparison',
  data() {
    return {
      libraries: [
        {
          id: 1,
          name: 'BootstrapVue',
          description: 'Integración Bootstrap + Vue',
          icon: 'bi bi-bootstrap-fill',
          color: 'border-primary',
          route: '/bootstrap-demo'
        },
        {
          id: 2,
          name: 'Vuetify',
          description: 'Material Design para Vue',
          icon: 'bi bi-palette-fill',
          color: 'border-info',
          route: '/vuetify-demo'
        },
        {
          id: 3,
          name: 'Buefy',
          description: 'Bulma + Vue ligero',
          icon: 'bi bi-feather',
          color: 'border-success',
          route: '/buefy-demo'
        },
        {
          id: 4,
          name: 'Element UI',
          description: 'UI Empresarial profesional',
          icon: 'bi bi-building',
          color: 'border-warning',
          route: '/element-demo'
        }
      ],
      comparisonFeatures: [
        { name: 'Tamaño del Bundle', bootstrap: 3, vuetify: 2, buefy: 5, element: 2 },
        { name: 'Curva de Aprendizaje', bootstrap: 5, vuetify: 3, buefy: 5, element: 3 },
        { name: 'Cantidad de Componentes', bootstrap: 4, vuetify: 5, buefy: 3, element: 4 },
        { name: 'Personalización', bootstrap: 3, vuetify: 5, buefy: 5, element: 3 },
        { name: 'Performance', bootstrap: 4, vuetify: 3, buefy: 5, element: 4 },
        { name: 'Documentación', bootstrap: 5, vuetify: 5, buefy: 3, element: 4 },
        { name: 'Comunidad', bootstrap: 5, vuetify: 5, buefy: 2, element: 4 },
        { name: 'Diseño Moderno', bootstrap: 2, vuetify: 5, buefy: 4, element: 3 },
        { name: 'Soporte Mobile', bootstrap: 5, vuetify: 5, buefy: 5, element: 4 },
        { name: 'TypeScript', bootstrap: 2, vuetify: 5, buefy: 2, element: 5 }
      ],
      evaluations: [
        {
          library: 'BootstrapVue',
          icon: 'bi bi-bootstrap-fill',
          headerClass: 'bg-primary text-white',
          pros: [
            'Familiaridad con Bootstrap',
            'Curva de aprendizaje muy baja',
            'Ecosistema maduro y estable',
            'Gran cantidad de recursos',
            'Accesibilidad incorporada'
          ],
          cons: [
            'Diseño puede verse genérico',
            'Menos componentes avanzados',
            'Personalización requiere SASS',
            'BootstrapVue 3 aún en desarrollo'
          ],
          useCase: 'Prototipos rápidos y proyectos con diseñadores familiarizados con Bootstrap'
        },
        {
          library: 'Vuetify',
          icon: 'bi bi-palette-fill',
          headerClass: 'bg-info text-white',
          pros: [
            'Material Design completo',
            'Más de 100 componentes',
            'Sistema de temas robusto',
            'Documentación excelente',
            'Comunidad muy activa'
          ],
          cons: [
            'Bundle más pesado',
            'Curva de aprendizaje media',
            'Puede ser excesivo para proyectos simples',
            'Fuerza un estilo específico'
          ],
          useCase: 'Aplicaciones empresariales complejas y dashboards administrativos modernos'
        },
        {
          library: 'Buefy',
          icon: 'bi bi-feather',
          headerClass: 'bg-success text-white',
          pros: [
            'Muy ligero y rápido',
            'Diseño limpio y minimalista',
            'Fácil de aprender',
            'Personalización simple con CSS',
            'Sin dependencias JavaScript'
          ],
          cons: [
            'Menos componentes que otras',
            'Comunidad más pequeña',
            'Desarrollo menos activo',
            'Faltan componentes avanzados'
          ],
          useCase: 'Proyectos pequeños a medianos donde el peso del bundle es crítico'
        },
        {
          library: 'Element UI',
          icon: 'bi bi-building',
          headerClass: 'bg-warning text-dark',
          pros: [
            'Diseño profesional empresarial',
            'Formularios y tablas robustos',
            'Internacionalización incluida',
            'TypeScript completo',
            'Usado por empresas grandes'
          ],
          cons: [
            'Bundle relativamente grande',
            'Diseño más conservador',
            'Curva de aprendizaje media',
            'Documentación a veces confusa'
          ],
          useCase: 'Sistemas administrativos empresariales y aplicaciones con formularios complejos'
        }
      ]
    };
  },
  methods: {
    getRating(score) {
      const stars = '⭐'.repeat(score);
      const empty = '☆'.repeat(5 - score);
      return `<span class="rating">${stars}${empty}</span>`;
    }
  }
};
</script>

<style scoped>
.comparison-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 0;
}

.container {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.library-card {
  transition: all 0.3s ease;
  border-width: 2px;
}

.library-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.rating {
  font-size: 1.2rem;
}

.card {
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0 !important;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
}
</style>
