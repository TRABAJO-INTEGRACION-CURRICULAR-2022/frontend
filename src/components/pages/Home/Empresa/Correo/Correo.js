import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { correoEmpresa } from "../../../../../constants/nombresConstantes";

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

  const handleNuevoCorreoAtras = () => {
    setCrearCorreo(!crearCorreo);
  };

  const handleVerCorreo = (correoId) => {
    console.log("correoId: ", correoId);
  };

  const correosEnviadosRender = () => {
    return (
      <div>
        <h1>{correoEmpresa.lblTituloCorreos}</h1>

        <div>
          <button
            hidden={crearCorreo}
            onClick={() => {
              handleNuevoCorreoAtras();
            }}
          >
            {correoEmpresa.btnNuevoCorreo}
          </button>
        </div>
        {correos.length > 0 ? (
          correos.map((correo) => (
            <div className="bg-white rounded p-3 mb-2">
              <CorreoUnitario
                key={correo._id}
                correo={correo}
                handleVerCorreo={handleVerCorreo}
              />
            </div>
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            {correoEmpresa.lblMensajeNoExistenCorreos}
          </div>
        )}
      </div>
    );
  };

  const nuevoCorreoRender = () => {};

  return (
    <div>
      <Tabs defaultActiveKey="correos" id="uncontrolled-tab-example">
        <Tab eventKey="correos" title={correoEmpresa.lblSubmenu1}>
          {crearCorreo ? (
            <CrearCorreo handleNuevoCorreoAtras={handleNuevoCorreoAtras} />
          ) : (
            correosEnviadosRender()
          )}
        </Tab>
        <Tab eventKey="crearTratamientos" title={correoEmpresa.lblSubmenu2}>
          <Tratamientos />
        </Tab>
      </Tabs>
      <br />
    </div>
  );
};

export default Correo;
