import React, { useState, useEffect } from "react";

import TratamientoUnitario from "./TratamientoUnitario";
import CrearTratamiento from "./CrearTratamiento";

const Tratamientos = () => {
  const jsonTratamientos = [
    {
      nombre: "Tratamiento 1",
      descripcion: "Descripcion del tratamiento 1",
      data: [
        {
          value: "data1",
          label: "Data 1",
        },
        {
          value: "data2",
          label: "Data 2",
        },
      ],
    },
  ];
  const [crearTratamiento, setCrearTratamiento] = useState(false);
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    setTratamientos(jsonTratamientos);
    // empresaService.getAllTratamientos().then((tratamientoResponse) => {
    //   //console.log("tratamientos: ", tratamientoResponse)
    //   //setTratamientos(tratamientoResponse);
    // });
  }, []);

  const handleNuevoTratamiento = (tratamientoObjeto) => {
    setCrearTratamiento(!crearTratamiento);
    console.log("tratamientoObjeto: ", tratamientoObjeto);
    if (tratamientoObjeto) {
      setTratamientos([...tratamientos, tratamientoObjeto]);
    } else {
      console.log("No se creo el tratamiento");
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
            {tratamientos.map((tratamiento) => {
              return (
                <TratamientoUnitario
                  key={tratamiento.nombre}
                  tratamiento={tratamiento}
                  handleEditarTratamiento={handleEditarTratamiento}
                />
              );
            })}
          </div>
        </div>
        ;
      </div>
    );
  };

  return (
    <div>
      <h1>Tratamientos</h1>
      <div>
        <button
          hidden={crearTratamiento}
          onClick={() => {
            handleNuevoTratamiento();
          }}
        >
          Nuevo Tratamiento
        </button>
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
