import React, { useEffect, useState } from "react";

const Home = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const tipo = localStorage.getItem("loggedBlogappEmpresa");
    if (tipo === null) {
      setTipoUsuario("user");
    } else {
      setTipoUsuario("empresa");
    }

    const informacion = window.localStorage.getItem("informacionUsuario");
    setUsuario(JSON.parse(informacion));
  }, []);

  const homeUsuarioRender = () => {
    return (
      <div className="container">
        <h1>Datos del Usuario:</h1>
        <form>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Nombre usuario</label>
            <div className="form-control" id="exampleInputEmail1">
              {usuario.name} {usuario.lastName}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Cédula</label>
            <div className="form-control" id="exampleInputEmail1">
              {usuario.ci}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
            <div className="form-control" id="exampleInputEmail1">
              {usuario.email}
            </div>
          </div>
        </form>
      </div>
    );
  };

  const homeEmpresaRender = () => {
    return (
      <div className="container">
        <h1>Datos de la Empresa:</h1>
        <form>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Nombre Empresa</label>
            <div className="form-control" id="exampleInputEmail1">
              {usuario.name}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">RUC</label>
            <div className="form-control" id="exampleInputEmail1">
              {usuario.ruc}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
            <div className="form-control" id="exampleInputEmail1">
              {usuario.email}
            </div>
          </div>
        </form>
      </div>
    );
  };
  //<small id="emailHelp" className="form-text text-muted">
  //We'll never share your email with anyone else.
  //</small>

  return (
    <div>
      {tipoUsuario === "user" ? homeUsuarioRender() : homeEmpresaRender()}
    </div>
  );
};

export default Home;
