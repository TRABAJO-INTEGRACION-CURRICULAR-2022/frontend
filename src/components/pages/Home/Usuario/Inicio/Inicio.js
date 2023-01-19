import React, { useState, useEffect } from "react";

import {
  globales,
  inicioUsuario,
  tratamientoConstantes,
} from "../../../../../constants/nombresConstantes";
import { opcionesData } from "../../../../../constants/opcionesData";

import InformacionUnitario from "./InformacionUnitario";

import userTratamientosService from "../../../../../services/userTratamientos";
import TratamientoInformacion from "./TratamientoInformacion";

import BotonExportar from "../../../../../components/buttons/BotonExportar";

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
      //console.log("tratamientos: ", tratamientos);
    });
  }, []);

  const formatearFechaHtml = (fecha) => {
    const fechaArray = fecha.split("/");
    const fechaFormateada = new Date(
      fechaArray[2],
      fechaArray[1] - 1,
      fechaArray[0]
    );
    return fechaFormateada.toISOString().split("T")[0];
  };

  const handleVerDatos = (id) => {
    //console.log("idTreatement", id);
    userTratamientosService.getOne(id).then((tratamiento) => {
      setTratamiento(tratamiento);
      //console.log("tratamiento: ", tratamiento);
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
      //console.log("newDataCorreo: ", objectData);
      setMostrarInformacion(true);

      const fechaFormateada = formatearFechaHtml(
        tratamiento.fechaFinConsentimeinto
      );
      setFechaFin(fechaFormateada);
    });
  };

  const arrayRechazoPermisos = [];

  const handleRechazarTratamiento = (idTratamiento) => {
    //console.log("idTratamiento: ", idTratamiento);
    arrayRechazoPermisos.push(idTratamiento);
    console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
  };
  const handleCancelarTratamiento = (idTratamiento) => {
    //console.log("idTratamiento: ", idTratamiento);
    const index = arrayRechazoPermisos.indexOf(idTratamiento);
    arrayRechazoPermisos.splice(index, 1);
    console.log("arrayRechazoPermisos: ", arrayRechazoPermisos);
  };

  const handleRechazarTodosLosTratamientos = () => {
    //console.log("rechazar todo de: ", tratamiento._id);
    userTratamientosService.deleteConsent(tratamiento._id).then((response) => {
      console.log("response: ", response);

      const newData = data.filter((item) => {
        return item._id !== tratamiento._id;
      });
      setData(newData);
      setMostrarInformacion(false);
    });
  };

  const handleNewDataTratamiento = (data) => {
    const newData = { ...datatratamiento, ...data };
    setDatatratamiento(newData);
    //console.log("newDataCorreo: ", newData);
  };

  const handleBotonEditar = () => {
    setEditar(true);
  };

  const handleCancelarEdicion = () => {
    setDatatratamiento(datatratamientoOriginal);
    setEditar(false);
  };

  const handleGuardarCambios = () => {
    const dataDiferente = {};
    for (const key in datatratamiento) {
      if (datatratamiento[key] !== datatratamientoOriginal[key]) {
        dataDiferente[key] = datatratamiento[key];
      }
    }
    if (
      Object.keys(dataDiferente).length > 0 ||
      arrayRechazoPermisos.length > 0
    ) {
      if (Object.keys(dataDiferente).length > 0) {
        //Crear un array con tipo y valor
        const arrayDataDiferente = [];
        for (const key in dataDiferente) {
          const data = {
            tipo: key,
            valor: dataDiferente[key],
          };
          arrayDataDiferente.push(data);
        }

        const dataTratamiento = { data: arrayDataDiferente };

        console.log("si hay cambios en los valores");
        console.log("dataTratamientoEnviar:", dataTratamiento);
        console.log(
          "dataTratamientoStringify:",
          JSON.stringify(dataTratamiento)
        );
        console.log("tratamiento", tratamiento);

        userTratamientosService.updateData(dataTratamiento).then((response) => {
          console.log("response: ", response);
        });
      }
      console.log("tratamiento.permisos.length: ", tratamiento.permisos.length);
      console.log("arrayRechazoPermisos.length: ", arrayRechazoPermisos.length);
      if (arrayRechazoPermisos.length === tratamiento.permisos.length) {
        userTratamientosService
          .deleteConsent(tratamiento._id)
          .then((response) => {
            console.log("response: ", response);

            const newData = data.filter((item) => {
              return item._id !== tratamiento._id;
            });
            setData(newData);
          });
      } else if (arrayRechazoPermisos.length > 0) {
        const tratamientosAEliminar = {
          treatmentsToEliminate: arrayRechazoPermisos,
        };
        console.log("si hay rechazos");
        console.log("tratamientosAEliminar:", tratamientosAEliminar);
        userTratamientosService
          .update(tratamiento._id, tratamientosAEliminar)
          .then((response) => {
            console.log("response: ", response);
          });
      }

      handleCancelarEdicion();
      setMostrarInformacion(false);
    } else {
      console.log("no hay cambios en los valores");
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

  const verInformacion = () => {
    return (
      <div className="container">
        <h1>{tratamientoConstantes.lblTituloTratamiento}</h1>
        <div className="bg-white rounded p-3">
          <h2>
            {tratamientoConstantes.lbltituloEmpresa} {tratamiento.empresa.name}
          </h2>
        </div>

        <div className="p-3 d-flex justify-content-end ">
          {editar ? (
            <div className="btn-group">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleCancelarEdicion();
                }}
              >
                {inicioUsuario.btnCancelarEdicion}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleRechazarTodosLosTratamientos();
                }}
              >
                {globales.btnRecharzarTodoElTratamiento}
              </button>
            </div>
          ) : (
            <div>
              <button
                className="m-2 btn btn-secondary"
                onClick={() => {
                  setMostrarInformacion(false);
                }}
              >
                {globales.btnCancelar}
              </button>
              {console.log("tratamiento, ", tratamiento)}
              <BotonExportar
                className="m-2  btn btn-warning"
                modoExportar={2}
                id={() => {
                  return {
                    idRequestUser: tratamiento.usuario.id,
                    idRequestEnterprise: tratamiento.empresa.id,
                  };
                }}
              ></BotonExportar>
              <button
                className=" m-2 btn btn-warning"
                onClick={() => {
                  handleBotonEditar();
                }}
              >
                {globales.btnEditar}
              </button>
            </div>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <form>
                  <h3 className="form-label">
                    {tratamientoConstantes.lblFechaFin}
                  </h3>
                  <input
                    className="form-control mb-3"
                    type={"date"}
                    value={fechaFin}
                    disabled={!editar}
                    onChange={(e) => {
                      //console.log("e.target.value: ", e.target.value);
                      setFechaFin(e.target.value);
                    }}
                  ></input>
                  {tratamiento.permisos.map((item, index) => (
                    <TratamientoInformacion
                      key={index}
                      item={item}
                      handleEditar={editar}
                      handleRechazarTratamiento={handleRechazarTratamiento}
                      handleCancelarTratamiento={handleCancelarTratamiento}
                    />
                  ))}
                </form>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>{tratamientoConstantes.lblInformacionTratamiento}</h3>
                <form>
                  {tratamiento.data.map((itemData, itemDataIndex) => (
                    <div key={itemDataIndex} className="mb-3">
                      <label className="form-label" htmlFor={itemDataIndex}>
                        {retornarLabel(itemData.tipo)}:
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
      <div className="container">
        <h1>{inicioUsuario.lblTituloTratamientos}</h1>
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

  return <div>{mostrarInformacion ? verInformacion() : informacion()}</div>;
};

export default Inicio;
