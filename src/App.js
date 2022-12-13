import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import loginService from "./services/logins";
import correosService from "./services/correos";
import userTratamientosService from "./services/userTratamientos";

import Navbar from "./components/parts/Navbar";
import Home from "./components/pages/Home";

import LoginForm from "./components/pages/Home/Sesion/LoginForm";
import RegisterForm from "./components/pages/Home/Sesion/RegisterForm";

import Inicio from "./components/pages/Home/Inicio/Inicio";
import Correo from "./components/pages/Home/Correo/Correo";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      correosService.setId(user.id);
      correosService.setToken(user.token);
      userTratamientosService.setId(user.id);
      userTratamientosService.setToken(user.token);
      console.log("usuario Logeado: ", user);
    } else {
      console.log("no hay usuario logueado");
    }
  }, []);

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      const userForLog = {
        token: user.token,
        name: user.user.name,
        email: user.user.email,
        id: user.user._id,
      };
      console.log("userForLog: ", userForLog);

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userForLog)
      );
      correosService.setId(userForLog.id);
      setUser(userForLog);
    } catch (exception) {
      console.log("Wrong username or password", "alert");
    }
  };

  const rutasUsuarioLogeado = () => {
    return (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio login={login} />} />
        <Route path="/correo" element={<Correo />} />
      </>
    );
  };

  const rutasUsuarioNoLogeado = () => {
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
      <Navbar user={user} />
      <div className="container1">
        <Routes>
          {user ? rutasUsuarioLogeado() : rutasUsuarioNoLogeado()}
        </Routes>
      </div>
    </>
  );
}

export default App;
