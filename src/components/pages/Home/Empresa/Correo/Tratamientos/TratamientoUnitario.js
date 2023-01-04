const TratamientoUnitario = ({ tratamiento, handleEditarTratamiento }) => {
  const { name, description, data } = tratamiento;

  return (
    <div>
      <div className="row">
        <p className="col fw-bold">Titulo Tratamiento: </p>
        <p className="col">{name}</p>
      </div>
      <div className="row">
        <p className="col fw-bold">Descripcion: </p>
        <p className="col">{description}</p>
      </div>
      <div className="row">
        <p className="col fw-bold">Data Usada: </p>
        <ul className="list-group">
          {data.map((data) => (
            <li className="list-group-item" key={data.value}>
              {data.label}
            </li>
          ))}
        </ul>
      </div>
      <hr className="bg-danger border-2 border-top border-dark" />
    </div>
  );
};
export default TratamientoUnitario;
