import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

function MiComponente() {
  const match = useRouteMatch();

  useEffect(() => {
    console.log(match.url); // muestra la URL actual de la ruta definida en este componente
  }, [match]);

  return (
    <div>
      <Link to="/otra-ruta">Ir a otra ruta</Link>
    </div>
  );
}

export default MiComponente;
