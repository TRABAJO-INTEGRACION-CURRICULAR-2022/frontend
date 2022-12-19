import React from "react";

const InformacionUnitario = ({ item, handleVerDatos }) => {
  return (
    <div className="d-flex justify-content-evenly bg-white rounded p-3 mb-2">
      <p>{item.name}</p>
      <p className="fecha-caducidad">{item.fechaFin}</p>
      <button
        className="btn btn-primary"
        onClick={() => handleVerDatos(item._id)}
      >
        Ver datos
      </button>
    </div>
  );
};

export default InformacionUnitario;
