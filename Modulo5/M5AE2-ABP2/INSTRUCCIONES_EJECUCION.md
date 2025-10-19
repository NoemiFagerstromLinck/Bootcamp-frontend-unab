# Instrucciones para Ejecutar el Proyecto Tecno Chile

## PASO 1: Instalar Live Server

### Instalación detallada:
1. **Abrir VS Code**
2. **Abrir panel de Extensiones**: 
   - Click en el icono de cuadrados (Extensions) en la barra lateral izquierda
   - O presionar `Ctrl + Shift + X`
3. **Buscar Live Server**:
   - Escribir "Live Server" en el cuadro de búsqueda
   - Buscar la extensión que dice "Live Server" por **Ritwick Dey**
   - Verificar que tenga muchas descargas (varios millones)
4. **Instalar**:
   - Click en el botón "Install" 
   - Esperar a que se complete la instalación
   - Aparecerá "Installed" cuando esté listo

## PASO 2: Abrir el Proyecto

1. **Abrir carpeta en VS Code**:
   - `File` → `Open Folder`
   - Navegar hasta la carpeta `M5AE1-ABPRO1`
   - Seleccionar la carpeta completa (no solo el archivo HTML)

## PASO 3: Ejecutar Live Server

### Método 1 - Click derecho:
1. En el explorador de archivos de VS Code (panel izquierdo)
2. Click derecho sobre `index.html`
3. Seleccionar **"Open with Live Server"**

### Método 2 - Botón "Go Live":
1. Con cualquier archivo HTML abierto
2. Mirar en la barra inferior derecha de VS Code
3. Click en el botón **"Go Live"** 

### Método 3 - Atajo de teclado:
- Con `index.html` abierto, presionar `Alt + L + O`

## Ventajas de Live Server:
- Recarga automática cuando guardas cambios
- Configuración cero
- Integrado con VS Code
- Perfecto para desarrollo

## Verificar que Funciona

Una vez que tengas Live Server ejecutándose, deberías ver:

- Productos cargados: 15 productos tecnológicos
- Sin errores: No aparece "No se pudieron cargar los productos"
- Carrito funcional: Puedes agregar productos
- Stock visible: Estados de stock correctos
- URL del servidor: `http://127.0.0.1:5500`

## Problemas Comunes y Soluciones

### "No aparece Open with Live Server en click derecho"
**Posibles causas:**
1. **Live Server no está instalado** → Seguir PASO 1
2. **No abriste la carpeta completa** → Abrir toda la carpeta M5AE1-ABPRO1, no solo el archivo
3. **Extensión deshabilitada** → Ir a Extensiones y verificar que Live Server esté habilitado

### "No se pudieron cargar los productos"
- **Causa**: Archivo abierto directamente (file://)
- **Solución**: Usar Live Server como se indica arriba

### "No veo el botón Go Live"
- **Causa**: Live Server no detecta archivos HTML
- **Solución**: Abrir `index.html` en el editor de VS Code