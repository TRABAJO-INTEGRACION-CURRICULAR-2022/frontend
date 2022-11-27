import React, { useState, useEffect } from "react";
import correosService from "../../../../services/correos";
import CorreoUnitario from "./CorreoUnitario";

const Correo = () => {
  const [correos, setCorreos] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  useEffect(() => {
    correosService.getAll().then((correos) => {
      setCorreos(correos);
    });
  }, []);

  const handleVerCorreo = (correo) => {
    //console.log("correo a mostrar: ", correo);
    setMostrarInformacion(true);
    setCorreo(correo);
  };

  const verCorreo = () => {
    return (
      <div>
        <h1>Datos Correos</h1>
        {console.log("correo a mostrar: ", correo)}
      </div>
    );
  };

  const verCorreos = () => {
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
    <>
      <h2>Correo</h2>
      {mostrarInformacion ? verCorreo() : verCorreos()}
    </>
  );
};

export default Correo;
