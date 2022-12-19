import axios from "axios";
const usuarioBaseUrl = "http://localhost:8000/api/users/login";
const empresaBaseUrl = "http://localhost:8000/api/enterprises/login";
//const baseUrl = "/api/users/login";

const usuarioLogin = (userData) => {
  const request = axios.post(usuarioBaseUrl, userData);
  return request.then((response) => response.data);
};

const empresaLogin = (userData) => {
  const request = axios.post(empresaBaseUrl, userData);
  return request.then((response) => response.data);
};

export default { usuarioLogin, empresaLogin };
