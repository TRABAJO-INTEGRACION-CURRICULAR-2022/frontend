import React, { useState, useEffect } from "react";

import {
  correoEmpresa,
  globales,
} from "../../../../../../constants/nombresConstantes";

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

  const habdleCancelarCreacionTratamiento = () => {
    setCrearTratamiento(!crearTratamiento);
  };

  const listaTratamientosRender = () => {
    return (
      <div>
        <h1>{correoEmpresa.lblTituloTratamientos}</h1>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleNuevoTratamiento();
            }}
          >
            {correoEmpresa.btnCrearTratamiento}
          </button>
        </div>
        <div>
          {tratamientos.length > 0 ? (
            tratamientos.map((tratamiento) => (
              <div key={tratamiento._id} className="bg-white rounded p-3 mb-2">
                <TratamientoUnitario
                  key={tratamiento._id}
                  tratamiento={tratamiento}
                  handleEditarTratamiento={handleEditarTratamiento}
                />
              </div>
            ))
          ) : (
            <div className="alert alert-warning" role="alert">
              {correoEmpresa.lblMensajeNoExistenTratamientos}
            </div>
          )}
        </div>
        ;
      </div>
    );
  };

  const creartratamientoRender = () => {
    return (
      <div>
        <h1>{correoEmpresa.lblTituloNuevoTratamiento}</h1>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              habdleCancelarCreacionTratamiento();
              console.log("cancelar creacion de tratamiento");
            }}
          >
            {globales.btnCancelar}
          </button>
        </div>
        <CrearTratamiento handleNuevoTratamiento={handleNuevoTratamiento} />
      </div>
    );
  };

  return (
    <div>
      {crearTratamiento ? creartratamientoRender() : listaTratamientosRender()}
    </div>
  );
};

export default Tratamientos;
