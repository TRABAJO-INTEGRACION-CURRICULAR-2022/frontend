import React, { useState } from "react";

const LoginForm = ({ login }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    // console.log("email: ", mail);
    // console.log("password, ", password);
    // console.log("tipo: ", tipo);
    login({
      email: mail,
      password: password,
      tipo: tipo,
    });
    setMail("");
    setPassword("");
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
                alt="Imagen de iniciar sesion"
              ></img>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={loginUser}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3">
                  <p className="lead fw-normal mb-0 me-3">Iniciar Sesión</p>
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
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Iniciar Sesión
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    No tienes una cuenta?{" "}
                    <a href="/" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  return (
    <div className="container">
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={loginUser}>
          <div>
            type
            <select
              value={tipo}
              onChange={({ target }) => setTipo(target.value)}
            >
              <option value="">Seleccione una opcion</option>
              <option value="user">Usuario</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>
          <div>
            mail
            <input
              type="text"
              value={mail}
              name="email"
              onChange={({ target }) => setMail(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
