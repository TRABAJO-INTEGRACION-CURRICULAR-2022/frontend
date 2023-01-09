import React from "react";

const InformacionTratamiento = ({ tratamiento }) => {
  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor={tratamiento.description}>
            Descripcion:
          </label>
          <input
            id={tratamiento.description}
            name={tratamiento.description}
            className="form-control"
            value={tratamiento.description}
            readOnly={true}
          ></input>
        </div>

        <label className="form-label">Información usada:</label>
        <ul className="list-group list-group-flush">
          {tratamiento.data.map((item1) => (
            <li key={item1._id} className="list-group-item">
              {item1.label}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default InformacionTratamiento;
