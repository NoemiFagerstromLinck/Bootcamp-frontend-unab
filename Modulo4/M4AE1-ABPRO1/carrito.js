const producto1 = "audifonos ps5";
const precio1 = 100000;

const producto2 = "control ps5";
const precio2 = 75000;

const producto3 = "juego spiderman";
const precio3 = 50000;
let seleccion1 = true;
let cantidad1 = 2;

let seleccion2 = false;
let cantidad2 = 1;

let seleccion3 = true;
let cantidad3 = 1;

let total = 0;

if (seleccion1 === true) {
    total = total + (precio1 * cantidad1);
}

if (seleccion2 === true) {
    total = total + (precio2 * cantidad2);
}

if (seleccion3 === true) {
    total = total + (precio3 * cantidad3);
}

let iva = 0;
let despacho = 0;
let totalFinal = 0;

if (total > 0) {
    iva = total * 0.19;
} else {
    iva = 0;
}

if (total < 50000) {
    despacho = 5000;
} else if (total >= 50000 && total < 100000) {
    despacho = 3000;
} else {
    despacho = 0;
}

totalFinal = total + iva + despacho;

console.log("Valor neto: $" + total);
console.log("IVA (19%): $" + iva);
console.log("Despacho: $" + despacho);
console.log("TOTAL FINAL: $" + totalFinal);
