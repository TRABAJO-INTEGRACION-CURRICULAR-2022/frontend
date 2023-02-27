import React from "react";
import fileDownload from "js-file-download";
import Dropdown from "react-bootstrap/Dropdown";

import empresaTratamientosService from "../../services/empresaTratamientos";

import { globales, inicioEmpresa } from "../../constants/nombresConstantes";

const BotonExportar = ({ modoExportar, id }) => {
  const codioTratamiento = () => {};

  const solicitud = (tipo) => {
    //comprobar informacion

    switch (modoExportar) {
      case 1:
        console.log("exportar todos los datos");
        empresaTratamientosService
          .exportAllEnterprise(tipo)
          .then((response) => {
            console.log("data export tipo: ", tipo);
            //xlsx
            fileDownload(response.data, `TratamietosUsuariosTodos.${tipo}`);
          });
        break;
      case 2:
        console.log("exportar datos de un usuario: ", id(2));
        const { idRequestUser, idRequestEnterprise } = id(2);
        empresaTratamientosService
          .exportOneUser(idRequestUser, idRequestEnterprise, tipo)
          .then((response) => {
            console.log("response.data", response.data);
            fileDownload(response.data, `Tratamieto_${idRequestUser}.${tipo}`);
          });
        break;
      case 3:
        console.log("exportar datos de un tratamiento: ", id(1));
        //const labelTratamiento = id(1);
        const { labelTratamiento } = id(1);
        empresaTratamientosService
          .exportUsersByTreatment(labelTratamiento, tipo)
          .then((response) => {
            console.log("response.data", response.data);
            fileDownload(
              response.data,
              `Tratamietos_de_${labelTratamiento}.${tipo}`
            );
          });

        break;
      default:
        console.log("switch case default");
    }
  };

  return (
    <div className="btn">
      <Dropdown
        onSelect={(tipo) => {
          solicitud(tipo);
        }}
      >
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          {inicioEmpresa.btnExportar}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="csv">.csv</Dropdown.Item>
          <Dropdown.Item eventKey="xlsx">.xlsx</Dropdown.Item>
          <Dropdown.Item eventKey="json">.json</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default BotonExportar;
