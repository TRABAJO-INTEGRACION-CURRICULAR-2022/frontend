import axios from "axios";
const baseUrl1 = "http://localhost:8000/api/users/getTreatmentsEnterprises";
const baseUrl2 = "http://localhost:8000/api/users/getTreatmentEnterprise";

const baseUrl3 = "http://localhost:8000/api/users/updateTreatmente";
const baseUrl4 = "http://localhost:8000/api/users/deleteConsent";

const baseUrl5 = "http://localhost:8000/api/users/updateData";

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

const update = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.put(`${baseUrl3}/${id}`, data, config);
  return response.data;
};

const deleteConsent = async (idConsent) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.delete(`${baseUrl4}/${idConsent}`, config);
  return response.data;
};

const updateData = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.put(`${baseUrl5}/${idUser}`, data, config);
  return response.data;
};

export default {
  setId,
  setToken,
  getAll,
  getOne,
  update,
  deleteConsent,
  updateData,
};
