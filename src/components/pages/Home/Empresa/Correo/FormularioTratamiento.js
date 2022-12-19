import React, { useState, useEffect } from "react";
import Select from "react-select";
import { opciones } from "./data";

const FormularioTratamiento = ({
  data,
  handleEliminarTratamiento,
  handleEditarTratamiento,
}) => {
  const [tratamiento, setTratamiento] = useState({});
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dataUsada, setDataUsada] = useState({});

  useEffect(() => {
    setTratamiento(data);
    setTitulo(data.tipo);
    setDescripcion(data.descripcion);
    setDataUsada(data.data);
  }, [data]);

  return (
    <div className="container">
      <button
        onClick={() => {
          console.log("data a eliminar ", data.id);
          handleEliminarTratamiento(data.id);
        }}
      >
        Eliminar
      </button>
      <div className="row">
        <p className="col">Titulo Tratamiento: </p>
        <input
          className="col"
          value={titulo}
          onChange={(e) => {
            console.log("Titulo: ", e.target.value);
            setTitulo(e.target.value);
            setTratamiento({
              ...tratamiento,
              tipo: e.target.value,
            });
            handleEditarTratamiento({
              ...tratamiento,
              tipo: e.target.value,
            });
          }}
        ></input>
      </div>

      <div className="row">
        <p className="col">Descripcion: </p>
        <textarea
          className="col"
          value={descripcion}
          onChange={(e) => {
            console.log("Descripcion: ", e.target.value);
            setDescripcion(e.target.value);
            setTratamiento({
              ...tratamiento,
              descripcion: e.target.value,
            });
            handleEditarTratamiento({
              ...tratamiento,
              descripcion: e.target.value,
            });
          }}
        ></textarea>
      </div>
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

      <hr className="bg-danger border-2 border-top border-dark" />
    </div>
  );
};

export default FormularioTratamiento;
