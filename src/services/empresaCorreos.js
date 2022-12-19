import axios from "axios";
const baseUrl1 = "";
const baseUrl2 = "";

let token = null;
let id = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

//Temporal
const setId = (newId) => {
  id = newId;
};

//obtener correos enviados
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl1}/${id}`, config);
  return response.data;
};

//obtener un correo enviado
const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl2}/${id}`, config);
  return response.data;
};

//enviar correo
const enviarCorreo = async (correo) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.post(`${baseUrl2}/${id}`, correo, config);
  return response.data;
};

export default { getAll, setId, setToken, getOne, enviarCorreo };
