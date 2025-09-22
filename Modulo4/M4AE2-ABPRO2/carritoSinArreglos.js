var producto1 = "Camiseta";
var precio1 = 12000;
var producto2 = "Pantalón";
var precio2 = 18000;
var producto3 = "Zapatos";
var precio3 = 25000;

var totalNeto = 0;
var cantidad1 = 0;
var cantidad2 = 0;
var cantidad3 = 0;

var seguir = true;

while (seguir) {
    var menu = "*** Carrito de Compras ***\n";
    menu += "1. " + producto1 + " ($" + precio1 + ")\n";
    menu += "2. " + producto2 + " ($" + precio2 + ")\n";
    menu += "3. " + producto3 + " ($" + precio3 + ")\n";
    menu += "4. Terminar compra\n";
    var opcion = prompt(menu + "Elige una opción (1-4):");

    if (opcion === "1") {
        var cant = parseInt(prompt("¿Cuántas " + producto1 + " quieres comprar?"));
        if (!isNaN(cant) && cant > 0) {
            cantidad1 += cant;
            totalNeto += precio1 * cant;
        }
    } else if (opcion === "2") {
        var cant = parseInt(prompt("¿Cuántos " + producto2 + " quieres comprar?"));
        if (!isNaN(cant) && cant > 0) {
            cantidad2 += cant;
            totalNeto += precio2 * cant;
        }
    } else if (opcion === "3") {
        var cant = parseInt(prompt("¿Cuántos " + producto3 + " quieres comprar?"));
        if (!isNaN(cant) && cant > 0) {
            cantidad3 += cant;
            totalNeto += precio3 * cant;
        }
    } else if (opcion === "4") {
        seguir = false;
    } else {
        alert("Opción no válida. Intenta de nuevo.");
    }
}

var iva = totalNeto * 0.19;
var despacho = totalNeto > 50000 ? 0 : 3000;
var totalFinal = totalNeto + iva + despacho;

console.log(
    "%cResumen de tu compra:\n" +
    "--------------------------\n" +
    producto1 + ": " + cantidad1 + " x $" + precio1 + " = $" + (cantidad1 * precio1) + "\n" +
    producto2 + ": " + cantidad2 + " x $" + precio2 + " = $" + (cantidad2 * precio2) + "\n" +
    producto3 + ": " + cantidad3 + " x $" + precio3 + " = $" + (cantidad3 * precio3) + "\n" +
    "--------------------------\n" +
    "Total Neto: $" + totalNeto + "\n" +
    "IVA (19%): $" + iva.toFixed(0) + "\n" +
    "Despacho: $" + despacho + "\n" +
    "--------------------------\n" +
    "Total a pagar: $" + totalFinal.toFixed(0),
    "background: #fce4ec; color: #6a1b9a; font-size: 16px; padding: 8px; border-radius: 8px;"
);

alert("¡Gracias por tu compra! Revisa el resumen en la consola.");
