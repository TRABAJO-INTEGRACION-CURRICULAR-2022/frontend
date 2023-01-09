import React, { useState, useEffect } from "react";
import Select from "react-select";

import empresaService from "../../../../../services/empresaCorreos";

import InformacionTratamiento from "./InformacionTratamiento";

const FormularioTratamiento = ({
  data,
  handleEliminarTratamiento,
  handleEditarTratamiento,
  opcionesTratamientos,
}) => {
  const [dataTratamiento, setDataTratamiento] = useState({});

  return (
    <div className="container">
      <button
        className="btn btn-danger"
        onClick={() => {
          //console.log("Tratamiento a eliminar id", idTratamientoSeleccionado);
          //console.log("data a eliminar ", tratamiento);
          handleEliminarTratamiento(data.idLista, data._id);
        }}
      >
        Eliminar
      </button>
      <div>
        <Select
          options={opcionesTratamientos}
          onChange={(e) => {
            //console.log("e: ", e);
            empresaService.getOneTreatment(e.value).then(
              (response) => {
                //console.log("response get one tratement : ", response);
                setDataTratamiento(response.treatment);
                //handleTratamientoAniadidoALaLista(response.treatment);
                //console.log("que es esta data: ", data);
                handleEditarTratamiento({
                  idLista: data.idLista,
                  ...response.treatment,
                });
              },
              (error) => {
                console.log("error get one tratement : ", error);
              }
            );

            // handleEditarTratamiento({
            //   ...tratamientoSeleccionado,
            //   valor: true,
            // });
          }}
        ></Select>
        <div>
          {JSON.stringify(dataTratamiento) === "{}" ? null : (
            <InformacionTratamiento tratamiento={dataTratamiento} />
          )}
        </div>
        <div>{JSON.stringify(data.opcionesTratamientos)}</div>
      </div>

      <hr className="bg-danger border-2 border-top border-dark" />
    </div>
  );
};

export default FormularioTratamiento;
