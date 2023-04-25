import React, { useEffect, useRef, useState } from "react";
import { getPregunta, preguntas } from "../data/preguntas";
import { useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const loader = ({ params }) => {
  const pregunta = getPregunta(parseInt(params.pregunta));
  if (pregunta) {
    return pregunta;
  }
  return null;
};

const Formulario = () => {
  const [respuesta, setRespuesta] = useState("");
  const [responder, setResponder] = useState(false);
  const [cambioVista, setCambioVista] = useState(true);
  const [grabar, setGrabar] = useState(false);
  const pregunta = useLoaderData();
  const refo = useParams(); // Referencia actual
  console.log(refo.pregunta);
  const camara = useRef();
  const reproduccion = useRef();
  const videoDeCamara = useRef();
  const recordedBlobs = useRef(null);
  const mediaRecorder = useRef(null);
  //*agregarRespuesta solo es para pasar si es que no lleno
  const agregarRespuesta = (preguntas, numeroPregunta) => {
    if (respuesta === "") {
      return;
    }
    preguntas.forEach((pregunta) => {
      if (pregunta.numeroPregunta === numeroPregunta) {
        pregunta.respuesta = respuesta;
        pregunta.terminado = true;
      }
    });
  };
  //?Debo terminar esta funcion
  const linkDelante = () => {
    const falta = preguntas.find((preg) => preg.terminado === false);
    const actual = preguntas.indexOf(pregunta);
    if (!falta) {
      const siguiente = (pregunta.numeroPregunta % 4) + 1;
      return siguiente.toString();
    }

    const faltaNext = preguntas.find(
      (preg, index) => preg.terminado === false && index >= actual
    );
    const faltabefore = preguntas.find((preg) => preg.terminado === false);
    if (faltaNext) {
      return faltaNext.numeroPregunta.toString();
    }
    return faltabefore.numeroPregunta.toString();
  };

  const linkAtras = () => {
    const falta = preguntas.find((preg) => preg.terminado === false);
    const actual = preguntas.indexOf(pregunta);
    if (!falta) {
      const atras = actual === 0 ? preguntas.length - 1 : actual - 1;
      return (atras + 1).toString();
    }
    if (!preguntas[actual].terminado) {
      return actual + 1;
    }
    for (let pregunta = actual; pregunta >= 0; pregunta--) {
      if (!preguntas[pregunta].terminado) {
        return pregunta + 1;
      }
    }
    for (let pregunta = preguntas.length - 1; pregunta >= actual; pregunta--) {
      if (!preguntas[pregunta].terminado) {
        console.log(pregunta);
        return pregunta + 1;
      }
    }
  };
  const [sgte, setSgte] = useState(linkDelante());
  const [atras, setAtras] = useState(linkAtras());
  //Camara

  const constraints = {
    audio: {
      echoCancellation: { exact: false },
    },
    video: {
      width: 1280,
      height: 720,
    },
  };
  function stopRecording() {
    mediaRecorder.current.stop();
  }
  useEffect(() => {
    if (grabar) {
      startRecording();
    } else {
      if (mediaRecorder.current) {
        stopRecording();
      }
    }
  }, [grabar]);
  useEffect(() => {
    agregarRespuesta(preguntas, pregunta.numeroPregunta);

    setSgte(linkDelante());
    setAtras(linkAtras());
  }, [respuesta]);

  useEffect(() => {
    setCambioVista(true);
  }, [refo.pregunta]);

  const playButton = () => {
    setCambioVista(false)
    const mimeType = "video/webm";
    // const superBuffer = new Blob(recordedBlobs.current, { type: mimeType });
    camara.current.src = null;
    camara.current.srcObject = null;

    // camara.current.src = window.URL.createObjectURL(superBuffer);
    camara.current.src = pregunta.respuesta;
    camara.current.controls = true;
    camara.current.play();
  };
  const recordButton = (e) => {
    setGrabar(!grabar);
    setCambioVista(true)
    // if (responder === "Start Recording") {
    //   startRecording();
    // } else {
    //   stopRecording();
    //   recordButton.textContent = "Start Recording";
    //   playButton.disabled = false;
    // downloadButton.disabled = false;
    // codecPreferences.disabled = false;
    // }
  };
  function handleDataAvailable(event) {
    console.log("handleDataAvailable", event);
    if (event.data && event.data.size > 0) {
      recordedBlobs.current.push(event.data);
    }
  }

  function startRecording() {
    recordedBlobs.current = [];
    const mimeType = "video/webm;codecs=vp8,opus";
    const options = { mimeType };

    try {
      mediaRecorder.current = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error("Exception while creating MediaRecorder:", e);
      // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
      //   e
      // )}`;
      return;
    }

    console.log(
      "Created MediaRecorder",
      mediaRecorder,
      "with options",
      options
    );
    // recordButton.textContent = "Stop Recording";
    // playButton.disabled = true;
    // downloadButton.disabled = true;
    // codecPreferences.disabled = true;
    mediaRecorder.current.onstop = (event) => {
      const superBuffer = new Blob(recordedBlobs.current, { type: mimeType });
      setRespuesta(window.URL.createObjectURL(superBuffer));
      console.log("Recorder stopped: ", event);
      console.log("Recorded Blobs: ", recordedBlobs);
    };
    mediaRecorder.current.ondataavailable = handleDataAvailable;
    mediaRecorder.current.start();
    console.log("MediaRecorder started", mediaRecorder.current);
  }

  function stopRecording() {
    mediaRecorder.current.stop();
  }

  function handleSuccess(stream) {
    // recordButton.disabled = false;
    console.log("getUserMedia() got stream:", stream);
    window.stream = stream;

    const gumVideo = camara.current;
    gumVideo.srcObject = stream;
  }

  async function init(constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      console.error("navigator.getUserMedia error:", e);
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  }
  const startCamera = async () => {
    // e.target.disabled = true;
    // setResponder(!responder);
    console.log("Using media constraints:", constraints);
    await init(constraints);
  };

  const stopCamera = () => {
    let mediaStream = camara.current.srcObject;
    console.log(mediaStream);
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());

      // camara.current.srcObject = null;
    }
    // const mediaStream = camara.current.srcObject;
  };

  //--termina video
  startCamera();
  // if (!pregunta) {
  //   return <div>No existe ese numero de pregunta</div>;
  // }
  return (
    <div>
      <h1>Pregunta {pregunta.numeroPregunta}</h1>
      <p>{pregunta.pregunta}</p>
      <Link to={"/"} onClick={()=>{
        stopCamera()
      }}>Volver</Link>
      {/* !checar aca  */}
      {cambioVista?
      <video ref={camara} autoPlay playsInline></video>
      :
      <video ref={videoDeCamara} playsInline></video>
    }
      <video ref={reproduccion} playsInline></video>

      <button onClick={recordButton}>
        {grabar ? "Parar Grabacion" : "Grabar"}{" "}
      </button>

      {pregunta.respuesta ? <button onClick={playButton}>Play</button> : ""}
      <Link to={`/preguntas/${atras}`}>Pregunta Anterior</Link>
      <Link to={`/preguntas/${sgte}`}>Siguiente Pregunta</Link>
    </div>
  );
};

export default Formulario;
