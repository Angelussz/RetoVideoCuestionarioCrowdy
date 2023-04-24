// function encontrarPregunta(numeroPregunta) {
//   const preguntaEncontrada = preguntas.find(pregunta => pregunta.numeroPregunta === numeroPregunta);
//   if (preguntaEncontrada) {
//     return preguntas.indexOf(preguntaEncontrada);
//   } else {
//     return -1;
//   }
// }
import { useHistory, useLocation } from "react-router-dom";

function Pagina1() {
  const history = useHistory();
  const location = useLocation();

  // Manejar el botón de adelante
  const handleNext = () => {
    // Obtener el índice de la página actual
    const currentIndex = parseInt(location.pathname.slice(1));
    // Calcular el índice de la siguiente página en el ciclo circular
    const nextIndex = currentIndex % 4 + 1;
    // Ir a la siguiente página
    history.push(`/${nextIndex}`);
  };

  // Manejar el botón de atrás
  const handleBack = () => {
    // Obtener el índice de la página actual
    const currentIndex = parseInt(location.pathname.slice(1));
    // Calcular el índice de la página anterior en el ciclo circular
    const backIndex = currentIndex === 1 ? 4 : currentIndex - 1;
    // Ir a la página anterior
    history.push(`/${backIndex}`);
  };

  return (
    <div>
      <h1>Página 1</h1>
      <button onClick={handleBack}>Atrás</button>
      <button onClick={handleNext}>Adelante</button>
    </div>
  );
}


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pagina1 from "./Pagina1";
import Pagina2 from "./Pagina2";
import Pagina3 from "./Pagina3";
import Pagina4 from "./Pagina4";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Pagina1} />
        <Route exact path="/2" component={Pagina2} />
        <Route exact path="/3" component={Pagina3} />
        <Route exact path="/4" component={Pagina4} />
      </Switch>
    </Router>
  );
}

export default App;

const arr = [1, 2, 3, 4, 5];

// Invertir el orden del arreglo
arr.reverse();

// Buscar el primer número par desde el final del arreglo
const found = arr.find(num => num % 2 === 0);

console.log(found); // Output: 4

/****************
 */

// Obtener acceso a la cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(mediaStream) {
    // Obtener el objeto MediaStreamTrack correspondiente al video
    const videoTrack = mediaStream.getVideoTracks()[0];

    // Detener la transmisión de video
    videoTrack.stop();
  })
  .catch(function(error) {
    console.error('Error al obtener acceso a la cámara:', error);
  });

  /********************* */

  // Obtener acceso a la cámara y el micrófono
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(function(mediaStream) {
    // Obtener el objeto MediaStreamTrack correspondiente al video
    const videoTrack = mediaStream.getVideoTracks()[0];

    // Obtener el objeto MediaStreamTrack correspondiente al audio
    const audioTrack = mediaStream.getAudioTracks()[0];

    // Detener la transmisión de video y audio
    videoTrack.stop();
    audioTrack.stop();
  })
  .catch(function(error) {
    console.error('Error al obtener acceso a la cámara y el micrófono:', error);
  });
