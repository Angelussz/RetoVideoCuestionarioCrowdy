export const preguntas = [
  {
    numeroPregunta:1,
    pregunta:"Cual fue tu videojuego favorito durante la infancia?",
    respuesta:null,
    terminado:false
  },
  {
    numeroPregunta:2,
    pregunta:"Cual fue tu videojuego favorito durante la infancia?",
    respuesta:null,
    terminado:false
  },
  {
    numeroPregunta:3,
    pregunta:"Cual fue tu videojuego favorito durante la infancia?",
    respuesta:null,
    terminado:false
  },
  {
    numeroPregunta:4,
    pregunta:"Cual fue tu videojuego favorito durante la infancia?",
    respuesta:null,
    terminado:false
  }
]

export const getPregunta =  (numeroPregunta)=>{
    
    const preguntaEncontrada =  preguntas.find((pregunta)=> pregunta.numeroPregunta === numeroPregunta)
    
    return preguntaEncontrada
}