import React, { useState, useEffect } from "react";

import Select from "react-select";
import { opciones } from "./data";

const CrearTratamiento = ({ handleNuevoTratamiento }) => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");
  const [descripcionTratamiento, setDescripcionTratamiento] = useState("");
  const [dataUsada, setDataUsada] = useState({});

  return (
    <div>
      <h1>Crear Tratamiento</h1>
      <div className="bg-white rounded p-3 mb-2">
        <div className="row">
          <label className="col" htmlFor="nombreTratamiento">
            Nombre del tratamiento
          </label>
          <input
            className="col"
            type="text"
            value={nombreTratamiento}
            onChange={(e) => setNombreTratamiento(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="col" htmlFor="nombreTratamiento">
            Descripcion del tratamiento
          </label>
          <textarea
            className="col"
            type="text"
            value={descripcionTratamiento}
            onChange={(e) => setDescripcionTratamiento(e.target.value)}
          ></textarea>
        </div>
        <div className="row">
          <p className="col">Informacion Necesaria: </p>
          <Select
            options={opciones}
            isMulti
            value={dataUsada}
            onChange={(e) => {
              console.log("Data Usada: ", e);
              setDataUsada(e);
            }}
          ></Select>
        </div>
      </div>
      <button
        onClick={() => {
          console.log("dataUsada: ", dataUsada);

          const tratamientoObjeto = {
            nombre: nombreTratamiento,
            descripcion: descripcionTratamiento,
            data: dataUsada,
          };
          handleNuevoTratamiento(tratamientoObjeto);
        }}
      >
        Crear Tratamiento
      </button>
    </div>
  );
};

export default CrearTratamiento;
