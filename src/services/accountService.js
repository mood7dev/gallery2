import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api/v1/account";

export const join = (args) => {
  return axios.post("/join", args).catch((e) => e.response);
};

export const login = (args) => {
  return axios.post("/login", args).catch((e) => e.response);
};

export const check = (args) => {
  return axios.post("/check", args).catch((e) => e.response);
};
