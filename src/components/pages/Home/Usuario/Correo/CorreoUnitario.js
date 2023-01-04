import React from "react";

const CorreoUnitario = ({ correo, handleVerCorreo }) => {
  const fecha = (fecha) => {
    if (fecha === undefined) {
      return "Sin fecha";
    }
    const fecha2 = fecha.split(",");
    console.log("fecha2: ", fecha2);
    return fecha2[0];
  };
  return (
    <>
      <div
        className="d-flex justify-content-center"
        onClick={() => {
          console.log("ver correo: ", correo.id);
          handleVerCorreo(correo.id);
        }}
      >
        <div
          className={
            correo.respondido === false
              ? "p-2 flex-fill bd-highlight fw-bold text-primary"
              : "p-2 flex-fill bd-highlight"
          }
        >
          {correo.nombreEmpresa}
        </div>
        <div
          className={
            correo.respondido === false
              ? "p-2 flex-fill bd-highlight fw-bold text-primary"
              : "p-2 flex-fill bd-highlight"
          }
        >
          {correo.descrpcion}
        </div>
        <div
          className={
            correo.respondido === false
              ? "ms-auto p-2 bd-highlight fw-bold text-primary"
              : "ms-auto p-2 bd-highlight"
          }
        >
          {fecha(correo.fechaEnvio)}
        </div>
      </div>
      <hr className="bg-danger border-2 border-top border-dark" />
    </>
  );
};

export default CorreoUnitario;
