import React from "react";

const Informacion = ({ item, handleVerDatos }) => {
  return (
    <div className="d-flex justify-content-evenly bg-white rounded p-3 mb-2">
      <p>{item.nombreEmpresa}</p>
      <p className="fecha-caducidad">{item.fechaCaducidad}</p>
      <button
        className="btn btn-primary"
        onClick={() => handleVerDatos(item.id)}
      >
        Ver datos
      </button>
    </div>
  );
};

export default Informacion;
