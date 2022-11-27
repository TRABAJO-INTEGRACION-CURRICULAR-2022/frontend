import React from "react";

const CorreoUnitario = ({ correo, handleVerCorreo }) => {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        onClick={() => {
          console.log("ver correo: ", correo._id);
          handleVerCorreo(correo);
        }}
      >
        <div className="p-2 flex-fill bd-highlight">{correo.empresa.name}</div>
        <div className="p-2 flex-fill bd-highlight">
          {correo.descripcionConcentimiento}
        </div>
        <div className="ms-auto p-2 bd-highlight">{correo.fechaFin}</div>
      </div>
      <hr className="bg-danger border-2 border-top border-dark" />
    </>
  );
};

export default CorreoUnitario;
