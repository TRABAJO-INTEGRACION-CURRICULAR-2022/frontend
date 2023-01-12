import axios from "axios";
const baseUrl1 = "http://localhost:8000/api/enterprises/getUsers"; //Obtener usuarios
const baseUrl2 = "http://localhost:8000/api/enterprises/getUserConsent"; //obtener consentimientos de un usuario
const baseUrl3 = "http://localhost:8000/api/enterprises/getUsersByTreatment"; //obtener usuarios por tratamiento

const baseUrl4 = "http://localhost:8000/api/enterprises/exportAllEnterprise"; //exportar todos los usuarios de una empresa
const baseUrl5 = "http://localhost:8000/api/enterprises/exportData"; //exportar datos de un usuario
const baseUrl6 = "http://localhost:8000/api/enterprises/getUsersByTreatment"; //exportar usuarios por tratamiento

const baseUrl7 = "http://localhost:8000/api/enterprises/getUsersByTreatment"; //exportar usuarios por tratamiento

const baseUrl8 = "http://localhost:8000/api/enterprises/getBlockChain"; //obtener blockcahin

let token = null;
let idUser = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

//Temporal
const setId = (newId) => {
  idUser = newId;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl1}/${idUser}`, config);
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

const getUsersByTreatment = async (nombreTratamiento) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(
    `${baseUrl3}/${idUser}/${nombreTratamiento}`,
    config
  );
  return response.data.consents;
};

const exportAllEnterprise = async (ext) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl4}/${idUser}/${ext}`, config);
  return response.data;
};

const exportOneUser = async (id, ext) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(
    `${baseUrl5}/${idUser}/${id}/${ext}`,
    config
  );
  return response.data;
};

const exportUsersByTreatment = async (nombreTratamiento, ext) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(
    `${baseUrl6}/${idUser}/${nombreTratamiento}`,
    config
  );
  return response.data;
};

const getBlockChain = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl8}/${idUser}/${id}`, config);
  if (response.data.blockchain) {
    return response.data.blockchain;
  }
  return response.data;
};

export default {
  setId,
  setToken,
  getAll,
  getOne,
  getUsersByTreatment,
  exportAllEnterprise,
  exportOneUser,
  exportUsersByTreatment,
  getBlockChain,
};
