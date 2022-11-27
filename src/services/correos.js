import axios from "axios";
const baseUrl = "http://localhost:8000/api/users/emails";

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
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, setId, setToken };
