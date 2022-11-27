import axios from "axios";
const baseUrl = "http://localhost:8000/api/users/login";
//const baseUrl = "/api/users/login";

const login = (userData) => {
  const request = axios.post(baseUrl, userData);
  return request.then((response) => response.data);
};

export default { login };
