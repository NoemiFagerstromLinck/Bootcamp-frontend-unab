function crearArregloDoble(n) {
    if (n <= 0) {
        return [];
    }
    
    const arreglo = [];
    arreglo[0] = 1;
    
    for (let i = 1; i < n; i++) {
        arreglo[i] = arreglo[i - 1] * 2;
    }
    
    return arreglo;
}

console.log("=== Función 1: Crear arreglo con doble ===");
console.log("crearArregloDoble(5):", crearArregloDoble(5));
console.log("crearArregloDoble(8):", crearArregloDoble(8));

function obtenerMayorNumero(arreglo) {
    if (!arreglo || arreglo.length !== 10) {
        throw new Error("El arreglo debe tener exactamente 10 elementos");
    }
    
    let mayor = arreglo[0];
    
    for (let i = 1; i < arreglo.length; i++) {
        if (arreglo[i] > mayor) {
            mayor = arreglo[i];
        }
    }
    
    return mayor;
}

console.log("\n=== Función 2: Obtener mayor número ===");
const arregloTest = [3, 7, 2, 9, 15, 1, 8, 12, 4, 6];
console.log("Arreglo:", arregloTest);
console.log("Mayor número:", obtenerMayorNumero(arregloTest));

function obtenerDiaSemana(numeroDia) {
    const diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
    ];
    
    if (numeroDia < 1 || numeroDia > 7) {
        throw new Error("El número del día debe estar entre 1 y 7");
    }
    
    return diasSemana[numeroDia - 1];
}

console.log("\n=== Función 3: Obtener día de la semana ===");
console.log("Día 1:", obtenerDiaSemana(1));
console.log("Día 3:", obtenerDiaSemana(3));
console.log("Día 7:", obtenerDiaSemana(7));

function buscarElemento(arreglo, elemento) {
    if (!arreglo || arreglo.length > 100) {
        throw new Error("El arreglo no puede ser nulo y debe tener máximo 100 elementos");
    }
    
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === elemento) {
            return i;
        }
    }
    
    return -1;
}

function existeElemento(arreglo, elemento) {
    return buscarElemento(arreglo, elemento) !== -1;
}

console.log("\n=== Función 4: Buscar elemento ===");
const arregloNumeros = [10, 25, 3, 17, 8, 45, 12, 99, 5, 33];
console.log("Arreglo:", arregloNumeros);
console.log("Buscar 17:", buscarElemento(arregloNumeros, 17));
console.log("Buscar 100:", buscarElemento(arregloNumeros, 100));
console.log("¿Existe 45?", existeElemento(arregloNumeros, 45));
console.log("¿Existe 200?", existeElemento(arregloNumeros, 200));

function ordenarArregloAscendente(arreglo) {
    if (!arreglo) {
        throw new Error("El arreglo no puede ser nulo");
    }
    
    const arregloOrdenado = [...arreglo];
    
    for (let i = 0; i < arregloOrdenado.length - 1; i++) {
        for (let j = 0; j < arregloOrdenado.length - i - 1; j++) {
            if (arregloOrdenado[j] > arregloOrdenado[j + 1]) {
                let temp = arregloOrdenado[j];
                arregloOrdenado[j] = arregloOrdenado[j + 1];
                arregloOrdenado[j + 1] = temp;
            }
        }
    }
    
    return arregloOrdenado;
}

function ordenarArregloNativo(arreglo) {
    if (!arreglo) {
        throw new Error("El arreglo no puede ser nulo");
    }
    
    return [...arreglo].sort((a, b) => a - b);
}

console.log("\n=== Función 5: Ordenar arreglo ascendente ===");
const arregloDesordenado = [64, 34, 25, 12, 22, 11, 90];
console.log("Arreglo original:", arregloDesordenado);
console.log("Ordenado (burbuja):", ordenarArregloAscendente(arregloDesordenado));
console.log("Ordenado (nativo):", ordenarArregloNativo(arregloDesordenado));
console.log("Original sin cambios:", arregloDesordenado);

console.log("\n" + "=".repeat(50));
console.log("EJECUTANDO TODAS LAS FUNCIONES");
console.log("=".repeat(50));