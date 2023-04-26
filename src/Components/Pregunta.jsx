import React from 'react'
import {Link } from "react-router-dom";
const Pregunta = ({numeroPregunta,descripcionPregunta,capturaVideo}) => {
  console.log(capturaVideo);
  return (
    <div>
        {capturaVideo?<video playsInline controls src={capturaVideo}></video>:""}
        <h1>pregunta {numeroPregunta}</h1>
        
        <Link to={`preguntas/${numeroPregunta}`}>
          {descripcionPregunta}
        </Link>
    </div>
  )
}

export default Pregunta