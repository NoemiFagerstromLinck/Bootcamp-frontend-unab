# 🔍 Buscador de Pokémon - Región Hoenn

Una aplicación web desarrollada en Vue.js para buscar Pokémon de la región Hoenn (Ruby/Sapphire/Emerald).

## 🎯 Características

- **Búsqueda de Pokémon**: Encuentra Pokémon por nombre con búsqueda en tiempo real
- **Validación de formularios**: Validación completa del input de búsqueda
- **Diseño responsive**: Interfaz adaptada con Bootstrap 5
- **Datos de Hoenn**: Incluye todos los 135 Pokémon de la 3ª generación + clásicos
- **Manejo de errores**: Mensajes informativos cuando no se encuentran resultados
- **🎵 Reproductor de música**: Sistema de audio con temas de Pokémon Ruby
- **🎮 Estilo auténtico**: Colores, efectos y tipografía del Game Boy Advance

## 🛠️ Tecnologías utilizadas

- **Vue.js 3**: Framework principal
- **Bootstrap 5**: Estilos y componentes UI
- **Vite**: Herramienta de desarrollo y construcción
- **HTML5/CSS3**: Estructura y estilos personalizados

## 📦 Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:
   ```bash
   npm install
   ```

## 🚀 Ejecución

Para ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001/`

## 📋 Requerimientos cumplidos

✅ **Proyecto Vue.js**: Aplicación completa en Vue.js 3
✅ **Input de búsqueda**: Campo para buscar Pokémon por nombre
✅ **Lista de Pokémon**: Muestra todos los Pokémon de la región Hoenn
✅ **Métodos de validación**: Validación completa del formulario de búsqueda
✅ **Bootstrap**: Diseño responsive con Bootstrap 5
✅ **Mensaje de error**: "El pokemon que desea buscar no existe"
✅ **Datos de Hoenn**: Pokémon de Ruby/Sapphire/Emerald (GBA)

## 🎮 Pokémon incluidos

La aplicación incluye **152 Pokémon** en total:
- **Clásicos**: Bulbasaur, Charmander, Squirtle, Pikachu, Mewtwo, Mew
- **Populares Kanto**: Jigglypuff, Psyduck, Cubone, Chansey, Lapras, Ditto, Eevee
- **Aves legendarias**: Articuno, Zapdos, Moltres
- **Hoenn completo**: Treecko, Torchic, Mudkip y sus evoluciones
- **Legendarios Hoenn**: Rayquaza, Kyogre, Groudon, Latias, Latios, Jirachi, Deoxys
- **Región completa**: Desde Poochyena (#261) hasta Deoxys (#386)

## 🎵 Sistema de música

- **Reproductor integrado**: Controles para play/pause
- **4 temas disponibles**: Littleroot Town, Route 101, Petalburg City, Oldale Town
- **Selección de pistas**: Menú desplegable para cambiar entre temas
- **Notificaciones visuales**: Alerts estilo Ruby al cambiar música
- **Loop infinito**: La música se repite automáticamente
- **Fallback inteligente**: Audio sintético 8-bit si no hay archivos

### 🔧 Para activar la música:

1. **Opción fácil**: Abre `audio-generator.html` en tu navegador
2. **Genera archivos**: Haz clic en cada botón para descargar los WAV
3. **Coloca archivos**: Mueve los archivos a `/public/audio/`
4. **Nombres correctos**: 
   - `littleroot-town.wav`
   - `route101-town.wav`
   - `petalburg-town.wav`
   - `oldale-town.wav`

### 🎹 Sin archivos de audio:
- El reproductor funciona con **audio sintético 8-bit**
- **Notificaciones visuales** indican qué tema está "sonando"
- **Experiencia completa** sin necesidad de archivos externos

## 🔍 Funciones de búsqueda

- **Búsqueda en tiempo real**: Los resultados se filtran mientras escribes
- **Búsqueda parcial**: Encuentra Pokémon escribiendo parte del nombre
- **Validaciones incluidas**:
  - Solo letras y espacios permitidos
  - Mínimo 2 caracteres
  - Máximo 20 caracteres
  - Mensaje de error si no se encuentran resultados

## 📱 Modal Pokédex

- **Click en cualquier Pokémon**: Abre modal con información detallada
- **Información completa**: Tipo, altura, peso, categoría, habilidades
- **Descripción de la Pokédex**: Texto descriptivo de cada Pokémon
- **Estadísticas visuales**: Barras de progreso para HP, Ataque, Defensa, Velocidad
- **Badges de tipos**: Colores auténticos para cada tipo de Pokémon
- **Controles intuitivos**: Cerrar con X, Escape, o clic fuera del modal
- **Diseño responsive**: Funciona perfectamente en móviles

## 🎨 Diseño

- **Interfaz moderna**: Gradientes y animaciones sutiles
- **Tarjetas interactivas**: Efectos hover en las tarjetas de Pokémon
- **Responsive**: Funciona en móviles, tablets y escritorio
- **Tema Hoenn**: Colores inspirados en los juegos Ruby/Sapphire/Emerald

## 📱 Uso

1. Ingresa el nombre de un Pokémon en el campo de búsqueda
2. Los resultados se filtrarán automáticamente
3. Si no encuentra coincidencias, aparecerá un mensaje informativo
4. Usa el botón "Mostrar todos los Pokémon" para limpiar la búsqueda

## 🏗️ Estructura del proyecto

```
src/
├── App.vue           # Componente principal
├── main.js          # Punto de entrada de la aplicación
├── style.css        # Estilos personalizados
└── data/
    └── pokemon.js   # Datos de los Pokémon de Hoenn
```

---

**Desarrollado para el Bootcamp Frontend UNAB - Módulo 6 Actividad 4**