import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  Form,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/ErrorPage';
import Formulario, { loader as formloader } from './Components/Formulario';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    
    
  },
  {
    path: "preguntas/:pregunta",
    loader: formloader,
    element: <Formulario />,
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
