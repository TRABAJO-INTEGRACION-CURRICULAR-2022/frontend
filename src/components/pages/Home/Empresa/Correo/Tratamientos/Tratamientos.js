import React, { useState, useEffect } from "react";

import TratamientoUnitario from "./TratamientoUnitario";
import CrearTratamiento from "./CrearTratamiento";

import empresaService from "../../../../../../services/empresaCorreos";

const Tratamientos = () => {
  const [crearTratamiento, setCrearTratamiento] = useState(false);
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    empresaService.getAllTreatments().then((tratamientoResponse) => {
      //console.log("tratamientos: ", tratamientoResponse);
      setTratamientos(tratamientoResponse);
    });
  }, []);

  const handleNuevoTratamiento = (tratamientoObjeto) => {
    setCrearTratamiento(!crearTratamiento);
    console.log("tratamientoObjeto: ", tratamientoObjeto);
    if (tratamientoObjeto) {
      setTratamientos([...tratamientos, tratamientoObjeto]);
      empresaService.createTreatment(tratamientoObjeto).then((response) => {
        console.log("response: ", response);
        console.log("Se ha creado el tratamiento: ", tratamientos);
      });
    } else {
      console.log("Error: No se creo el tratamiento");
    }
  };

  const handleEditarTratamiento = (tratamientoId) => {
    console.log("Editar tratamiento - tratamientoId: ", tratamientoId);
  };

  const listaTratamientos = () => {
    return (
      <div>
        <div>
          <div className="bg-white rounded p-3 mb-2">
            {tratamientos.length > 0 ? (
              tratamientos.map((tratamiento, index) => (
                <TratamientoUnitario
                  key={index}
                  tratamiento={tratamiento}
                  handleEditarTratamiento={handleEditarTratamiento}
                />
              ))
            ) : (
              <div>
                <h3>No hay tratamientos</h3>
              </div>
            )}
          </div>
        </div>
        ;
      </div>
    );
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            hidden={crearTratamiento}
            onClick={() => {
              handleNuevoTratamiento();
            }}
          >
            Nuevo Tratamiento
          </button>
        </div>

        <h1>Tratamientos</h1>
      </div>
      {crearTratamiento ? (
        <CrearTratamiento handleNuevoTratamiento={handleNuevoTratamiento} />
      ) : (
        listaTratamientos()
      )}
    </div>
  );
};

export default Tratamientos;
