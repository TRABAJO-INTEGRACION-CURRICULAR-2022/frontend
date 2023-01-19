import React, { useState } from "react";

import { opcionesData } from "../../../../../constants/opcionesData";

import {
  globales,
  tratamientoConstantes,
} from "../../../../../constants/nombresConstantes";

const TratamientoInformacion = ({ item }) => {
  const [disableButton, setDisableButton] = useState(false);

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
  );
};

export default TratamientoInformacion;
