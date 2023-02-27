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
        <label className="form-label">Hash:</label>
        <div className={color}>{item.hashEnterprise}</div>
        <label className="form-label mt-2">Hash Comparación:</label>
        <input
          className={color}
          type="text"
          value={comparar}
          onChange={(e) => setComparar(e.target.value)}
          placeholder="Ingrese el hash a comparar"
        ></input>
        <div className="form-label">
          <div className="btn-group">
            <button className="btn btn-secondary  mt-2" onClick={handleLimpiar}>
              Limpiar
            </button>
            <button className="btn btn-primary  mt-2" onClick={handleComparar}>
              Comparar
            </button>
          </div>
        </div>

        <label className="form-label mt-2">
          Información para generar el Hash:
        </label>
        <textarea
          className="form-control"
          readOnly={true}
          value={item.body}
        ></textarea>
      </div>
    </div>
  );
};

export default Bloque;
