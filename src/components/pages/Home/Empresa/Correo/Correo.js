import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import empresaService from "../../../../../services/empresaCorreos";

import CrearCorreo from "./CrearCorreo";
import CorreoUnitario from "./CorreoUnitario";

import Tratamientos from "./Tratamientos/Tratamientos";

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
          {correos.length > 0 ? (
            correos.map((correo) => (
              <CorreoUnitario
                key={correo._id}
                correo={correo}
                handleVerCorreo={handleVerCorreo}
              />
            ))
          ) : (
            <div>
              <h3>No hay correos enviados</h3>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="correos" title="Correos">
          <h1>Correos</h1>

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
        </Tab>
        <Tab eventKey="crearTratamientos" title="Crear Tratamientos">
          <Tratamientos />
        </Tab>
      </Tabs>
      <br />
    </div>
  );
};

export default Correo;
