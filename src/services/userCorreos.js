import axios from "axios";
const baseUrl1 = "http://localhost:8000/api/users/emails";
const baseUrl2 = "http://localhost:8000/api/users/email";
const baseUrl3 = "http://localhost:8000/api/users/aceptConsent";

let token = null;
let id = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

//Temporal
const setId = (newId) => {
  id = newId;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl1}/${id}`, config);
  return response.data;
};

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl2}/${id}`, config);
  return response.data;
};

const rechazarTodo = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("se ha rechazado todo para: ", id);
  return "ok";
};

const enviarCorreoConsentimiento = async (id, objeto) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl3}/${id}`, objeto, config);
  return response.data;
};

export default {
  getAll,
  setId,
  setToken,
  rechazarTodo,
  getOne,
  enviarCorreoConsentimiento,
};
