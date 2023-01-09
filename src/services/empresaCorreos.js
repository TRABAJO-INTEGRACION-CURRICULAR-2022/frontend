import axios from "axios";
const baseUrl1 = "http://localhost:8000/api/enterprises/createTreatment"; //crear tratamiento
const baseUrl2 = "http://localhost:8000/api/enterprises/getTreatments"; //obtener tratamientos
const baseUrl3 = "http://localhost:8000/api/enterprises/getTreatment"; //obtener un tratamiento

const baseUrl4 = "http://localhost:8000/api/enterprises/createEmail"; //enviar correo

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
  //console.log("token", token);
  const response = await axios.get(`${baseUrl1}/${id}`, config);
  return response.data;
};

//obtener un correo enviado
const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  //console.log("token", token);
  const response = await axios.get(`${baseUrl2}/${id}`, config);
  return response.data;
};

//enviar correo
const enviarCorreo = async (correo) => {
  const config = {
    headers: { Authorization: token },
  };
  //console.log("token", token);
  const response = await axios.post(`${baseUrl4}/${id}`, correo, config);
  return response.data;
};

//crear tratamiento
const createTreatment = async (tratamiento) => {
  const config = {
    headers: { Authorization: token },
  };
  //console.log("token", token);
  const response = await axios.post(`${baseUrl1}/${id}`, tratamiento, config);
  return response.data;
};

//obtener tratamientos
const getAllTreatments = async () => {
  //console.log("getAllTreatments");
  //console.log("id", id);
  const config = {
    headers: { Authorization: token },
  };
  //console.log("token", token);
  const response = await axios.get(`${baseUrl2}/${id}`, config);
  //console.log("response.data", response.data);
  if (response.data.treatments === undefined) {
    return [];
  } else {
    return response.data.treatments;
  }
};

//obtener un tratamiento
const getOneTreatment = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  //console.log("token", token);
  const response = await axios.get(`${baseUrl3}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  setId,
  setToken,
  getOne,
  enviarCorreo,
  createTreatment,
  getAllTreatments,
  getOneTreatment,
};
