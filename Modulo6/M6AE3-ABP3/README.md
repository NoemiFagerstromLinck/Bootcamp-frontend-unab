# Aplicación Vue.js - Controles Radio y Select

## Descripción
Aplicación desarrollada en Vue.js que demuestra el manejo de controles de formulario:
- **Controles Radio**: Para seleccionar tipo de estudios
- **Control Select**: Para seleccionar día de la semana

## Características Implementadas

### Controles Radio
✅ Cuatro opciones de tipo de estudios:
- Estudios Primarios
- Estudios Secundarios  
- Estudios Universitarios (seleccionado por defecto)
- Estudios de Postgrado

✅ Uso de `v-model="estudios"` para vincular datos
✅ Inicialización del modelo con valor por defecto: `estudios: 'universitarios'`
✅ Visualización dinámica de la opción seleccionada

### Control Select
✅ Lista completa de días de la semana
✅ Primera opción deshabilitada que solicita seleccionar
✅ Uso de `v-model="diaSeleccionado"` para vincular datos
✅ Visualización condicional del día seleccionado
✅ Mensaje cuando no hay selección

### Características Técnicas
- **Framework**: Vue.js 3 (CDN)
- **Reactivity**: Data binding bidireccional con v-model
- **Computed Properties**: Para formatear texto de visualización
- **Conditional Rendering**: v-if para mostrar/ocultar contenido
- **Responsive Design**: Adaptable a dispositivos móviles
- **Estilos Modernos**: CSS con gradientes y animaciones

## Estructura de Archivos
```
M6AE3-ABP3/
├── index.html      # Estructura HTML principal
├── app.js          # Lógica Vue.js
├── styles.css      # Estilos CSS
└── README.md       # Documentación
```

## Cómo Usar
1. Abrir `index.html` en cualquier navegador web moderno
2. Los controles radio muestran "Estudios Universitarios" seleccionado por defecto
3. Seleccionar diferentes tipos de estudios para ver el cambio dinámico
4. En el select, elegir un día de la semana para ver la selección
5. Los resultados se actualizan automáticamente

## Conceptos Vue.js Demostrados
- **v-model**: Data binding bidireccional
- **Computed Properties**: Propiedades calculadas para formateo
- **Conditional Rendering**: v-if y v-else
- **Event Handling**: Manejo reactivo de cambios
- **Component Data**: Gestión del estado local

## Autor
Desarrollado como parte del Bootcamp Frontend UNAB - Módulo 6 Actividad 3