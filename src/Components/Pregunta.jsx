import React from 'react'
import {Link } from "react-router-dom";
const Pregunta = ({numeroPregunta,descripcionPregunta}) => {
  return (
    <div>
        hola
        <h1>pregunta {numeroPregunta}</h1>
        <Link to={`preguntas/${numeroPregunta}`}>
          {descripcionPregunta}
        </Link>
    </div>
  )
}

export default Pregunta