import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { opcionesData } from "../../../../../constants/opcionesData";

import {
  correoEmpresa,
  globales,
  tratamientoConstantes,
} from "../../../../../constants/nombresConstantes";

import empresaCorreoaService from "../../../../../services/empresaCorreos";

import CrearCorreo from "./CrearCorreo";
import CorreoUnitario from "./CorreoUnitario";

import Tratamientos from "./Tratamientos/Tratamientos";

const Correo = () => {
  const [crearCorreo, setCrearCorreo] = useState(false);
  const [verCorreo, setVerCorreo] = useState(false);
  const [correos, setCorreos] = useState([]);
  const [correo, setCorreo] = useState({});
  const [dataUsada, setDataUsada] = useState([]);

  useEffect(() => {
    empresaCorreoaService
      .getAllCorreos()
      .then((correos) => {
        setCorreos(correos);
      })
      .catch((error) => {
        console.log("error: ", error);
        setCorreos([]);
      });
  }, []);

  const handleNuevoCorreoAtras = () => {
    setCrearCorreo(!crearCorreo);
    setVerCorreo(false);
  };

  const handleVerCorreo = (correoId) => {
    console.log("correoId: ", correoId);
    setVerCorreo(!verCorreo);

    const newCorreo = correos.find((correo) => {
      return correo._id === correoId;
    });

    if (newCorreo) {
      const nuevadata2 = newCorreo.permisos.reduce((acum, item) => {
        const newData1 = item.data.map((item1) => {
          //just return if it is not repeated
          if (acum.indexOf(item1) === -1) {
            return item1;
          } else {
            return undefined;
          }
        });
        return [...acum, ...newData1];
      }, []);

      console.log("nuevadata2: ", nuevadata2);

      //delete undefined
      const nuevaData3 = nuevadata2.filter((item) => {
        return item !== undefined;
      });

      setDataUsada(nuevaData3);
      setCorreo(newCorreo);
    }
  };

  const retornarLabel = (value) => {
    //console.log("value: ", value);
    const response = opcionesData.find((item) => {
      return item.value === value;
    });
    //console.log("response: ", response);

    if (response !== undefined) {
      return response.label;
    } else {
      return value;
    }
  };

  const correosEnviadosRender = () => {
    return (
      <div>
        <h1>{correoEmpresa.lblTituloCorreos}</h1>
        <div>
          <button
            onClick={() => {
              handleNuevoCorreoAtras();
            }}
          >
            {correoEmpresa.btnNuevoCorreo}
          </button>
        </div>
        {console.log("correos length: ", correos)}
        {correos.length > 0 ? (
          correos.map((correo) => (
            <div key={correo._id} className="bg-white rounded p-3 mb-2">
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

  const verCorreoEnviadoRender = () => {
    return (
      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleVerCorreo();
          }}
        >
          {globales.btnRegresar}
        </button>
        <div className="">
          <form>
            <h4 className="form-label">{tratamientoConstantes.lblUsuario}</h4>
            <p className="form-control">{correo.usuario.name}</p>
            <h4 className="form-label">{tratamientoConstantes.lblAsunto}</h4>
            <p className="form-control">
              {correo.obsevaciones === "" ? "No hay" : correo.obsevaciones}
            </p>
            <h4 className="form-label">
              {tratamientoConstantes.lblDescripcionTratamiento}
            </h4>
            <p className="form-control">{correo.descripcionConcentimiento}</p>
            <h4 className="form-label">
              {tratamientoConstantes.lblInformacionTratamiento}
            </h4>
            <div className="form-control">
              <ul className="list-group list-group-flush">
                {console.log("dataUsada: ", dataUsada)}
                {dataUsada.map((item) => (
                  <li className="list-group-item" key={item}>
                    {retornarLabel(item)}
                  </li>
                ))}
              </ul>
            </div>
            <h4 className="form-label mt-2">
              {tratamientoConstantes.lblTituloTratamientos}
            </h4>
            <div className=" col-10">
              {correo.permisos.map((permiso) => (
                <div key={permiso._id} className="bg-white rounded p-3 mb-2">
                  <h5 className="form-label">
                    {tratamientoConstantes.lblTratamiento}
                  </h5>
                  {console.log("permiso: ", permiso)}
                  <p className="form-control">{permiso.tipo}</p>
                  <h5 className="form-label">
                    {tratamientoConstantes.lblDescripcionTratamiento}
                  </h5>
                  <p className="form-control">{permiso.descripcion}</p>
                  <h5 className="form-label">
                    {tratamientoConstantes.lblInformacionTratamiento}
                  </h5>
                  <div className="form-control">
                    <ul className="list-group list-group-flush">
                      {permiso.data.map((item) => (
                        <li className="list-group-item" key={item}>
                          {retornarLabel(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    );
  };

  const opcion1Render = () => {
    return (
      <div>
        {crearCorreo ? (
          <CrearCorreo handleNuevoCorreoAtras={handleNuevoCorreoAtras} />
        ) : (
          correosEnviadosRender()
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="correos" id="uncontrolled-tab-example">
        <Tab eventKey="correos" title={correoEmpresa.lblSubmenu1}>
          {verCorreo ? verCorreoEnviadoRender() : opcion1Render()}
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
