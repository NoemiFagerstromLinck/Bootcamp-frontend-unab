export const pokemonDetails = {
  "1": {
    nombre: "bulbasaur",
    tipo: ["Planta", "Veneno"],
    altura: "0.7 m",
    peso: "6.9 kg",
    categoria: "Pokémon Semilla",
    habilidades: [
      {
        nombre: "Espesura",
        descripcion: "Potencia los movimientos de tipo Planta cuando los PS están bajos."
      },
      {
        nombre: "Clorofila",
        descripcion: "Duplica la Velocidad cuando hay sol intenso."
      }
    ],
    descripcion: "Bulbasaur puede sobrevivir durante días sin comer. El bulbo de su lomo almacena energía. Cuanto más energía, más grande y pesado se vuelve el bulbo.",
    stats: {
      hp: 45,
      ataque: 49,
      defensa: 49,
      velocidad: 45
    },
    color: "#78C850"
  },
  "4": {
    nombre: "charmander",
    tipo: ["Fuego"],
    altura: "0.6 m",
    peso: "8.5 kg",
    categoria: "Pokémon Lagarto",
    habilidad: [
      {
        nombre: "Mar Llamas",
        descripcion: "Potencia los movimientos de tipo Fuego cuando los PS están bajos."
      },
      {
        nombre: "Poder Solar", 
        descripcion: "Bajo la luz del sol, aumenta el Ataque Especial pero pierde PS cada turno."
      }
    ],
    descripcion: "La llama de su cola indica las emociones de Charmander. La llama oscila cuando está alegre y arde vigorosamente cuando está enfadado.",
    stats: {
      hp: 39,
      ataque: 52,
      defensa: 43,
      velocidad: 65
    },
    color: "#F08030"
  },
  "7": {
    nombre: "squirtle",
    tipo: ["Agua"],
    altura: "0.5 m",
    peso: "9.0 kg",
    categoria: "Pokémon Tortuga Tiny",
    habilidades: [
      {
        nombre: "Torrente",
        descripcion: "Potencia los movimientos de tipo Agua cuando los PS están bajos."
      },
      {
        nombre: "Lluvia",
        descripcion: "Invoca lluvia que potencia los movimientos de tipo Agua."
      }
    ],
    descripcion: "El caparazón de Squirtle se endurece tras su nacimiento. Su caparazón se vuelve más resistente cuando Squirtle se retrae dentro de él.",
    stats: {
      hp: 44,
      ataque: 48,
      defensa: 65,
      velocidad: 43
    },
    color: "#6890F0"
  },
  "25": {
    nombre: "pikachu",
    tipo: ["Eléctrico"],
    altura: "0.4 m",
    peso: "6.0 kg",
    categoria: "Pokémon Ratón",
    habilidades: [
      {
        nombre: "Electricidad Estática",
        descripcion: "Puede paralizar al Pokémon rival si este usa un ataque de contacto."
      },
      {
        nombre: "Pararrayos",
        descripcion: "Atrae los movimientos de tipo Eléctrico y aumenta el Ataque Especial."
      }
    ],
    descripcion: "Pikachu almacena electricidad en las bolsas de sus mejillas. Estas se cargan mientras duerme. Ocasionalmente descarga electricidad cuando no está alerta.",
    stats: {
      hp: 35,
      ataque: 55,
      defensa: 40,
      velocidad: 90
    },
    color: "#F8D030"
  },
  "252": {
    nombre: "treecko",
    tipo: ["Planta"],
    altura: "0.5 m",
    peso: "5.0 kg",
    categoria: "Pokémon Gecko Selva",
    habilidades: [
      {
        nombre: "Espesura",
        descripcion: "Potencia los movimientos de tipo Planta cuando los PS están bajos."
      },
      {
        nombre: "Alivio",
        descripcion: "Cura las alteraciones de estado al cambiar de Pokémon."
      }
    ],
    descripcion: "Treecko tiene pequeños ganchos en las plantas de los pies que le permiten caminar por paredes verticales. Este Pokémon ataca golpeando al enemigo con su gruesa cola.",
    stats: {
      hp: 40,
      ataque: 45,
      defensa: 35,
      velocidad: 70
    },
    color: "#78C850"
  },
  "255": {
    nombre: "torchic",
    tipo: ["Fuego"],
    altura: "0.4 m",
    peso: "2.5 kg",
    categoria: "Pokémon Pollito",
    habilidad: ["Mar Llamas"],
    descripcion: "Torchic tiene un lugar en el que guarda las llamas. Dale un abrazo: notarás el calor que emana de su estómago. Este Pokémon está cubierto de un plumón suave.",
    stats: {
      hp: 45,
      ataque: 60,
      defensa: 40,
      velocidad: 45
    },
    color: "#F08030"
  },
  "258": {
    nombre: "mudkip",
    tipo: ["Agua"],
    altura: "0.4 m",
    peso: "7.6 kg",
    categoria: "Pokémon Pez Fango",
    habilidad: ["Torrente"],
    descripcion: "Mudkip usa la aleta de la cabeza para detectar las corrientes de aire y agua. Esta aleta es muy sensible. Le permite saber qué está pasando a su alrededor sin usar los ojos.",
    stats: {
      hp: 50,
      ataque: 70,
      defensa: 50,
      velocidad: 40
    },
    color: "#6890F0"
  },
  "382": {
    nombre: "kyogre",
    tipo: ["Agua"],
    altura: "4.5 m",
    peso: "352.0 kg",
    categoria: "Pokémon Cuenca Marina",
    habilidad: ["Llovizna"],
    descripcion: "Kyogre tiene el poder de hacer que caigan lluvias torrenciales y de formar tifones. Este Pokémon salvó a la gente que sufría de sequías haciendo caer nubes cargadas de agua.",
    stats: {
      hp: 100,
      ataque: 100,
      defensa: 90,
      velocidad: 90
    },
    color: "#6890F0"
  },
  "383": {
    nombre: "groudon",
    tipo: ["Tierra"],
    altura: "3.5 m",
    peso: "950.0 kg",
    categoria: "Pokémon Continental",
    habilidad: ["Sequía"],
    descripcion: "Groudon tiene el poder de dispersar las nubes de lluvia y hacer que el agua se evapore con luz solar intensa. Apareció como salvador de la gente que había sufrido inundaciones.",
    stats: {
      hp: 100,
      ataque: 150,
      defensa: 140,
      velocidad: 90
    },
    color: "#E0C068"
  },
  "384": {
    nombre: "rayquaza",
    tipo: ["Dragón", "Volador"],
    altura: "7.0 m",
    peso: "206.5 kg",
    categoria: "Pokémon Celestial",
    habilidad: ["Corriente de Aire"],
    descripcion: "Rayquaza vive en la capa de ozono, donde se alimenta de agua y partículas. Este Pokémon parece descender del cielo cuando Kyogre y Groudon pelean.",
    stats: {
      hp: 105,
      ataque: 150,
      defensa: 90,
      velocidad: 95
    },
    color: "#76D7C4"
  },
  "39": {
    nombre: "jigglypuff",
    tipo: ["Normal", "Hada"],
    altura: "0.5 m",
    peso: "5.5 kg",
    categoria: "Pokémon Globo",
    habilidad: ["Encanto", "Competitivo"],
    descripcion: "Jigglypuff tiene unos ojos grandes y redondos. Cuando los abre completamente, entona una melodía misteriosa que hace que quien la oiga se quede dormido.",
    stats: {
      hp: 115,
      ataque: 45,
      defensa: 20,
      velocidad: 20
    },
    color: "#F85888"
  },
  "54": {
    nombre: "psyduck",
    tipo: ["Agua"],
    altura: "0.8 m",
    peso: "19.6 kg",
    categoria: "Pokémon Pato",
    habilidad: ["Despiste", "Nubosidad"],
    descripcion: "Psyduck usa poderes psíquicos. Si no controla estos poderes, le da dolor de cabeza. Parece que le duele mucho cuando le dan estos dolores.",
    stats: {
      hp: 50,
      ataque: 52,
      defensa: 48,
      velocidad: 55
    },
    color: "#F8D030"
  },
  "133": {
    nombre: "eevee",
    tipo: ["Normal"],
    altura: "0.3 m",
    peso: "6.5 kg",
    categoria: "Pokémon Evolución",
    habilidad: ["Fuga", "Adaptabilidad"],
    descripcion: "Eevee tiene una composición genética irregular que le permite evolucionar para adaptarse al entorno en el que vive.",
    stats: {
      hp: 55,
      ataque: 55,
      defensa: 50,
      velocidad: 55
    },
    color: "#A8A878"
  },
  "257": {
    nombre: "blaziken",
    tipo: ["Fuego", "Lucha"],
    altura: "1.9 m",
    peso: "52.0 kg",
    categoria: "Pokémon Llama",
    habilidad: ["Mar Llamas"],
    descripcion: "Blaziken tiene unas garras que pueden extenderse como navajas. En combate, expulsa llamaradas por las muñecas y ataca al enemigo con fiereza. Cuanto más fuerte sea el enemigo, más intensas serán las llamas.",
    stats: {
      hp: 80,
      ataque: 120,
      defensa: 70,
      velocidad: 80
    },
    color: "#F08030"
  },
  "260": {
    nombre: "swampert",
    tipo: ["Agua", "Tierra"],
    altura: "1.5 m",
    peso: "81.9 kg",
    categoria: "Pokémon Pez Fango",
    habilidad: ["Torrente"],
    descripcion: "Swampert es muy fuerte. Tiene fuerza suficiente para arrastrar una roca que pese más de una tonelada sin ningún problema. Este Pokémon también tiene muy desarrollada la vista.",
    stats: {
      hp: 100,
      ataque: 110,
      defensa: 90,
      velocidad: 60
    },
    color: "#6890F0"
  }
}

export function getPokemonDetails(id) {
  if (pokemonDetails[id]) {
    const data = pokemonDetails[id]
    return {
      ...data,
      tipos: data.tipo || data.tipos || ["Normal"],
      habilidades: data.habilidades || 
        (data.habilidad ? 
          (Array.isArray(data.habilidad) ? 
            (typeof data.habilidad[0] === 'string' ?
              data.habilidad.map(h => ({ nombre: h, descripcion: `Habilidad especial de ${data.nombre || 'este Pokémon'}.` })) :
              data.habilidad
            ) :
            [{ nombre: data.habilidad, descripcion: `Habilidad especial de ${data.nombre || 'este Pokémon'}.` }]
          ) : 
          [{ nombre: "Sin datos", descripcion: "No hay información disponible." }]
        )
    }
  }
  
  return {
    nombre: "unknown",
    tipos: ["Normal"],
    altura: "1.0 m",
    peso: "10.0 kg",
    categoria: "Pokémon Desconocido",
    habilidades: [{ nombre: "Sin datos", descripcion: "No hay información disponible sobre este Pokémon." }],
    descripcion: "No hay información disponible sobre este Pokémon en la Pokédex de Hoenn.",
    stats: {
      hp: 50,
      ataque: 50,
      defensa: 50,
      velocidad: 50
    },
    color: "#A8A878"
  }
}