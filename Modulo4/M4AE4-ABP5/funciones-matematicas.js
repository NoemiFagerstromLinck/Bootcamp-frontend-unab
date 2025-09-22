function calcularSumatoria(n) {
    if (n <= 0 || n >= 100) {
        throw new Error("El número debe ser mayor que 0 y menor que 100");
    }
    
    let suma = 0;
    for (let i = 1; i <= n; i++) {
        suma += i;
    }
    
    return suma;
}

console.log("=== Función 1: Sumatoria de 1 hasta n ===");
console.log("calcularSumatoria(5):", calcularSumatoria(5));
console.log("calcularSumatoria(10):", calcularSumatoria(10));

function esPrimo(numero) {
    if (numero <= 1) {
        return false;
    }
    
    if (numero === 2) {
        return true;
    }
    
    if (numero % 2 === 0) {
        return false;
    }
    
    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) {
            return false;
        }
    }
    
    return true;
}

console.log("\n=== Función 2: Verificar número primo ===");
console.log("esPrimo(7):", esPrimo(7));
console.log("esPrimo(10):", esPrimo(10));
console.log("esPrimo(17):", esPrimo(17));

function cuentaRegresiva(n) {
    if (n <= 0 || n >= 100) {
        throw new Error("El número debe ser mayor que 0 y menor que 100");
    }
    
    const resultado = [];
    for (let i = n; i >= 1; i--) {
        resultado.push(i);
    }
    
    return resultado;
}

console.log("\n=== Función 3: Cuenta regresiva ===");
console.log("cuentaRegresiva(5):", cuentaRegresiva(5));
console.log("cuentaRegresiva(8):", cuentaRegresiva(8));

function sumaPares(n) {
    if (n <= 10 || n >= 1000) {
        throw new Error("El número debe ser mayor que 10 y menor que 1000");
    }
    
    let suma = 0;
    for (let i = 2; i <= n; i += 2) {
        suma += i;
    }
    
    return suma;
}

console.log("\n=== Función 4: Suma números pares ===");
console.log("sumaPares(20):", sumaPares(20));
console.log("sumaPares(50):", sumaPares(50));

function tablaMultiplicar(n) {
    const tabla = [];
    for (let i = 1; i <= 12; i++) {
        tabla.push(`${n} x ${i} = ${n * i}`);
    }
    
    return tabla;
}

console.log("\n=== Función 5: Tabla de multiplicar ===");
console.log("tablaMultiplicar(7):");
tablaMultiplicar(7).forEach(linea => console.log(linea));

function ordenarArreglo(arreglo) {
    if (!arreglo || !Array.isArray(arreglo)) {
        throw new Error("Debe proporcionar un arreglo válido");
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

console.log("\n=== Función 6: Ordenar arreglo ===");
const arrayDesordenado = [64, 34, 25, 12, 22, 11, 90];
console.log("Arreglo original:", arrayDesordenado);
console.log("Arreglo ordenado:", ordenarArreglo(arrayDesordenado));

console.log("\n" + "=".repeat(50));
console.log("EJECUTANDO TODAS LAS FUNCIONES MATEMÁTICAS");
console.log("=".repeat(50));