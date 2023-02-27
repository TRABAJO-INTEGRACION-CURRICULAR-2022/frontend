import React, { useState } from "react";

const RegisterForm = ({ register }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");

  const formularioUsuario = () => {
    return (
      <>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="nombre"
            className="form-control form-control-lg"
            placeholder="Ingresar tu Nombre"
            value={nombre}
            name="nombre"
            onChange={({ target }) => setNombre(target.value)}
          />
          <label className="form-label" htmlFor="email">
            Nombre
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="apellido"
            className="form-control form-control-lg"
            placeholder="Ingresar tu Apellido"
            value={apellido}
            name="apellido"
            onChange={({ target }) => setApellido(target.value)}
          />
          <label className="form-label" htmlFor="email">
            Apellido
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className="form-control form-control-lg"
            placeholder="Ingresar un correo electrónico válido"
            value={mail}
            name="email"
            onChange={({ target }) => setMail(target.value)}
          />
          <label className="form-label" htmlFor="email">
            Correo Electrónico
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="number"
            id="cedula"
            className="form-control form-control-lg"
            placeholder="Ingresar su cédula"
            value={cedula}
            name="cedula"
            onChange={({ target }) => setCedula(target.value)}
          />
          <label className="form-label" htmlFor="email">
            Cédula
          </label>
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Ingresar contraseña"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <label className="form-label" htmlFor="form3Example4">
            Contraseña
          </label>
        </div>
        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            onClick={crearUsuario}
            className="btn btn-primary btn-lg"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            Crear Cuenta
          </button>
        </div>
      </>
    );
  };

  const crearUsuario = (event) => {
    event.preventDefault();
    const userData = {
      name: nombre,
      lastName: apellido,
      email: mail,
      ci: cedula,
      password: password,
      tipo: tipo,
    };
    register(userData);
  };

  const formaularioEmpresa = () => {
    return (
      <>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="nombre"
            className="form-control form-control-lg"
            placeholder="Ingresar tu Nombre"
            value={nombre}
            name="nombre"
            onChange={({ target }) => setNombre(target.value)}
          />
          <label className="form-label" htmlFor="email">
            Nombre
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className="form-control form-control-lg"
            placeholder="Ingresar un correo electrónico válido"
            value={mail}
            name="email"
            onChange={({ target }) => setMail(target.value)}
          />
          <label className="form-label" htmlFor="email">
            Correo Electrónico
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="number"
            id="cedula"
            className="form-control form-control-lg"
            placeholder="Ingresar su RUC"
            value={cedula}
            name="cedula"
            onChange={({ target }) => setCedula(target.value)}
          />
          <label className="form-label" htmlFor="email">
            RUC
          </label>
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Ingresar contraseña"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <label className="form-label" htmlFor="form3Example4">
            Contraseña
          </label>
        </div>
        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            onClick={crearEmpresa}
            className="btn btn-primary btn-lg"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            Crear Cuenta
          </button>
        </div>
      </>
    );
  };

  const crearEmpresa = (event) => {
    event.preventDefault();
    const userData = {
      name: nombre,
      email: mail,
      ruc: cedula,
      password: password,
      tipo: tipo,
    };
    register(userData);
  };

  return (
    <div className="mt-5">
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Imagen de registro"
              ></img>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={() => {}}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3">
                  <p className="lead fw-normal mb-0 me-3">Registro</p>
                </div>
                <div className="form-outline mb-4">
                  <select
                    className="form-select form-control-lg"
                    value={tipo}
                    onChange={({ target }) => setTipo(target.value)}
                  >
                    <option value="">Seleccione una opcion</option>
                    <option value="user">Usuario</option>
                    <option value="empresa">Empresa</option>
                  </select>
                  <label className="form-label" htmlFor="form3Example2">
                    Tipo de Cuenta
                  </label>
                </div>
                {tipo === "user" ? formularioUsuario() : formaularioEmpresa()}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
