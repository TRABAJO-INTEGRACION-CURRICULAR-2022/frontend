import React, { useState } from "react";

import {
  correoEmpresa,
  globales,
} from "../../../../../../constants/nombresConstantes";

import Select from "react-select";

import { opcionesData } from "../../../../../../constants/opcionesData";

const CrearTratamiento = ({ handleNuevoTratamiento }) => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");
  const [descripcionTratamiento, setDescripcionTratamiento] = useState("");
  const [dataUsada, setDataUsada] = useState(null);

  return (
    <div>
      <div className="bg-white rounded p-3 mb-2">
        <form>
          <div className="form-label">
            <label className="col" htmlFor="nombreTratamiento">
              {correoEmpresa.lblNombreTratamiento}
            </label>
            <input
              className="form-control"
              type="text"
              value={nombreTratamiento}
              onChange={(e) => setNombreTratamiento(e.target.value)}
            ></input>
          </div>
          <div>
            <label className="label" htmlFor="nombreTratamiento">
              {correoEmpresa.lblDescripcionTratamiento}
            </label>
            <textarea
              className="form-control"
              type="text"
              value={descripcionTratamiento}
              onChange={(e) => setDescripcionTratamiento(e.target.value)}
            ></textarea>
          </div>
          <div>
            <p className="form-label">
              {correoEmpresa.lblInformacionTratamiento}{" "}
            </p>
            <Select
              options={opcionesData}
              isMulti
              value={dataUsada}
              onChange={(e) => {
                console.log("Data Usada: ", e);
                setDataUsada(e);
              }}
            ></Select>
          </div>
          <div className="d-grid gap-2">
            <button
              disabled={
                nombreTratamiento === "" ||
                dataUsada === null ||
                descripcionTratamiento === ""
              }
              className="btn btn-primary mt-2 "
              onClick={() => {
                console.log("dataUsada: ", dataUsada);

                const tratamientoObjeto = {
                  name: nombreTratamiento,
                  description: descripcionTratamiento,
                  data: dataUsada,
                };
                handleNuevoTratamiento(tratamientoObjeto);
              }}
            >
              {globales.btnGuardar}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearTratamiento;
