import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pregunta from './Components/Pregunta'
import { preguntas } from './data/preguntas'


function App() {
  const [count, setCount] = useState(0)
  console.log(preguntas.every(pregunta => pregunta.terminado === true ));
  return (
    <div className="App">
      <h1>Hola</h1>
      {preguntas.map((pregunta)=> <Pregunta key={`pregunta-${pregunta.numeroPregunta}`} numeroPregunta={pregunta.numeroPregunta} descripcionPregunta={pregunta.pregunta} />)}
      {preguntas.every(pregunta=>pregunta.terminado === true) && <button onClick={()=>{
        console.log(preguntas);
      }}>Enviar</button>} 
      
    </div>
  )
}

export default App
