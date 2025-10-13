/**
 * ARCHIVO DE PRUEBAS ADICIONALES
 * Script para validar el correcto funcionamiento del sistema
 * 
 * Para ejecutar estas pruebas:
 * 1. Abre index.html en el navegador
 * 2. Carga este archivo en la consola (opcional)
 * 3. O ejecuta las pruebas manualmente
 */

// =================================================================
// FUNCIÓN DE PRUEBAS AUTOMATIZADAS
// =================================================================

function ejecutarPruebas() {
    console.log('INICIANDO PRUEBAS DEL SISTEMA');
    console.log('='.repeat(60));
    
    var pruebasExitosas = 0;
    var pruebasTotales = 0;
    
    function probar(nombre, condicion) {
        pruebasTotales++;
        if (condicion) {
            console.log('OK: ' + nombre);
            pruebasExitosas++;
        } else {
            console.log('FALLO: ' + nombre);
        }
    }
    
    // Probar creación de pacientes con 'new'
    console.log('Probando creación de objetos...');
    var pacientePrueba = new Paciente('Test', 'Paciente', 30, '12.345.678-9', 'Prueba');
    probar('Crear paciente con constructor', pacientePrueba instanceof Paciente);
    
    var consultorioPrueba = new Consultorio('Consultorio de Prueba');
    probar('Crear consultorio con constructor', consultorioPrueba instanceof Consultorio);
    
    // Probar getters
    console.log('\nProbando getters...');
    probar('Getter nombre funciona', pacientePrueba.getNombre() === 'Test');
    probar('Getter apellido funciona', pacientePrueba.getApellido() === 'Paciente');
    probar('Getter edad funciona', pacientePrueba.getEdad() === 30);
    probar('Getter RUT funciona', pacientePrueba.getRut() === '12.345.678-9');
    probar('Getter diagnóstico funciona', pacientePrueba.getDiagnostico() === 'Prueba');
    
    // Probar setters
    console.log('\nProbando setters...');
    pacientePrueba.setNombre('NuevoNombre');
    probar('Setter nombre funciona', pacientePrueba.getNombre() === 'NuevoNombre');
    
    pacientePrueba.setEdad(35);
    probar('Setter edad funciona', pacientePrueba.getEdad() === 35);
    
    // Probar validaciones
    console.log('\nProbando validaciones...');
    try {
        pacientePrueba.setEdad(-1);
        probar('Validación edad negativa', false);
    } catch (e) {
        probar('Validación edad negativa', true);
    }
    
    try {
        pacientePrueba.setNombre('');
        probar('Validación nombre vacío', false);
    } catch (e) {
        probar('Validación nombre vacío', true);
    }
    
    // Probar métodos del consultorio
    console.log('\nProbando métodos del consultorio...');
    consultorioPrueba.agregarPaciente(pacientePrueba);
    probar('Agregar paciente al consultorio', consultorioPrueba.getTotalPacientes() === 1);
    
    // Probar búsqueda
    console.log('\nProbando búsqueda...');
    var resultados = consultorioPrueba.buscarPorNombre('NuevoNombre');
    probar('Búsqueda por nombre encuentra resultado', resultados.length === 1);
    
    var sinResultados = consultorioPrueba.buscarPorNombre('NoExiste');
    probar('Búsqueda sin resultados', sinResultados.length === 0);
    
    // Probar métodos prototype
    console.log('\nProbando métodos prototype...');
    probar('mostrarTodos es función', typeof consultorio.mostrarTodos === 'function');
    probar('buscarPorNombre es función', typeof consultorio.buscarPorNombre === 'function');
    probar('mostrarTodos está en prototype', Consultorio.prototype.hasOwnProperty('mostrarTodos'));
    probar('buscarPorNombre está en prototype', Consultorio.prototype.hasOwnProperty('buscarPorNombre'));
    
    // Resultados finales
    console.log('\n' + '='.repeat(60));
    console.log('RESULTADOS DE LAS PRUEBAS');
    console.log('='.repeat(60));
    console.log('Pruebas exitosas: ' + pruebasExitosas);
    console.log('Total de pruebas: ' + pruebasTotales);
    console.log('Porcentaje de éxito: ' + Math.round((pruebasExitosas / pruebasTotales) * 100) + '%');
    
    if (pruebasExitosas === pruebasTotales) {
        console.log('¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!');
    } else {
        console.log('Algunas pruebas fallaron. Revisar implementación.');
    }
    
    console.log('='.repeat(60));
}

// =================================================================
// PRUEBAS MANUALES SUGERIDAS
// =================================================================

function mostrarPruebasManuales() {
    console.log('PRUEBAS MANUALES SUGERIDAS');
    console.log('='.repeat(60));
    console.log('');
    console.log('1. Probar mostrar todos los pacientes:');
    console.log('   consultorio.mostrarTodos()');
    console.log('');
    console.log('2. Probar búsquedas exitosas:');
    console.log('   consultorio.buscarPorNombre("Juan")');
    console.log('   consultorio.buscarPorNombre("González")');
    console.log('   consultorio.buscarPorNombre("maria")  // Insensible a mayúsculas');
    console.log('');
    console.log('3. Probar búsquedas sin resultados:');
    console.log('   consultorio.buscarPorNombre("Pedro")');
    console.log('   consultorio.buscarPorNombre("")');
    console.log('');
    console.log('4. Probar getters:');
    console.log('   paciente1.getNombre()');
    console.log('   paciente1.getDatos()');
    console.log('   paciente1.getNombreCompleto()');
    console.log('');
    console.log('5. Probar setters válidos:');
    console.log('   paciente1.setNombre("Juan Carlos")');
    console.log('   paciente1.setEdad(40)');
    console.log('');
    console.log('6. Probar validaciones (deberían dar error):');
    console.log('   paciente1.setEdad(-5)     // Error: edad inválida');
    console.log('   paciente1.setNombre("")   // Error: nombre vacío');
    console.log('');
    console.log('7. Verificar que son instancias correctas:');
    console.log('   paciente1 instanceof Paciente         // true');
    console.log('   consultorio instanceof Consultorio    // true');
    console.log('');
    console.log('='.repeat(60));
}

// =================================================================
// DEMOSTRACIÓN DE CARACTERÍSTICAS AVANZADAS
// =================================================================

function demostrarCaracteristicas() {
    console.log('CARACTERÍSTICAS AVANZADAS DEL SISTEMA');
    console.log('='.repeat(60));
    
    console.log('1. Búsqueda flexible:');
    console.log('   - Busca en nombres y apellidos');
    console.log('   - Insensible a mayúsculas/minúsculas');
    console.log('   - Permite búsquedas parciales');
    console.log('');
    
    console.log('2. Protección de datos:');
    console.log('   - Propiedades privadas (convención _)');
    console.log('   - Validación en setters');
    console.log('   - Mensajes de error descriptivos');
    console.log('');
    
    console.log('3. Arquitectura ES5:');
    console.log('   - Funciones constructoras');
    console.log('   - Métodos en prototype');
    console.log('   - Instanciación con new');
    console.log('');
    
    console.log('4. Información del sistema:');
    console.log('   - Consultorio: ' + consultorio.getNombre());
    console.log('   - Total pacientes: ' + consultorio.getTotalPacientes());
    console.log('   - Métodos disponibles: mostrarTodos, buscarPorNombre');
    console.log('');
    
    console.log('='.repeat(60));
}

// =================================================================
// EJECUTAR PRUEBAS AL CARGAR (OPCIONAL)
// =================================================================

// Descomenta la siguiente línea si quieres que las pruebas se ejecuten automáticamente
// ejecutarPruebas();

console.log('');
console.log('ARCHIVO DE PRUEBAS CARGADO');
console.log('');
console.log('Comandos disponibles:');
console.log('  ejecutarPruebas()        - Ejecuta pruebas automatizadas');
console.log('  mostrarPruebasManuales() - Muestra sugerencias de pruebas manuales');
console.log('  demostrarCaracteristicas() - Muestra características del sistema');
console.log('='.repeat(60));