import React, { useState, useEffect } from "react";
import correosService from "../../../../services/correos";
import CorreoUnitario from "./CorreoUnitario";
import TratamientoCorreo from "./TratamientoCorreo";

const Correo = () => {
  const [correos, setCorreos] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [mostrarInformacion, setMostrarInformacion] = useState(false);
  const [datatratamiento, setDatatratamiento] = useState({});
  useEffect(() => {
    correosService.getAll().then((correos) => {
      setCorreos(correos);
      console.log("correos: ", correos);
    });
  }, []);

  const handleVerCorreo = (correo) => {
    //console.log("correo a mostrar: ", correo);
    setMostrarInformacion(true);
    setCorreo(correo);
  };

  const handleNewDataTratamiento = (data) => {
    const newData = { ...datatratamiento, ...data };
    setDatatratamiento(newData);
    console.log("newDataCorreo: ", newData);
  };

  const arrayRechazoPermisos = [];

  const handleRechazarTratamiento = (idTratamiento) => {
    console.log("idTratamiento: ", idTratamiento);
    arrayRechazoPermisos.push(idTratamiento);
    console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
  };
  const handleCancelarTratamiento = (idTratamiento) => {
    console.log("idTratamiento: ", idTratamiento);
    const index = arrayRechazoPermisos.indexOf(idTratamiento);
    arrayRechazoPermisos.splice(index, 1);
    console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
  };

  const handleRechazarTodoSolicituTratamiento = () => {
    console.log("rechazar todo de: ", correo._id);
    correosService.rechazarTodo(correo._id).then((response) => {
      console.log("response: ", response);
      setMostrarInformacion(false);
      setCorreo([]);
    });
  };

  const verCorreo = () => {
    return (
      <div>
        <h1>Datos Correos</h1>
        <div className="p-3 d-flex justify-content-end ">
          <button
            className="m-2 btn btn-secondary"
            onClick={() => {
              setMostrarInformacion(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="m-2 btn btn-danger"
            onClick={() => handleRechazarTodoSolicituTratamiento("1")}
          >
            Rechazar Todo
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Tratamiento Solicitud</h3>
                {correo.permisos.map((item, index) => (
                  <TratamientoCorreo
                    key={index}
                    item={item}
                    handleRechazarTratamiento={handleRechazarTratamiento}
                    handleCancelarTratamiento={handleCancelarTratamiento}
                  />
                ))}
              </div>
            </div>
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Datos Necesarios</h3>
                {correo.data.map((itemData, itemDataIndex) => (
                  <div
                    key={itemDataIndex}
                    className="container d-flex  flex-row"
                  >
                    <div className="bg-light rounded p-3 ">
                      <label htmlFor={itemDataIndex}>{itemData.tipo}: </label>
                      <input
                        id={itemDataIndex}
                        name={itemDataIndex}
                        value={datatratamiento[itemData.tipo]}
                        onChange={(e) => {
                          handleNewDataTratamiento({
                            [itemData.tipo]: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 d-flex justify-content-end ">
          <button className="m-2 btn btn-primary">Aceptar</button>
        </div>
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
