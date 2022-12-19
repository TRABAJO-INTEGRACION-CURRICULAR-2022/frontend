import React, { useState, useEffect } from "react";
import correosService from "../../../../../services/userCorreos";
import CorreoUnitario from "./CorreoUnitario";
import TratamientoCorreo from "./TratamientoCorreo";

const Correo = () => {
  const [correos, setCorreos] = useState([]);
  const [correo, setCorreo] = useState([]);

  const [datatratamiento, setDatatratamiento] = useState({});
  const [datatratamientoOriginal, setDatatratamientoOriginal] = useState({});

  const [permisosTratamiento, setPermisosTratamiento] = useState([]);

  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    correosService.getAll().then((correos) => {
      setCorreos(correos);
      console.log("correos: ", correos);
      const userData = window.localStorage.getItem("loggedBlogappUser");
      const user = JSON.parse(userData);
      delete user.token;
      const newData = { ...datatratamiento, ...user };
      setDatatratamiento(newData);
      setDatatratamientoOriginal(newData);
    });
  }, []);

  const handleVerCorreo = (correoId) => {
    console.log("correoId: ", correoId);
    correosService.getOne(correoId).then((correo) => {
      setCorreo(correo);
      console.log("correo: ", correo);
      setPermisosTratamiento(correo.permisos);
      console.log("permisosTratamiento: ", correo.permisos);
      console.log("permisosTratamiento original: ", correo.permisos);
      setMostrarInformacion(true);
      setFechaFin(correo.fechaFin);
    });
    // console.log("correo a mostrar: ", correo);
    // setMostrarInformacion(true);
    // setCorreo(correo);
    // setPermisosTratamiento(correo.permisos);
    // console.log("permisosTratamiento: ", correo.permisos);
  };

  const handleNewDataTratamiento = (data) => {
    const newData = { ...datatratamiento, ...data };
    setDatatratamiento(newData);
    console.log("newDataCorreo: ", newData);
  };

  const handleRechazarTratamiento = (idTratamiento) => {
    const newPersmisoTratamiento = permisosTratamiento.map((permiso) => {
      if (permiso._id === idTratamiento) {
        return { ...permiso, valor: false };
      } else {
        return permiso;
      }
    });
    setPermisosTratamiento(newPersmisoTratamiento);
    console.log("newPersmisoTratamiento: ", newPersmisoTratamiento);

    //console.log("idTratamiento: ", idTratamiento);
    //arrayRechazoPermisos.push(idTratamiento);
    //console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
  };

  const handleCancelarTratamiento = (idTratamiento) => {
    const newPersmisoTratamiento = permisosTratamiento.map((permiso) => {
      if (permiso._id === idTratamiento) {
        return { ...permiso, valor: true };
      } else {
        return permiso;
      }
    });
    setPermisosTratamiento(newPersmisoTratamiento);
    console.log("newPersmisoTratamiento: ", newPersmisoTratamiento);
    //console.log("idTratamiento: ", idTratamiento);
    //const index = arrayRechazoPermisos.indexOf(idTratamiento);
    //arrayRechazoPermisos.splice(index, 1);
    //console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
  };

  const handleRechazarTodoSolicituTratamiento = () => {
    console.log("rechazar todo de: ", correo._id);
    correosService.rechazarTodo(correo._id).then((response) => {
      console.log("response: ", response);
      setMostrarInformacion(false);
      setCorreo([]);
    });
  };

  const handleAceptarSolitudTratamiento = () => {
    console.log(`Aceptar de : ${correo._id}`);
    console.log("permisosTratamiento: ", permisosTratamiento);
    const newCorreo = { ...correo, respondido: true };
    const newCorreos = correos.map((correo) => {
      if (correo._id === newCorreo._id) {
        return newCorreo;
      } else {
        return correo;
      }
    });
    setCorreos(newCorreos);
    //falta decir a correos que cambio el correo
    setCorreo([]);
    setPermisosTratamiento([]);
    setMostrarInformacion(false);
  };

  const handleCancelarVerCorreo = () => {
    setMostrarInformacion(false);
    setDatatratamiento(datatratamientoOriginal);
  };

  const verCorreo = () => {
    return (
      <div>
        <h2>Empresa: {correo.empresa.name}</h2>
        <h5>Hora de recibido: {"xx/xx/xx"}</h5>
        <div className="p-3 d-flex justify-content-end ">
          <button
            className="m-2 btn btn-secondary"
            onClick={() => {
              handleCancelarVerCorreo();
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
                <div>
                  <h3>Fecha Fin</h3>
                  <div>
                    <input
                      type={"date"}
                      value={fechaFin}
                      onChange={(e) => {
                        console.log("e.target.value: ", e.target.value);
                        setFechaFin(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
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
          <button
            className="m-2 btn btn-primary"
            onClick={() => {
              handleAceptarSolitudTratamiento();
            }}
          >
            Aceptar
          </button>
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
