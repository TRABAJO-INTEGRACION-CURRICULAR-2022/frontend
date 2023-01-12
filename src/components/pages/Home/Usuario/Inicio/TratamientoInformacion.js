import React, { useState, useEffect } from "react";

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

  return (
    <div className={disableButton ? "bg-light" : ""}>
      <div className="row">
        <div className="col-sm">
          <h4>{item.tipo}</h4>
          <p>Descripcion: {item.tipo} </p>
          <ul className="list-group list-group-flush">
            {item.data.map((item1, index) => (
              <li key={index} className="list-group-item">
                {item1}
              </li>
            ))}
          </ul>
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
          ) : null}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
    </div>
  );
};

export default TratamientoInformacion;
