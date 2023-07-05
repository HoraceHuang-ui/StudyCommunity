import axios from "axios";
import { Token } from "./storage";

const baseUrl = "/api";
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  config.headers["authorization"] = `${Token.getToken()}`;
  return config;
});

instance.interceptors.response.use(
  (resp) => {
    if (resp.data && resp.data.code === 200) {
      // success
      return resp.data;
    } else {
      console.error(resp.data.message);
      return Promise.reject(resp);
    }
  },
  (err) => {
    console.log(err.response);
    return Promise.reject(err);
  }
);

export const ApiGet = async (path) => {
  const url = `${path}`;
  return await instance.get(url);
};

export const ApiPost = async (path, data) => {
  const url = `${path}`;
  return await instance.post(url, data);
};
