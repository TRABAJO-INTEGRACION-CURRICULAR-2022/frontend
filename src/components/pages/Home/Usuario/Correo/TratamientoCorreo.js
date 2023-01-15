import React, { useState } from "react";
import {
  globales,
  tratamientoConstantes,
} from "../../../../../constants/nombresConstantes";

import { opcionesData } from "../../../../../constants/opcionesData";

const TratamientoCorreo = ({
  item,
  handleRechazarTratamiento,
  handleCancelarTratamiento,
}) => {
  const [disableButton, setDisableButton] = useState(false);

  const retornarLabel = (value) => {
    console.log("value: ", value);
    const response = opcionesData.find((item) => {
      return item.value === value;
    });
    console.log("response: ", response);

    if (response !== undefined) {
      return response.label;
    } else {
      return value;
    }
  };

  return (
    <div className={disableButton ? "bg-light" : ""}>
      <div className="row">
        <div className="col-8">
          <form>
            <h5 className="form-label">{item.tipo}</h5>
            <h5 className="form-label">
              {tratamientoConstantes.lblDescripcionTratamiento}{" "}
            </h5>
            <p className="form-control">{item.tipo}</p>
            <h5 className="form-label">
              {tratamientoConstantes.lblInformacionTratamiento}
            </h5>
            <div className="form-control">
              <ul className="list-group list-group-flush">
                {console.log("item.data: ", item.data)}
                {item.data.map((item1, index) => (
                  <li key={index} className="list-group-item">
                    {retornarLabel(item1)}
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
        <div className="col-4">
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
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
    </div>
  );
};

export default TratamientoCorreo;
