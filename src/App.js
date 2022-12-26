import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import loginService from "./services/logins";
import userCorreosService from "./services/userCorreos";
import userTratamientosService from "./services/userTratamientos";

import empresaCorreosService from "./services/empresaCorreos";
import empresaTratamientosService from "./services/empresaTratamientos";

import Navbar from "./components/parts/Navbar";
import Home from "./components/pages/Home";

import LoginForm from "./components/pages/Home/Sesion/LoginForm";
import RegisterForm from "./components/pages/Home/Sesion/RegisterForm";

import InicioUsuario from "./components/pages/Home/Usuario/Inicio/Inicio";
import CorreoUsuario from "./components/pages/Home/Usuario/Correo/Correo";

import InicioEmpresa from "./components/pages/Home/Empresa/Inicio/Inicio";
import CorreoEmpresa from "./components/pages/Home/Empresa/Correo/Correo";
import Tratamientos from "./components/pages/Home/Empresa/Tratamientos/Tratamientos";

function App() {
  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    const loggedEmpresaJSON = window.localStorage.getItem(
      "loggedBlogappEmpresa"
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userCorreosService.setId(user.id);
      userCorreosService.setToken(user.token);
      userTratamientosService.setId(user.id);
      userTratamientosService.setToken(user.token);
      console.log("usuario Logeado: ", user);
    } else if (loggedEmpresaJSON) {
      const empresa = JSON.parse(loggedEmpresaJSON);
      setEmpresa(empresa);
      empresaCorreosService.setId(empresa.id);
      empresaCorreosService.setToken(empresa.token);
      empresaTratamientosService.setId(empresa.id);
      empresaTratamientosService.setToken(empresa.token);
      console.log("empresa Logeada: ", empresa);
    } else {
      console.log("no hay usuario ni empresa logueado");
    }
  }, []);

  const login = async (userObject) => {
    try {
      if (userObject.tipo === "empresa") {
        const empresaResponse = await loginService.empresaLogin(userObject);
        const empresaForLog = {
          token: empresaResponse.token,
          name: empresaResponse.enterprise.name,
          email: empresaResponse.enterprise.email,
          ruc: empresaResponse.enterprise.ruc,
          id: empresaResponse.enterprise._id,
        };
        console.log("empresaForLog: ", empresaForLog);

        window.localStorage.setItem(
          "loggedBlogappEmpresa",
          JSON.stringify(empresaForLog)
        );
        empresaCorreosService.setId(empresaForLog.id);
        setEmpresa(empresaForLog);
      } else if (userObject.tipo === "user") {
        const userResponse = await loginService.usuarioLogin(userObject);
        const userForLog = {
          token: userResponse.token,
          name: userResponse.user.name,
          lastName: userResponse.user.lastName,
          email: userResponse.user.email,
          ci: userResponse.user.ci,
          phone: userResponse.user.phone || "",
          id: userResponse.user._id,
        };
        console.log("userForLog: ", userForLog);

        window.localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(userForLog)
        );
        userCorreosService.setId(userForLog.id);
        setUser(userForLog);
      }
    } catch (exception) {
      console.log("Wrong username or password", "alert");
    }
  };

  const rutasLogeado = () => {
    if (user) {
      console.log("entro user");
      return (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<InicioUsuario />} />
          <Route path="/correo" element={<CorreoUsuario />} />
          <Route path="/tratamientos" element={<Tratamientos />} />
        </>
      );
    } else {
      console.log("entro empresa");
      return (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<InicioEmpresa />} />
          <Route path="/correo" element={<CorreoEmpresa />} />
          <Route path="/tratamientos" element={<Tratamientos />} />
        </>
      );
    }
  };

  const rutasNoLogeado = () => {
    return (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/inicioSesion" element={<LoginForm login={login} />} />
        <Route path="/registrarse" element={<RegisterForm login={login} />} />
      </>
    );
  };

  return (
    <>
      <Navbar user={user ? user : empresa} />
      <div className="container1">
        <Routes>{user || empresa ? rutasLogeado() : rutasNoLogeado()}</Routes>
      </div>
    </>
  );
}

export default App;
