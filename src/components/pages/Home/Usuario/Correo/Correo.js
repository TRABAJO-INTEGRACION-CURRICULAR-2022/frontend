import React, { useState, useEffect } from "react";

import { opcionesData } from "../../../../../constants/opcionesData";

import {
  correoUsuario,
  globales,
  tratamientoConstantes,
} from "../../../../../constants/nombresConstantes";

import correosService from "../../../../../services/userCorreos";
import CorreoUnitario from "./CorreoUnitario";
import TratamientoCorreo from "./TratamientoCorreo";

const Correo = () => {
  const [correos, setCorreos] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [neededData, setNeededData] = useState([]);

  const [datatratamiento, setDatatratamiento] = useState({});
  const [datatratamientoOriginal, setDatatratamientoOriginal] = useState({});

  const [permisosTratamiento, setPermisosTratamiento] = useState([]);

  const [mostrarInformacion, setMostrarInformacion] = useState(false);
  const [mostrarInformacion2, setMostrarInformacion2] = useState(false);

  const [fechaFin, setFechaFin] = useState("");

  const [textoBoton, setTextoBoton] = useState(globales.btnSiguiente);

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
      const fechaArray = correo.fechaFin.split("/");

      const fechaFinTratamiento = `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
      console.log("fechaFinTratamiento: ", fechaFinTratamiento);
      setFechaFin(fechaFinTratamiento);
      console.log("correo: ", correo);
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
      console.log("response1: ", response);
      setMostrarInformacion(false);
      setCorreo([]);
    });
  };

  const handleSiguiente = () => {
    setTextoBoton(globales.btnAceptar);
    setMostrarInformacion2(true);
    let newNeededData = [];
    permisosTratamiento.forEach((permiso) => {
      console.log("permiso: ", permiso);
      if (permiso.valor !== false) {
        newNeededData = [...newNeededData, ...permiso.data];
      }
    });
    newNeededData = [...new Set(newNeededData)];
    console.log("Siguiente");
    console.log("newNeededData", newNeededData);
    setNeededData(newNeededData);
  };

  const handleAceptarSolitudTratamiento = () => {
    console.log(`Aceptar de : ${correo._id}`);
    console.log("permisosTratamiento: ", permisosTratamiento);
    console.log("correo: ", correo);

    console.log("dataNecesaria: ", neededData);

    const dataEnviar = neededData.map((data) => {
      const objetoData = {
        tipo: data,
        valor: datatratamiento[data],
      };

      return objetoData;
    });

    console.log("dataEnviar: ", dataEnviar);

    const enviarSolicitud = {
      data: dataEnviar,
      permisos: permisosTratamiento,
    };

    console.log("enviarSolicitud: ", enviarSolicitud);
    console.log("enviarSolicitud: ", JSON.stringify(enviarSolicitud));
    console.log("correo", correo);

    correosService
      .enviarCorreoConsentimiento(correo._id, enviarSolicitud)
      .then((response) => {
        //delete from correos the correo
        const newCorreos = correos.filter((correoFilter) => {
          return correo._id !== correoFilter.id;
        });
        console.log("newCorreos: ", newCorreos);
        console.log("response enviarCorreoConsentimiento: ", response);
        setMostrarInformacion(false);
        setPermisosTratamiento([]);
        setMostrarInformacion(false);
        setMostrarInformacion2(false);
        setDatatratamiento({});
        setTextoBoton(globales.btnSiguiente);
        setCorreo([]);
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    // const newCorreo = { ...correo, respondido: true };
    // const newCorreos = correos.map((correo) => {
    //   if (correo._id === newCorreo._id) {
    //     return newCorreo;
    //   } else {
    //     return correo;
    //   }
    // });
    // setCorreos(newCorreos);
    // //falta decir a correos que cambio el correo
    // setCorreo([]);
    // setPermisosTratamiento([]);
    // setMostrarInformacion(false);
  };

  const handleCancelarVerCorreo = () => {
    setMostrarInformacion(false);
    setDatatratamiento(datatratamientoOriginal);
    setMostrarInformacion2(false);
    setTextoBoton(globales.btnSiguiente);
  };

  const retornarLabel = (value) => {
    console.log("value: ", value);
    const response = opcionesData.find((item) => {
      return item.value === value;
    });
    console.log("response: ", response);

    if (response !== undefined) {
      return response.label;
    } else {
      return value;
    }
  };

  const aceptarORechazarTratamientosP1 = () => {
    return (
      <div className="bg-white rounded p-3">
        <form className="mb-5">
          <h3 className="form-label">{tratamientoConstantes.lblFechaFin}</h3>
          <div className="col-8">
            <input
              className="form-control"
              type={"date"}
              value={fechaFin}
              onChange={(e) => {
                console.log("e.target.value: ", e.target.value);
                setFechaFin(e.target.value);
              }}
            ></input>
          </div>
        </form>
        <h3 className="mb-3">{tratamientoConstantes.lblTituloTratamientos}</h3>
        {correo.permisos.map((item, index) => (
          <TratamientoCorreo
            key={index}
            item={item}
            handleRechazarTratamiento={handleRechazarTratamiento}
            handleCancelarTratamiento={handleCancelarTratamiento}
          />
        ))}
      </div>
    );
  };

  const aceptarORechazarTratamientosP2 = () => {
    console.log("aceptarORechazarTratamientos");
    return (
      <div className="bg-white rounded p-3">
        <h3>{tratamientoConstantes.lblInformacionTratamiento}</h3>
        <form>
          {neededData.map((itemData, itemDataIndex) => {
            //console.log("itemData: ", itemData);
            return (
              <div key={itemDataIndex} className="mb-3">
                <label className="form-label" htmlFor={itemDataIndex}>
                  {retornarLabel(itemData)}:{" "}
                </label>
                <input
                  className="form-control"
                  id={itemDataIndex}
                  name={itemDataIndex}
                  value={datatratamiento[itemData]}
                  onChange={(e) => {
                    handleNewDataTratamiento({
                      [itemData]: e.target.value,
                    });
                  }}
                ></input>
              </div>
            );
          })}
        </form>
      </div>
    );
  };

  const verCorreoRender = () => {
    return (
      <div>
        <div className="bg-white rounded p-3 mb-2">
          <h1>{correoUsuario.lblDatosCorreo}</h1>
          <h4>
            {tratamientoConstantes.lbltituloEmpresa}
            {correo.empresa.name}
          </h4>
          <h4>
            {tratamientoConstantes.lblHoraRecibido} {correo.fechaEnvio}
          </h4>
        </div>

        <div className="p-3 d-flex justify-content-end ">
          <div className="btn-group">
            <button
              className=" btn btn-secondary"
              onClick={() => {
                if (!mostrarInformacion2) {
                  handleCancelarVerCorreo();
                } else {
                  setMostrarInformacion2(false);
                  setTextoBoton(globales.btnSiguiente);
                  setDatatratamiento(datatratamientoOriginal);
                }
              }}
            >
              {globales.btnRegresar}
            </button>

            <button
              className=" btn btn-danger"
              onClick={() => handleRechazarTodoSolicituTratamiento("1")}
            >
              {globales.btnRecharzarTodoElTratamiento}
            </button>
          </div>
        </div>
        <div className="bg-white rounded p-3 mb-2">
          {mostrarInformacion2
            ? aceptarORechazarTratamientosP2()
            : aceptarORechazarTratamientosP1()}
        </div>

        <div className="p-3 d-flex justify-content-end ">
          <button
            className="m-2 btn btn-primary"
            onClick={() => {
              if (!mostrarInformacion2) {
                handleSiguiente();
              } else {
                handleAceptarSolitudTratamiento(); //Boris
              }
            }}
          >
            {textoBoton}
          </button>
        </div>
      </div>
    );
  };

  const verCorreosRender = () => {
    return (
      <div>
        <h2>{correoUsuario.lblTituloCorreos}</h2>
        <div className="alert alert-primary">
          <p>{correoUsuario.lblInstruccionesCorreo}</p>
        </div>

        {correos.length > 0 ? (
          correos.map((correo) => {
            return (
              <div className="bg-white rounded p-3 mb-2">
                <CorreoUnitario
                  key={correo.id}
                  correo={correo}
                  handleVerCorreo={handleVerCorreo}
                />
              </div>
            );
          })
        ) : (
          <div className="alert alert-warning" role="alert">
            {correoUsuario.lblMensajeNoExistenCorreos}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      {mostrarInformacion ? verCorreoRender() : verCorreosRender()}
    </div>
  );
};

export default Correo;
