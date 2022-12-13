import React, { useState, useEffect } from "react";

import Informacion from "./Informacion";

import userTratamientosService from "../../../../services/userTratamientos";
import TratamientoCorreo from "../Correo/TratamientoCorreo";

const Inicio = () => {
  const [data, setData] = useState([]);
  const [tratamiento, setTratamiento] = useState({});
  const [datatratamiento, setDatatratamiento] = useState({});

  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  useEffect(() => {
    userTratamientosService.getAll().then((tratamientos) => {
      setData(tratamientos);
      console.log("tratamientos: ", tratamientos);
    });
  }, []);

  const handleVerDatos = (id) => {
    console.log("idTreatement", id);
    userTratamientosService.getOne(id).then((tratamiento) => {
      setTratamiento(tratamiento);
      console.log("tratamiento: ", tratamiento);
      setDatatratamiento(tratamiento.data);
      console.log("tratamiento.data: ", tratamiento.data);
      let objectData = {};

      tratamiento.data.forEach((tratamiento) => {
        const newData = {
          [tratamiento.tipo]: tratamiento.valor,
        };
        objectData = { ...objectData, ...newData };
      });
      setDatatratamiento(objectData);
      console.log("newDataCorreo: ", objectData);
      setMostrarInformacion(true);
    });
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
    console.log("rechazar todo de: ", tratamiento._id);
    setMostrarInformacion(false);
  };

  const handleNewDataTratamiento = (data) => {
    const newData = { ...datatratamiento, ...data };
    setDatatratamiento(newData);
    console.log("newDataCorreo: ", newData);
  };

  const verInformacion = () => {
    return (
      <div>
        <h1>Informacion</h1>
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
            onClick={() => handleRechazarTodoSolicituTratamiento()}
          >
            Rechazar Todo
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Tratamiento</h3>
                {tratamiento.permisos.map((item, index) => (
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
                {tratamiento.data.map((itemData, itemDataIndex) => (
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

  const informacion = () => {
    return (
      <div>
        <h1>Home</h1>
        <div className="d-flex justify-content-around"></div>
        {data.map((item) => (
          <Informacion
            key={item._id}
            item={item}
            handleVerDatos={handleVerDatos}
          />
        ))}
      </div>
    );
  };

  return <>{mostrarInformacion ? verInformacion() : informacion()}</>;
};

export default Inicio;
