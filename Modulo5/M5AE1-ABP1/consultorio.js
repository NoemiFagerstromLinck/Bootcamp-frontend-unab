function Paciente(nombre, apellido, edad, rut, diagnostico) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._edad = edad;
    this._rut = rut;
    this._diagnostico = diagnostico;
}

Paciente.prototype.getNombre = function() {
    return this._nombre;
};

Paciente.prototype.setNombre = function(nombre) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('El nombre debe ser una cadena de texto válida');
    }
    this._nombre = nombre.trim();
};

Paciente.prototype.getApellido = function() {
    return this._apellido;
};

Paciente.prototype.setApellido = function(apellido) {
    if (typeof apellido !== 'string' || apellido.trim() === '') {
        throw new Error('El apellido debe ser una cadena de texto válida');
    }
    this._apellido = apellido.trim();
};

Paciente.prototype.getEdad = function() {
    return this._edad;
};

Paciente.prototype.setEdad = function(edad) {
    if (typeof edad !== 'number' || edad < 0 || edad > 150) {
        throw new Error('La edad debe ser un número válido entre 0 y 150');
    }
    this._edad = edad;
};

Paciente.prototype.getRut = function() {
    return this._rut;
};

Paciente.prototype.setRut = function(rut) {
    if (typeof rut !== 'string' || rut.trim() === '') {
        throw new Error('El RUT debe ser una cadena de texto válida');
    }
    this._rut = rut.trim();
};

Paciente.prototype.getDiagnostico = function() {
    return this._diagnostico;
};

Paciente.prototype.setDiagnostico = function(diagnostico) {
    if (typeof diagnostico !== 'string' || diagnostico.trim() === '') {
        throw new Error('El diagnóstico debe ser una cadena de texto válida');
    }
    this._diagnostico = diagnostico.trim();
};

Paciente.prototype.getDatos = function() {
    return {
        nombre: this._nombre,
        apellido: this._apellido,
        edad: this._edad,
        rut: this._rut,
        diagnostico: this._diagnostico
    };
};

Paciente.prototype.getNombreCompleto = function() {
    return this._nombre + ' ' + this._apellido;
};

function Consultorio(nombre) {
    this._nombre = nombre;
    this._pacientes = [];
}

Consultorio.prototype.agregarPaciente = function(paciente) {
    if (!(paciente instanceof Paciente)) {
        throw new Error('Solo se pueden agregar instancias de Paciente');
    }
    this._pacientes.push(paciente);
};

Consultorio.prototype.mostrarTodos = function() {
    console.log('='.repeat(60));
    console.log('LISTA DE TODOS LOS PACIENTES REGISTRADOS');
    console.log('='.repeat(60));
    
    if (this._pacientes.length === 0) {
        console.log('No hay pacientes registrados en el consultorio.');
        return;
    }
    
    for (var i = 0; i < this._pacientes.length; i++) {
        var paciente = this._pacientes[i];
        console.log('Paciente #' + (i + 1));
        console.log('   Nombre: ' + paciente.getNombre());
        console.log('   Apellido: ' + paciente.getApellido());
        console.log('   Edad: ' + paciente.getEdad() + ' años');
        console.log('   RUT: ' + paciente.getRut());
        console.log('   Diagnóstico: ' + paciente.getDiagnostico());
        console.log('-'.repeat(40));
    }
    
    console.log('Total de pacientes: ' + this._pacientes.length);
    console.log('='.repeat(60));
};

Consultorio.prototype.buscarPorNombre = function(nombre) {
    console.log('='.repeat(60));
    console.log('BÚSQUEDA DE PACIENTES POR NOMBRE: "' + nombre + '"');
    console.log('='.repeat(60));
    
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        console.log('Error: Debe proporcionar un nombre válido para buscar.');
        return [];
    }
    
    var nombreBusqueda = nombre.toLowerCase().trim();
    var pacientesEncontrados = [];
    
    for (var i = 0; i < this._pacientes.length; i++) {
        var paciente = this._pacientes[i];
        var nombreCompleto = (paciente.getNombre() + ' ' + paciente.getApellido()).toLowerCase();
        var nombre = paciente.getNombre().toLowerCase();
        var apellido = paciente.getApellido().toLowerCase();
        
        if (nombre.indexOf(nombreBusqueda) !== -1 || 
            apellido.indexOf(nombreBusqueda) !== -1 || 
            nombreCompleto.indexOf(nombreBusqueda) !== -1) {
            pacientesEncontrados.push(paciente);
        }
    }
    
    if (pacientesEncontrados.length === 0) {
        console.log('No se encontraron pacientes con el nombre "' + nombre + '"');
        console.log('Sugerencia: Verifique la ortografía o intente con un nombre parcial.');
    } else {
        console.log('Se encontraron ' + pacientesEncontrados.length + ' paciente(s):');
        console.log('');
        
        for (var i = 0; i < pacientesEncontrados.length; i++) {
            var paciente = pacientesEncontrados[i];
            console.log('Resultado #' + (i + 1));
            console.log('   Nombre: ' + paciente.getNombre());
            console.log('   Apellido: ' + paciente.getApellido());
            console.log('   Edad: ' + paciente.getEdad() + ' años');
            console.log('   RUT: ' + paciente.getRut());
            console.log('   Diagnóstico: ' + paciente.getDiagnostico());
            console.log('-'.repeat(40));
        }
    }
    
    console.log('='.repeat(60));
    return pacientesEncontrados;
};

Consultorio.prototype.getNombre = function() {
    return this._nombre;
};

Consultorio.prototype.getTotalPacientes = function() {
    return this._pacientes.length;
};

console.log('INICIANDO SISTEMA DE GESTIÓN DE PACIENTES');
console.log('Creando instancias de objetos...');

var consultorio = new Consultorio('Consultorio Médico San Juan');

var paciente1 = new Paciente('Juan', 'Pérez', 35, '12.345.678-9', 'Hipertensión arterial');
var paciente2 = new Paciente('María', 'González', 28, '98.765.432-1', 'Diabetes tipo 2');
var paciente3 = new Paciente('Carlos', 'Rodríguez', 45, '11.222.333-4', 'Artritis reumatoide');
var paciente4 = new Paciente('Ana', 'Martínez', 52, '55.666.777-8', 'Gastritis crónica');
var paciente5 = new Paciente('Luis', 'Fernández', 31, '22.333.444-5', 'Migraña crónica');
var paciente6 = new Paciente('Carmen', 'López', 67, '77.888.999-0', 'Osteoporosis');

consultorio.agregarPaciente(paciente1);
consultorio.agregarPaciente(paciente2);
consultorio.agregarPaciente(paciente3);
consultorio.agregarPaciente(paciente4);
consultorio.agregarPaciente(paciente5);
consultorio.agregarPaciente(paciente6);

console.log('Sistema inicializado correctamente!');
console.log('Consultorio: ' + consultorio.getNombre());
console.log('Pacientes registrados: ' + consultorio.getTotalPacientes());
console.log('');

consultorio.mostrarTodos();

console.log('');
consultorio.buscarPorNombre('Juan');
consultorio.buscarPorNombre('María');
consultorio.buscarPorNombre('Carlos');

console.log('='.repeat(60));
console.log('DEMOSTRACIÓN DE GETTERS Y SETTERS');
console.log('='.repeat(60));

console.log('Datos originales del paciente1:');
console.log('   Nombre: ' + paciente1.getNombre());
console.log('   Apellido: ' + paciente1.getApellido());
console.log('   Edad: ' + paciente1.getEdad());
console.log('   RUT: ' + paciente1.getRut());
console.log('   Diagnóstico: ' + paciente1.getDiagnostico());

console.log('');
console.log('Modificando datos usando setters...');
paciente1.setNombre('Juan Carlos');
paciente1.setEdad(36);
paciente1.setDiagnostico('Hipertensión arterial controlada');

console.log('');
console.log('Datos modificados del paciente1:');
console.log('   Nombre: ' + paciente1.getNombre());
console.log('   Apellido: ' + paciente1.getApellido());
console.log('   Edad: ' + paciente1.getEdad());
console.log('   RUT: ' + paciente1.getRut());
console.log('   Diagnóstico: ' + paciente1.getDiagnostico());

console.log('='.repeat(60));

console.log('');
console.log('COMANDOS DISPONIBLES PARA INTERACTUAR:');
console.log('');
console.log('Para mostrar todos los pacientes:');
console.log('   consultorio.mostrarTodos()');
console.log('');
console.log('Para buscar pacientes por nombre:');
console.log('   consultorio.buscarPorNombre("Juan")');
console.log('   consultorio.buscarPorNombre("María")');
console.log('   consultorio.buscarPorNombre("Pérez")');
console.log('');
console.log('Para acceder a datos de un paciente específico:');
console.log('   paciente1.getNombre()');
console.log('   paciente1.getApellido()');
console.log('   paciente1.getEdad()');
console.log('   paciente1.getDatos()');
console.log('');
console.log('Para modificar datos de un paciente:');
console.log('   paciente1.setNombre("Nuevo Nombre")');
console.log('   paciente1.setEdad(40)');
console.log('   paciente1.setDiagnostico("Nuevo Diagnóstico")');
console.log('');
console.log('Variables disponibles:');
console.log('   - consultorio (instancia de Consultorio)');
console.log('   - paciente1, paciente2, ..., paciente6 (instancias de Paciente)');
console.log('');
console.log('='.repeat(60));
console.log('SISTEMA LISTO PARA USAR - ¡Prueba los comandos anteriores!');
console.log('='.repeat(60));