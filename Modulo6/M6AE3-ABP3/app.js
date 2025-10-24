const { createApp } = Vue;

createApp({
    data() {
        return {
            estudios: 'universitario',
            diaSeleccionado: ''
        }
    },
    computed: {
        estudiosTexto() {
            const textos = {
                'media': 'Educación Media',
                'universitario': 'Universitario', 
                'magister': 'Magíster',
                'doctorado': 'Doctorado'
            };
            return textos[this.estudios] || 'No seleccionado';
        },
        diaTexto() {
            const textos = {
                'lunes': 'Lunes',
                'martes': 'Martes',
                'miercoles': 'Miércoles', 
                'jueves': 'Jueves',
                'viernes': 'Viernes',
                'sabado': 'Sábado',
                'domingo': 'Domingo'
            };
            return textos[this.diaSeleccionado] || 'No seleccionado';
        }
    }
}).mount('#app');