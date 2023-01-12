import React, { useState, useEffect } from "react";

import FormularioTratamiento from "./FormularioTratamiento";
import empresaService from "../../../../../services/empresaCorreos";

const CrearCorreo = ({ handleNuevoCorreo }) => {
  const tratamientoVacío = {
    idLista: 1,
  };

  //const [tratamientos, setTratamientos] = useState([tratamientoVacío]);

  const [tratamientosCrear, setTratamientosCrear] = useState([
    tratamientoVacío,
  ]);

  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [tratamientos, setTratamientos] = useState([]);
  const [opcionesTratamientosOriginal, setOpcionesTratamientosOriginal] =
    useState([]);
  const [opcionesTratamientos, setOpcionesTratamientos] = useState([]);

  useEffect(() => {
    empresaService.getAllTreatments().then((tratamientoResponse) => {
      setTratamientos(tratamientoResponse);
      //console.log("getAllTreatments:", tratamientoResponse);

      const opciones = tratamientoResponse.map((tratamiento) => {
        return {
          value: tratamiento._id,
          label: tratamiento.name,
        };
      });
      setOpcionesTratamientos(opciones);
      setOpcionesTratamientosOriginal(opciones);
      //console.log("opciones", opciones);
    });
  }, []);

  // useEffect(() => {
  //   console.log("tratamientosCrear useEffect", tratamientosCrear);
  // }, [tratamientosCrear]);

  const handleNuevoTratamiento = () => {
    // console.log("Lista Tratamientos", tratamientosCrear);
    // console.log(
    //   "Ultimo tratamiento",
    //   tratamientosCrear[tratamientosCrear.length - 1]
    // );
    if (tratamientosCrear[tratamientosCrear.length - 1]._id) {
      //console.log("entro if");
      const nuevoTratamiento = {
        idLista: tratamientosCrear[tratamientosCrear.length - 1].idLista + 1,
      };
      const newTratamientosCrear = [...tratamientosCrear, nuevoTratamiento];
      setTratamientosCrear(newTratamientosCrear);
      //console.log("Boton crear newTratamientosCrear", newTratamientosCrear);
    }
  };

  const handleEnviarCorreo = () => {
    const newPermisos = tratamientosCrear.map((tratamiento) => {
      if (tratamiento._id) {
        return tratamiento;
      } else {
        return null;
      }
    });

    const soloPermisos = newPermisos.filter(
      (tratamiento) => tratamiento !== null
    );
    //eliminar repetidos
    const sinRepetidospermisos = soloPermisos.filter(
      (tratamiento, index, self) =>
        index === self.findIndex((t) => t._id === tratamiento._id)
    );
    //

    const permisosEnviar = sinRepetidospermisos.map((tratamiento) => {
      const arrayValues = tratamiento.data.map((data) => {
        return data.value;
      });
      const permiso = {
        tipo: tratamiento.name,
        descripcion: tratamiento.description,
        valor: true,
        data: arrayValues,
      };
      return permiso;
    });

    const formatoFechaFin = () => {
      const fecha = new Date(fechaFin);
      const dia = fecha.getDate();
      const mes = fecha.getMonth();
      const año = fecha.getFullYear();
      const fechaFinFormato = `${dia + 1}/${mes + 1}/${año}`;
      return fechaFinFormato;
    };

    const data = {
      email: email,
      descripcionConsentimeinto: descripcion,
      permisos: permisosEnviar,
      fechaFin: formatoFechaFin(),
      observaciones: observaciones,
    };
    console.log("Enviar Correo", data);

    empresaService.enviarCorreo(data).then((response) => {
      console.log("response", response);
    });

    //regresa a la anterior pantalla
    handleNuevoCorreo();
  };

  const handleEditarTratamiento = (tratamiento) => {
    //console.log("tratamiento1", tratamiento);
    //console.log("tratamientosCrear", tratamientosCrear);
    const newTratamientosCrear = tratamientosCrear.map((tratamientoCrear) => {
      if (tratamientoCrear.idLista === tratamiento.idLista) {
        return tratamiento;
      } else {
        return tratamientoCrear;
      }
    });

    //console.log("newTratamientosCrear", newTratamientosCrear);
    setTratamientosCrear(newTratamientosCrear);

    const newDeletedOpcionesTratamientos = newTratamientosCrear.reduce(
      (result, tratamiento) => {
        //console.log("tratamiento", tratamiento);
        if (tratamiento._id) {
          result.push({
            value: tratamiento._id,
            label: tratamiento.name,
          });
          return result;
        }
        return result;
      },
      []
    );

    // console.log(
    //   "newDeletedOpcionesTratamientos",
    //   newDeletedOpcionesTratamientos
    // );

    //return the elements that are not in the newDeletedOpcionesTratamientos
    const newOpcionesTratamientos = opcionesTratamientosOriginal.filter(
      (opcion) => {
        return !newDeletedOpcionesTratamientos.some(
          (deletedOpcion) => deletedOpcion.value === opcion.value
        );
      }
    );

    //console.log("newOpcionesTratamientos", newOpcionesTratamientos);
    setOpcionesTratamientos(newOpcionesTratamientos);
  };

  const handleEliminarTratamiento = (id, idTratamiento) => {
    console.log("tratamientos antes de eliminar: ", tratamientosCrear);

    const newTratamientosCrear = tratamientosCrear.filter(
      (tratamiento) => tratamiento.idLista !== id
    );

    console.log("tratamientos despues de eliminar: ", newTratamientosCrear);

    //re render TratamientosCrear para que se elimine el tratamiento
    setTratamientosCrear(newTratamientosCrear);

    //add the option to the select
    const newOpcion = opcionesTratamientosOriginal.find(
      (opcion) => opcion.value === idTratamiento
    );

    // console.log("opcionesTratamientosOriginal", opcionesTratamientosOriginal);
    // console.log("newOpcion", newOpcion);

    const newOpcionesTratamientos = [...opcionesTratamientos, newOpcion];
    //console.log("newOpcionesTratamientos", newOpcionesTratamientos);

    setOpcionesTratamientos(newOpcionesTratamientos);
  };

  return (
    <div>
      <h1>Crear Correo</h1>

      <button
        className="btn btn-secondary"
        onClick={() => {
          handleNuevoCorreo();
          setTratamientos([tratamientoVacío]);
          setDescripcion("");
          setFechaFin("");
          setObservaciones("");
          setEmail("");
        }}
      >
        Cancelar
      </button>
      <button className="btn btn-success" onClick={() => handleEnviarCorreo()}>
        Enviar Correo
      </button>
      <div className="row">
        <label className="col" htmlFor="nombre">
          Correo Destinatario{" "}
        </label>
        <input
          className="col"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="row">
        <label className="col" htmlFor="nombre">
          Descripcion{" "}
        </label>
        <textarea
          className="col"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
      </div>
      <div className="row">
        <label className="col" htmlFor="nombre">
          Fecha fin{" "}
        </label>
        <input
          className="col"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        ></input>
      </div>
      <div className="row">
        <label className="col" htmlFor="nombre">
          Observaciones{" "}
        </label>
        <textarea
          className="col"
          type="text"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        ></textarea>
      </div>
      <hr className="bg-danger border-2 border-top border-dark" />

      {tratamientosCrear.map((item, index) => {
        return (
          <div key={item.idLista}>
            <FormularioTratamiento
              data={item}
              index={index}
              opcionesTratamientos={opcionesTratamientos}
              handleEliminarTratamiento={handleEliminarTratamiento}
              handleEditarTratamiento={handleEditarTratamiento}
            />
          </div>
        );
      })}
      <button
        onClick={() => handleNuevoTratamiento()}
        className="btn btn-primary"
      >
        Crear +
      </button>
    </div>
  );
};

export default CrearCorreo;
