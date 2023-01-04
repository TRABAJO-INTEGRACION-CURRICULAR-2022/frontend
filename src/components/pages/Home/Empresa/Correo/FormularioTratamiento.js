import React, { useState, useEffect } from "react";
import Select from "react-select";
import { opciones } from "./data";

import empresaService from "../../../../../services/empresaCorreos";

import InformacionTratamiento from "./InformacionTratamiento";
import Tratamiento from "../Inicio/Tratamiento";

const FormularioTratamiento = ({
  data,
  handleEliminarTratamiento,
  handleEditarTratamiento,
}) => {
  const [tratamientos, setTratamientos] = useState([]);
  const [opcionesTratamientos, setOpcionesTratamientos] = useState([]);

  const [tratamiento, setTratamiento] = useState({});
  const [dataUsada, setDataUsada] = useState({});

  useEffect(() => {
    empresaService.getAllTreatments().then((tratamientoResponse) => {
      //console.log("tratamientos from: ", tratamientoResponse);
      setTratamientos(tratamientoResponse);
      const newOpcionesTratamientos = tratamientoResponse.map((tratamiento) => {
        return {
          value: tratamiento._id,
          label: tratamiento.name,
        };
      });
      setOpcionesTratamientos(newOpcionesTratamientos);
    });

    console.log("data que vino: ", data);
    if (data._id) {
      setDataUsada(data);
      const tratamientoSeleccionado = tratamientos.find(
        (tratamiento) => tratamiento._id === data._id
      );
      console.log("tratamientoSeleccionado: ", tratamientoSeleccionado);
      if (tratamientoSeleccionado) {
        setTratamiento(tratamientoSeleccionado);
      }
    }
  }, [data]);

  return (
    <div className="container">
      <button
        onClick={() => {
          console.log("data a eliminar id", tratamiento._id);
          console.log("data a eliminar ", tratamiento);
          handleEliminarTratamiento(tratamiento._id);
        }}
      >
        Eliminar
      </button>
      <div>
        <Select
          options={opcionesTratamientos}
          onChange={(e) => {
            console.log("e: ", e);
            const tratamientoSeleccionado = tratamientos.find(
              (tratamiento) => tratamiento._id === e.value
            );
            //console.log("tratamientoSeleccionado: ", tratamientoSeleccionado);

            setTratamiento(tratamientoSeleccionado);

            handleEditarTratamiento({
              ...tratamientoSeleccionado,
              valor: true,
            });
          }}
        ></Select>
        <div>
          {JSON.stringify(tratamiento) === "{}" ? null : (
            <InformacionTratamiento tratamiento={tratamiento} />
          )}
        </div>
      </div>

      <hr className="bg-danger border-2 border-top border-dark" />
    </div>
  );
};

export default FormularioTratamiento;

/*
      <div className="row">
        <p className="col">Data Usada: </p>
        <Select
          options={opciones}
          isMulti
          value={dataUsada}
          onChange={(e) => {
            console.log("Data Usada: ", e);
            setDataUsada(e);
            setTratamiento({
              ...tratamiento,
              data: e,
            });
            handleEditarTratamiento({
              ...tratamiento,
              data: e,
            });
          }}
        ></Select>
      </div>
*/
