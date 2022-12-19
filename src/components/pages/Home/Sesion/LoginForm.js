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
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginUser}>
        <div>
          type
          <select value={tipo} onChange={({ target }) => setTipo(target.value)}>
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
  );
};

export default LoginForm;
