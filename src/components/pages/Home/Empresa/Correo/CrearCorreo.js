import React, { useState, useEffect } from "react";

import FormularioTratamiento from "./FormularioTratamiento";
const CrearCorreo = ({ handleNuevoCorreo }) => {
  const [ids, setIds] = useState([]);

  const idGenerator = () => {
    const newId = Math.floor(Math.random() * 100000000000000000);
    if (ids.includes(newId)) {
      //console.log("entroooo");
      idGenerator();
    } else {
      const newIds = [...ids, newId];
      setIds(newIds);
      //console.log("newId", newId);
      return newId;
    }
  };

  const tratamientoVacío = {
    id: 1,
    tipo: "",
    descripcion: "",
    data: "",
    valor: true,
  };

  const [tratamientos, setTratamientos] = useState([tratamientoVacío]);
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [observaciones, setObservaciones] = useState("");

  //useeffect listar tratamientos

  // useEffect(() => {
  //   setTratamientos(tratamientos);
  // }, [tratamientos]);

  const handleNuevoTratamiento = (nuevoTratamiento) => {
    //console.log("nuevoTratamiento", nuevoTratamiento);
    setTratamientos([...tratamientos, nuevoTratamiento]);
  };

  const handleEnviarCorreo = () => {
    const newPermisos = tratamientos.map((tratamiento) => {
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
        valor: tratamiento.valor,
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
    console.log("handleEnviarCorreo", data);
  };

  const handleEditarTratamiento = (tratamiento) => {
    const newArrayTratamientos = [...tratamientos, tratamiento];
    setTratamientos(newArrayTratamientos);
    console.log("Array - tratamientoa: ", newArrayTratamientos);
  };
  const handleEliminarTratamiento = (id) => {
    console.log("tratamientos antes de eliminar: ", tratamientos);
    const newArrayTratamientos = tratamientos.filter(
      (tratamiento) => tratamiento._id !== id
    );
    setTratamientos(newArrayTratamientos);
    console.log("tratamientos despues de eliminar: ", newArrayTratamientos);
  };

  return (
    <div>
      <h1>Crear Correo</h1>
      <button
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
      <button onClick={() => handleEnviarCorreo()}>Enviar Correo</button>
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
      {tratamientos.map((item, index) => {
        //console.log("item", item);
        //console.log("index", index);
        //console.log("------------------");
        return (
          <div key={index}>
            <FormularioTratamiento
              data={item}
              index={index}
              handleEliminarTratamiento={handleEliminarTratamiento}
              handleEditarTratamiento={handleEditarTratamiento}
            />
          </div>
        );
      })}
      <button
        onClick={() =>
          handleNuevoTratamiento({ ...tratamientoVacío, id: idGenerator() })
        }
        className="btn btn-primary"
      >
        Crear +
      </button>
    </div>
  );
};

export default CrearCorreo;
