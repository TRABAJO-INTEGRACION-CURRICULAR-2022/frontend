import React, { useState, useEffect } from "react";

import { opcionesData } from "../../../../../constants/opcionesData";

import {
  globales,
  tratamientoConstantes,
} from "../../../../../constants/nombresConstantes";

const TratamientoInformacion = ({
  item,
  handleEditar,
  handleRechazarTratamiento,
  handleCancelarTratamiento,
}) => {
  const [disableButton, setDisableButton] = useState(false);

  //clear all when handle editar is false
  useEffect(() => {
    if (!handleEditar) {
      setDisableButton(false);
    }
  }, [handleEditar]);

  const retornarLabel = (value) => {
    //console.log("value: ", value);
    const response = opcionesData.find((item) => {
      return item.value === value;
    });
    //console.log("response: ", response);

    if (response !== undefined) {
      return response.label;
    } else {
      return value;
    }
  };

  return (
    <div className={disableButton ? "bg-light" : ""}>
      <div className="row">
        <div className="col-sm">
          <h4 className="form-label">{item.tipo}</h4>
          <p className="form-label">
            {tratamientoConstantes.lblDescripcionTratamiento}
          </p>
          <p className="form-control">{item.tipo}</p>
          <h4 className="form-label">
            {tratamientoConstantes.lblInformacionTratamiento}
          </h4>
          <div className="form-control">
            <ul className="list-group list-group-flush">
              {item.data.map((item1, index) => (
                <li key={index} className="list-group-item">
                  {retornarLabel(item1)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-sm">
          {handleEditar ? (
            <div>
              <button
                className="m-2 btn btn-secondary"
                disabled={!disableButton}
                onClick={() => {
                  handleCancelarTratamiento(item._id);
                  setDisableButton(false);
                }}
                hidden={!disableButton}
              >
                {globales.btnCancelar}
              </button>
              <button
                className="m-2 btn btn-danger"
                disabled={disableButton}
                onClick={() => {
                  handleRechazarTratamiento(item._id);
                  setDisableButton(true);
                }}
              >
                {globales.btnRechazar}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
    </div>
  );
};

export default TratamientoInformacion;
