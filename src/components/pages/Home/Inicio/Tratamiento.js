import React from "react";

const Trtamiento = ({ item }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <h4>{item.titulo}</h4>
          <p>Descripcion: asasasa sasasas asasas sasasa sas as as asasas </p>
          <div className="container d-flex  flex-row">
            <div className="bg-light rounded p-3 ">
              <p>nombre</p>
            </div>

            <input
              className="bg-light rounded p-3 border-0"
              value={item.valor}
            ></input>
          </div>
        </div>
        <div className="col-sm">
          <button className="m-2 btn btn-danger">Quitar</button>
          <button className="m-2 btn btn-secondary">Cancelar</button>
        </div>
      </div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
    </div>
  );
};

export default Trtamiento;
