import React from "react-router-dom";

import { navBarEmpresa } from "../../constants/nombresConstantes";

export default function Navbar({ user }) {
  const usuarioLogeado = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="informacion">
            Proyecto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="informacion"
                >
                  {navBarEmpresa.lblMenu1}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="inicio"
                >
                  {navBarEmpresa.lblMenu2}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="correo"
                >
                  {navBarEmpresa.lblMenu3}
                </a>
              </li>
            </ul>
            <button
              className="nav-link active"
              onClick={() => {
                window.localStorage.removeItem("loggedBlogappUser");
                window.localStorage.removeItem("loggedBlogappEmpresa");
                window.location.reload();
              }}
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </nav>
    );
  };

  const usuarioNoLogeado = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="inicioSesion">
            Proyecto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="inicioSesion"
                >
                  Iniciar Sesion
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="registro"
                >
                  Registrarse
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  return <>{user ? usuarioLogeado() : usuarioNoLogeado()}</>;
}
