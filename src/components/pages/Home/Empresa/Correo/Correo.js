import React, { useState, useEffect } from "react";

import empresaService from "../../../../../services/empresaCorreos";

import CrearCorreo from "./CrearCorreo";
import CorreoUnitario from "./CorreoUnitario";

const Correo = () => {
  const [crearCorreo, setCrearCorreo] = useState(false);
  const [correos, setCorreos] = useState([]);

  useEffect(() => {
    // empresaService.getAllCorreos().then((correos) => {
    //   //console.log("correos: ", correos)
    //   //setCorreos(correos);
    // });
  }, []);

  const handleNuevoCorreo = () => {
    setCrearCorreo(!crearCorreo);
  };

  const handleVerCorreo = (correoId) => {
    console.log("correoId: ", correoId);
  };

  const correosEnviados = () => {
    return (
      <div>
        <div className="bg-white rounded p-3 mb-2">
          {correos.map((correo) => {
            return (
              <CorreoUnitario
                key={correo._id}
                correo={correo}
                handleVerCorreo={handleVerCorreo}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Correo</h1>
      <div>
        <button
          hidden={crearCorreo}
          onClick={() => {
            handleNuevoCorreo();
          }}
        >
          Nuevo Correo
        </button>
      </div>
      {crearCorreo ? (
        <CrearCorreo handleNuevoCorreo={handleNuevoCorreo} />
      ) : (
        correosEnviados()
      )}
    </div>
  );
};

export default Correo;
