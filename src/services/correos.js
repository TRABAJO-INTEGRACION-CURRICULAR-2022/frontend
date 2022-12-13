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
  const config = {
    headers: { Authorization: token },
  };
  console.log("token", token);
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const rechazarTodo = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("se ha rechazado todo para: ", id);
  return "ok";
};

export default { getAll, setId, setToken, rechazarTodo };
