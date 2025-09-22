const Sala = {
    crearSala: function(id, capacidad) {
        return {
            id: id,
            capacidad: capacidad,
            asientosDisponibles: Array.from({length: capacidad}, (_, i) => `A${i + 1}`),
            asientosReservados: [],
            
            reservarAsiento: function(asiento) {
                const indice = this.asientosDisponibles.indexOf(asiento);
                if (indice !== -1) {
                    this.asientosDisponibles.splice(indice, 1);
                    this.asientosReservados.push(asiento);
                    return {
                        exito: true,
                        mensaje: `Asiento ${asiento} reservado exitosamente en la sala ${this.id}`
                    };
                } else {
                    return {
                        exito: false,
                        mensaje: `El asiento ${asiento} no está disponible o no existe`
                    };
                }
            },
            
            cancelarReserva: function(asiento) {
                const indice = this.asientosReservados.indexOf(asiento);
                if (indice !== -1) {
                    this.asientosReservados.splice(indice, 1);
                    this.asientosDisponibles.push(asiento);
                    this.asientosDisponibles.sort((a, b) => {
                        const numA = parseInt(a.substring(1));
                        const numB = parseInt(b.substring(1));
                        return numA - numB;
                    });
                    return {
                        exito: true,
                        mensaje: `Reserva del asiento ${asiento} cancelada exitosamente`
                    };
                } else {
                    return {
                        exito: false,
                        mensaje: `El asiento ${asiento} no está reservado`
                    };
                }
            },
            
            mostrarDisponibles: function() {
                return {
                    disponibles: [...this.asientosDisponibles],
                    reservados: [...this.asientosReservados],
                    totalDisponibles: this.asientosDisponibles.length,
                    totalReservados: this.asientosReservados.length,
                    capacidadTotal: this.capacidad
                };
            }
        };
    }
};

const Cine = {
    nombre: "Cine Kawaii Palace",
    salas: {},
    capacidadPorSala: 20,
    
    crearSala: function(numeroSala) {
        const sala = Sala.crearSala(numeroSala, this.capacidadPorSala);
        this.salas[numeroSala] = sala;
        return sala;
    },
    
    obtenerSala: function(numeroSala) {
        if (this.salas[numeroSala]) {
            return this.salas[numeroSala];
        } else {
            throw new Error(`La sala ${numeroSala} no existe`);
        }
    },
    
    reservarAsiento: function(numeroSala, asiento) {
        try {
            const sala = this.obtenerSala(numeroSala);
            return sala.reservarAsiento(asiento);
        } catch (error) {
            return {
                exito: false,
                mensaje: error.message
            };
        }
    },
    
    cancelarReserva: function(numeroSala, asiento) {
        try {
            const sala = this.obtenerSala(numeroSala);
            return sala.cancelarReserva(asiento);
        } catch (error) {
            return {
                exito: false,
                mensaje: error.message
            };
        }
    },
    
    mostrarDisponibles: function(numeroSala) {
        try {
            const sala = this.obtenerSala(numeroSala);
            return sala.mostrarDisponibles();
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
    
    obtenerEstadoGeneral: function() {
        const estado = {
            nombre: this.nombre,
            totalSalas: Object.keys(this.salas).length,
            salas: {}
        };
        
        for (let numeroSala in this.salas) {
            estado.salas[numeroSala] = this.salas[numeroSala].mostrarDisponibles();
        }
        
        return estado;
    }
};

Cine.crearSala(1);
Cine.crearSala(2);
Cine.crearSala(3);

console.log("=== Sistema de Gestión de Cine ===");
console.log("Cine creado:", Cine.nombre);
console.log("Salas disponibles:", Object.keys(Cine.salas));

console.log("\n=== Datos de Prueba ===");
console.log("Reservando asientos...");
console.log(Cine.reservarAsiento(1, "A1"));
console.log(Cine.reservarAsiento(1, "A5"));
console.log(Cine.reservarAsiento(2, "A3"));
console.log(Cine.reservarAsiento(1, "A10"));

console.log("\nIntentando reservar asiento ya ocupado:");
console.log(Cine.reservarAsiento(1, "A1"));

console.log("\nCancelando reserva:");
console.log(Cine.cancelarReserva(1, "A5"));

console.log("\nEstado final de las salas:");
console.log("Sala 1:", Cine.mostrarDisponibles(1));
console.log("Sala 2:", Cine.mostrarDisponibles(2));

console.log("\nEstado general del cine:");
console.log(Cine.obtenerEstadoGeneral());