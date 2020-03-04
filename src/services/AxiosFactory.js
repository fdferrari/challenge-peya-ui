import Axios from "axios";

const axiosInstance = Axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API, //TODO: move to env file!
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

export function addHeader(field, value) {

  axiosInstance.defaults.headers.common[field] = '';
  delete axiosInstance.defaults.headers.common[field];

  if (value) {
    axiosInstance.defaults.headers.common[field] = '';
    axiosInstance.defaults.headers.common[field] = `${value}`;
  }
}

export function getHeader(field) {
  return axiosInstance.defaults.headers.common[field];
}

export function get(url, params) {
  return axiosInstance.get(url, { params: params || {}, withCredentials: true });
}

export function post(url, body) {
  return axiosInstance.post(url, body);
}

export function put(url, body) {
  return axiosInstance.put(url, body);
}

export function deletex(url, body) {
  return axiosInstance.delete(url, { params: body });
}

export function setValidator(validator) {
  axiosInstance.interceptors.response.use(validator);
}
