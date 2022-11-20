import React from "react";

const VerInformacion = ({ item }) => {
  return (
    <div>
      <h4>{item.titulo}</h4>
      <input
        className="bg-light rounded p-3 border-0"
        value={item.valor}
      ></input>
    </div>
  );
};

export default VerInformacion;
