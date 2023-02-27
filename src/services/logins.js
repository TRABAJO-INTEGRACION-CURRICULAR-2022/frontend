import axios from "axios";
const usuarioBaseUrl = "http://localhost:8000/api/users/login";
const empresaBaseUrl = "http://localhost:8000/api/enterprises/login";

const crearUsuarioBaseUrl = "http://localhost:8000/api/users/create";
const crearEmpresaBaseUrl = "http://localhost:8000/api/enterprises/create";
//const baseUrl = "/api/users/login";

const usuarioLogin = (userData) => {
  const request = axios.post(usuarioBaseUrl, userData);
  return request.then((response) => response.data);
};

const empresaLogin = (userData) => {
  const request = axios.post(empresaBaseUrl, userData);
  return request.then((response) => response.data);
};

const crearUsuario = (userData) => {
  console.log("userData: ", userData);
  const request = axios.post(crearUsuarioBaseUrl, userData);
  return request.then((response) => response);
};

const crearEmpresa = (userData) => {
  console.log("userData: ", userData);
  const request = axios.post(crearEmpresaBaseUrl, userData);
  return request.then((response) => response);
};

export default { usuarioLogin, empresaLogin, crearUsuario, crearEmpresa };
