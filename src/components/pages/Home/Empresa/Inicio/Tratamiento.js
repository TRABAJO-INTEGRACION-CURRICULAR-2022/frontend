import React from "react";

const Tratamiento = ({ item, handleVerDatos }) => {
  return (
    <div className="d-flex justify-content-evenly bg-white rounded p-3 mb-2">
      <p>
        {item.name} {item.lastname}
      </p>
      <p className="fecha-caducidad">{item.fechaFinConsentimeinto}</p>
      <button
        className="btn btn-primary"
        onClick={() => handleVerDatos(item.id_consent)}
      >
        Ver datos
      </button>
    </div>
  );
};

export default Tratamiento;
