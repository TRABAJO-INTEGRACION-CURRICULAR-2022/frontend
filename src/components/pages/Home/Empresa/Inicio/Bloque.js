import React, { useState } from "react";

const Bloque = ({ item }) => {
  const [color, setColor] = useState("form-control bg-white");
  const [comparar, setComparar] = useState("");

  const handleComparar = () => {
    if (comparar !== "") {
      if (comparar === item.hashEnterprise) {
        setColor("form-control bg-success");
      } else {
        setColor("form-control bg-danger");
      }
    } else {
      setColor("form-control bg-white");
    }
  };

  const handleLimpiar = () => {
    setComparar("");
    setColor("form-control bg-white");
  };

  return (
    <div className=" bg-white rounded p-3 mb-2">
      <div>
        <label className="form-label">hashMain:</label>
        <div className={color}>{item.hashMain}</div>
        <label className="form-label">hashEnterprise:</label>
        <div className={color}>{item.hashEnterprise}</div>
        <label className="form-label">Comparar:</label>
        <input
          className={color}
          type="text"
          value={comparar}
          onChange={(e) => setComparar(e.target.value)}
        ></input>
        <div className="form-label">
          <div className="btn-group">
            <button className="btn btn-primary  mt-2" onClick={handleLimpiar}>
              Limpiar
            </button>
            <button className="btn btn-primary  mt-2" onClick={handleComparar}>
              Comparar
            </button>
          </div>
        </div>

        <label className="form-label">body:</label>
        <div className="form-control">{item.body}</div>
      </div>
    </div>
  );
};

export default Bloque;
