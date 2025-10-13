# Sistema de Gestión de Pacientes - Consultorio Médico

## Descripción del Proyecto

Este proyecto implementa un sistema completo de gestión de pacientes para un consultorio médico, desarrollado en **JavaScript ES5** puro, cumpliendo con todos los requerimientos especificados en la actividad M5AE1-ABP1.

## Requerimientos Implementados

### 1. Código usando ES5
- Implementación completa en JavaScript ES5
- Uso de funciones constructoras tradicionales
- Sintaxis compatible con navegadores antiguos

### 2. Métodos prototype para búsqueda y visualización
- `mostrarTodos()`: Método que muestra todos los pacientes registrados
- `buscarPorNombre()`: Método que permite buscar pacientes por nombre

### 3. Funciones constructoras para cada objeto
- `function Paciente()`: Constructor para crear objetos paciente
- `function Consultorio()`: Constructor para manejar la colección de pacientes

### 4. Getters y setters para proteger datos
- Métodos getter: `getNombre()`, `getApellido()`, `getEdad()`, `getRut()`, `getDiagnostico()`
- Métodos setter: `setNombre()`, `setApellido()`, `setEdad()`, `setRut()`, `setDiagnostico()`
- Validación de datos en cada setter

### 5. Instanciación con 'new'
- Todos los objetos creados usando la palabra clave `new`
- 6 pacientes de ejemplo instanciados
- 1 consultorio instanciado

## Estructura del Proyecto

```
M5AE1-ABP1/
├── index.html          # Página principal del sistema
├── consultorio.js      # Lógica principal del sistema
└── README.md          # Este archivo
```

## Cómo usar el sistema

### 1. Abrir el sistema
1. Abre el archivo `index.html` en tu navegador web
2. Presiona **F12** para abrir las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. El sistema se ejecutará automáticamente

### 2. Comandos disponibles

#### Mostrar todos los pacientes
```javascript
consultorio.mostrarTodos()
```

#### Buscar pacientes por nombre
```javascript
consultorio.buscarPorNombre("Juan")      // Busca por nombre
consultorio.buscarPorNombre("Pérez")     // Busca por apellido
consultorio.buscarPorNombre("María")     // Búsqueda exacta
```

#### Acceder a datos de un paciente
```javascript
paciente1.getNombre()           // Obtiene el nombre
paciente1.getApellido()         // Obtiene el apellido
paciente1.getEdad()             // Obtiene la edad
paciente1.getRut()              // Obtiene el RUT
paciente1.getDiagnostico()      // Obtiene el diagnóstico
paciente1.getDatos()            // Obtiene todos los datos
paciente1.getNombreCompleto()   // Obtiene nombre completo
```

#### Modificar datos de un paciente
```javascript
paciente1.setNombre("Nuevo Nombre")
paciente1.setApellido("Nuevo Apellido")
paciente1.setEdad(45)
paciente1.setRut("99.999.999-9")
paciente1.setDiagnostico("Nuevo Diagnóstico")
```

## Pacientes de ejemplo incluidos

El sistema incluye 6 pacientes de ejemplo:

1. **Juan Pérez** (35 años) - Hipertensión arterial
2. **María González** (28 años) - Diabetes tipo 2
3. **Carlos Rodríguez** (45 años) - Artritis reumatoide
4. **Ana Martínez** (52 años) - Gastritis crónica
5. **Luis Fernández** (31 años) - Migraña crónica
6. **Carmen López** (67 años) - Osteoporosis

## Características de Seguridad

- **Encapsulación**: Las propiedades se almacenan con prefijo `_` para indicar que son privadas
- **Validación**: Los setters incluyen validaciones para prevenir datos inválidos
- **Protección de tipos**: Verificación de tipos de datos en todos los métodos
- **Manejo de errores**: Mensajes de error descriptivos para operaciones inválidas

## Funcionalidades Destacadas

### Búsqueda Inteligente
- Busca en nombres, apellidos y nombres completos
- No distingue entre mayúsculas y minúsculas
- Permite búsquedas parciales

### Interfaz de Consola Rica
- Mensajes formatados con emojis y separadores
- Información detallada de cada operación
- Contadores y estadísticas

### Validaciones Robustas
- Validación de tipos de datos
- Rangos de edad válidos (0-150 años)
- Verificación de cadenas no vacías
- Protección contra instanciación incorrecta

## Tecnologías Utilizadas

- **JavaScript ES5**: Lenguaje principal
- **HTML5**: Estructura de la página
- **CSS3**: Estilos de la interfaz
- **Browser Console**: Interfaz de usuario

## Cumplimiento de Requerimientos

| Requerimiento | Estado | Descripción |
|--------------|---------|-------------|
| ES5 | OK | Código 100% compatible con ES5 |
| Métodos prototype | OK | `mostrarTodos()` y `buscarPorNombre()` implementados |
| Constructores | OK | `Paciente()` y `Consultorio()` creados |
| Getters/Setters | OK | Métodos completos con validación |
| Instanciación con 'new' | OK | Todos los objetos creados correctamente |
| Consola del navegador | OK | Sistema ejecutándose en la consola |
