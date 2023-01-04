import React, { useState } from "react";
import { opciones } from "./data";

const TratamientoCorreo = ({
  item,
  handleRechazarTratamiento,
  handleCancelarTratamiento,
}) => {
  const [disableButton, setDisableButton] = useState(false);

  const retornarLabel = (value) => {
    const response = opciones.find((item) => {
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
        <div className="col-sm">
          <h4>{item.tipo}</h4>
          <p>Descripcion: {item.tipo} </p>
          <ul className="list-group list-group-flush">
            {item.data.map((item1, index) => (
              <li key={index} className="list-group-item">
                {retornarLabel(item1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm">
          <button
            className="m-2 btn btn-secondary"
            disabled={!disableButton}
            onClick={() => {
              handleCancelarTratamiento(item._id);
              setDisableButton(false);
            }}
            hidden={!disableButton}
          >
            Cancelar
          </button>
          <button
            className="m-2 btn btn-danger"
            disabled={disableButton}
            onClick={() => {
              handleRechazarTratamiento(item._id);
              setDisableButton(true);
            }}
          >
            Rechazar
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
    </div>
  );
};

export default TratamientoCorreo;
