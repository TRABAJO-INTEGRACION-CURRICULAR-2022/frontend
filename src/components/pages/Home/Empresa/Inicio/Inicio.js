import React, { useState, useEffect } from "react";

import empresaTratamientosService from "../../../../../services/empresaTratamientos";

import Tratamiento from "./Tratamiento";
import TratamientoInformacion from "./TratamientoInformacion";

const Inicio = () => {
  const [data, setData] = useState([]);

  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  const [dataTratamiento, setDataTratamiento] = useState({});

  const [tratamientoSolicitado, setTratamientoSolicitado] = useState({});

  useEffect(() => {
    empresaTratamientosService.getAll().then((tratamientos) => {
      setData(tratamientos);
      console.log("tratamientos recuperados: ", tratamientos);
    });
  }, []);

  const handleVerDatos = (id) => {
    console.log(`handle ver datos empresa id: ${id}`);
    empresaTratamientosService.getOne(id).then((tratamiento) => {
      setTratamientoSolicitado(tratamiento);
      console.log("tratamiento recuperado: ", tratamiento);

      let dataTratamientoTemporal = {};

      tratamiento.consent.data.forEach((tratamiento) => {
        const newData = {
          [tratamiento.tipo]: tratamiento.valor,
        };
        dataTratamientoTemporal = { ...dataTratamientoTemporal, ...newData };
      });

      setDataTratamiento(dataTratamientoTemporal);
      console.log("dataTratamientoTemporal: ", dataTratamientoTemporal);
      setMostrarInformacion(true);
    });
  };

  const tratamiento = () => {
    return (
      <div>
        <h1>Informacion</h1>
        <h2>Usuario: {tratamientoSolicitado.consent.usuario.name}</h2>
        <div className="p-3 d-flex justify-content-end ">
          <div>
            <button
              className="m-2 btn btn-secondary"
              onClick={() => {
                setMostrarInformacion(false);
              }}
            >
              Cancelar
            </button>
            <button className="m-2 btn btn-primary" onClick={() => {}}>
              Exportar
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Tratamiento</h3>
                {tratamientoSolicitado.consent.permisos.map(
                  (permiso, index) => (
                    <TratamientoInformacion key={index} item={permiso} />
                  )
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Datos</h3>
                {tratamientoSolicitado.consent.data.map((itemData, index) => (
                  <div key={index} className="container d-flex  flex-row">
                    <div className="bg-light rounded p-3">
                      <p>
                        {itemData.tipo}: {dataTratamiento[itemData.tipo]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tratamientos = () => {
    return (
      <div>
        <h1>Tratamientos</h1>
        <div className="d-flex justify-content-around"></div>
        {data.map((tratamiento) => (
          <Tratamiento
            key={tratamiento.id_consent}
            item={tratamiento}
            handleVerDatos={handleVerDatos}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>InicioO </h1>
      {mostrarInformacion ? tratamiento() : tratamientos()}
    </div>
  );
};

export default Inicio;
