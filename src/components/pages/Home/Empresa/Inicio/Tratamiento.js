import React from "react";

const Tratamiento = ({ item, handleVerDatos, handleVerBloques }) => {
  return (
    <div className="d-flex justify-content-evenly bg-white rounded p-3 mb-2">
      <p className="m">
        {item.name} {item.lastname}
      </p>
      <p className="fecha-caducidad">{item.fechaFinConsentimeinto}</p>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleVerDatos(item.id_consent)}
        >
          Ver datos
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            handleVerBloques(item.id_user);
          }}
        >
          Ver Bloques
        </button>
      </div>
    </div>
  );
};

export default Tratamiento;
