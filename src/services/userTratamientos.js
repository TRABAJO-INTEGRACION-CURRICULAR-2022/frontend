import axios from "axios";
const baseUrl1 = "http://localhost:8000/api/users/getTreatmentsEnterprises";
const baseUrl2 = "http://localhost:8000/api/users/getTreatmentEnterprise";

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

export default { setId, setToken, getAll, getOne };
