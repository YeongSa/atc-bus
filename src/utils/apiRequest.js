import axios from "axios";

const vps = false;

const apiRequest = axios.create({
  baseURL: `${!vps && "http://localhost:5000"}/api`,
  withCredentials: true,
});

export default apiRequest;
