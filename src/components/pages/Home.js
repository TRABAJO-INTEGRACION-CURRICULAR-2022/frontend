import React, { useEffect, useState } from "react";

const Home = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");

  const [usuario, setUsuario] = useState({});
  const [empresa, setEmpresa] = useState({});

  useEffect(() => {
    const tipo = localStorage.getItem("loggedBlogappEmpresa");
    if (tipo === null) {
      setTipoUsuario("user");
    } else {
      setTipoUsuario("empresa");
    }
  }, []);

  useEffect(() => {
    //consultar datos de usuario
  }, []);

  const homeUsuarioRender = () => {
    return (
      <div className="container">
        <div className="">
          <h1>Datos del Usuario:</h1>
        </div>
        <h2>Perfil</h2>
        <p>tipo de usuario: {tipoUsuario}</p>
        <form>
          <label htmlFor="exampleInputEmail1">Nombre usuario</label>
          <div className="form-control" id="exampleInputEmail1">
            nombre usuario
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
              nombre empresa
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">RUC</label>
            <div className="form-control" id="exampleInputEmail1">
              ruc aaaaa
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
            <div className="form-control" id="exampleInputEmail1">
              correo
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
