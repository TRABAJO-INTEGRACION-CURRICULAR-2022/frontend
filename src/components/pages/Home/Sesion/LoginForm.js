import React, { useState } from "react";

const LoginForm = ({ login }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    login({
      email: mail,
      password: password,
    });
    setMail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginUser}>
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
