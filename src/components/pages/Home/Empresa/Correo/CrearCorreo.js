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

  const handleNuevoTratamiento = (nuevoTratamiento) => {
    //console.log("nuevoTratamiento", nuevoTratamiento);
    setTratamientos([...tratamientos, nuevoTratamiento]);
  };

  const handleEliminarTratamiento = (id) => {
    console.log("tratamientos eliminados", tratamientos);
    console.log("indexAeliminar", id);
    const tratamientosFiltrados = tratamientos.filter((item) => {
      return item.id !== id;
    });
    console.log("tratamientosFiltrados", tratamientosFiltrados);
    setTratamientos(tratamientosFiltrados);
  };

  const handleEnviarCorreo = () => {
    const data = {
      email: email,
      descripcionConsentimeinto: descripcion,
      permisos: tratamientos,
      fechaFin: fechaFin,
    };
    console.log("handleEnviarCorreo", data);
  };

  const handleEditarTratamiento = (tratamiento) => {
    console.log("tratamiento", tratamiento);
    const tratamientosEditados = tratamientos.map((item) => {
      if (item.id === tratamiento.id) {
        return tratamiento;
      } else {
        return item;
      }
    });
    setTratamientos(tratamientosEditados);
  };

  return (
    <div>
      <h1>Crear Correo</h1>
      <button onClick={() => handleNuevoCorreo()}>Cancelar</button>
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
        console.log("item", item);
        console.log("index", index);
        console.log("------------------");
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
        onClick={() => {
          handleNuevoTratamiento({ ...tratamientoVacío, id: idGenerator() });
        }}
      >
        Crear +
      </button>
    </div>
  );
};

export default CrearCorreo;
