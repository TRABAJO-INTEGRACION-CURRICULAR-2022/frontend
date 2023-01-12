import React, { useState, useEffect } from "react";

import InformacionUnitario from "./InformacionUnitario";

import userTratamientosService from "../../../../../services/userTratamientos";
import TratamientoInformacion from "./TratamientoInformacion";

const Inicio = () => {
  const [data, setData] = useState([]);
  const [tratamiento, setTratamiento] = useState({});

  const [datatratamiento, setDatatratamiento] = useState({});
  const [datatratamientoOriginal, setDatatratamientoOriginal] = useState({});

  const [mostrarInformacion, setMostrarInformacion] = useState(false);
  const [editar, setEditar] = useState(false);

  const [fechaFin, setFechaFin] = useState("");

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
      //setDatatratamiento(tratamiento.data);
      //console.log("tratamiento.data: ", tratamiento.data);
      let objectData = {};

      tratamiento.data.forEach((tratamiento) => {
        const newData = {
          [tratamiento.tipo]: tratamiento.valor,
        };
        objectData = { ...objectData, ...newData };
      });
      setDatatratamiento(objectData);
      setDatatratamientoOriginal(objectData);
      console.log("newDataCorreo: ", objectData);
      setMostrarInformacion(true);

      const fechaArray = tratamiento.fechaFinConsentimeinto.split("/");

      const fechaFinTratamiento = `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
      //console.log("fechaFinTratamiento: ", fechaFinTratamiento);
      setFechaFin(fechaFinTratamiento);
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

  const handleRechazarTodosLosTratamientos = () => {
    console.log("rechazar todo de: ", tratamiento._id);
    setDatatratamiento(datatratamientoOriginal);
    setMostrarInformacion(false);
  };

  const handleNewDataTratamiento = (data) => {
    const newData = { ...datatratamiento, ...data };
    setDatatratamiento(newData);
    console.log("newDataCorreo: ", newData);
  };

  const handleBotonEditar = () => {
    setEditar(true);
  };

  const handleCancelarEdicion = () => {
    setDatatratamiento(datatratamientoOriginal);
    setEditar(false);
  };

  const handleGuardarCambios = () => {
    console.log("handleGuardarCambios+++++++++++++++++++++++++++++++");
    console.log("datatratamientoOriginal: ", datatratamientoOriginal);
    console.log("datatratamiento: ", datatratamiento);
    console.log("data: ", data);
    console.log("tratamiento: ", tratamiento);
    console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
    console.log("+++++++++++++++++++++++++++++++");
  };

  const verInformacion = () => {
    return (
      <div>
        <h1>Informacion</h1>
        <h2>Empresa: {tratamiento.empresa.name}</h2>
        <div className="p-3 d-flex justify-content-end ">
          {editar ? (
            <div className="btn-group">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleCancelarEdicion();
                }}
              >
                Cancelar Edición
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleRechazarTodosLosTratamientos();
                }}
              >
                Rechazar Todos los Tratamientos
              </button>
            </div>
          ) : (
            <div className="btn-group">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setMostrarInformacion(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  console.log("exportar");
                }}
              >
                Exportar
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  handleBotonEditar();
                }}
              >
                Editar
              </button>
            </div>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Tratamiento</h3>
                <h3>Fecha Fin</h3>
                <div>
                  <input
                    type={"date"}
                    value={fechaFin}
                    disabled={!editar}
                    onChange={(e) => {
                      console.log("e.target.value: ", e.target.value);
                      setFechaFin(e.target.value);
                    }}
                  ></input>
                </div>

                {tratamiento.permisos.map((item, index) => (
                  <TratamientoInformacion
                    key={index}
                    item={item}
                    handleEditar={editar}
                    handleRechazarTratamiento={handleRechazarTratamiento}
                    handleCancelarTratamiento={handleCancelarTratamiento}
                  />
                ))}
              </div>
            </div>
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Datos Necesarios</h3>
                <form>
                  {tratamiento.data.map((itemData, itemDataIndex) => (
                    <div key={itemDataIndex} className="mb-3">
                      <label className="form-label" htmlFor={itemDataIndex}>
                        {itemData.tipo}:{" "}
                      </label>
                      <input
                        className="form-control"
                        id={itemDataIndex}
                        name={itemDataIndex}
                        value={datatratamiento[itemData.tipo]}
                        onChange={(e) => {
                          handleNewDataTratamiento({
                            [itemData.tipo]: e.target.value,
                          });
                        }}
                        readOnly={!editar}
                      ></input>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 d-flex justify-content-end ">
          {editar ? (
            <button
              className="m-2 btn btn-primary"
              onClick={() => {
                handleGuardarCambios();
              }}
            >
              Editar
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  const informacion = () => {
    return (
      <div>
        <h1>Home</h1>
        <div className="d-flex justify-content-around"></div>
        {data.length > 0 ? (
          data.map((item) => (
            <InformacionUnitario
              key={item._id}
              item={item}
              handleVerDatos={handleVerDatos}
            />
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            No existen Tratamientos por el momento
          </div>
        )}
      </div>
    );
  };

  return <>{mostrarInformacion ? verInformacion() : informacion()}</>;
};

export default Inicio;
