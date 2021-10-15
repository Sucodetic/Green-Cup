import axios from "axios";

const getToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

export const obtenerVenta = async (successCallback, errorCallBack) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/ventas",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const crearVenta = async (data, successCallback, errorCallBack) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/ventas",
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const editarVenta = async (id, data, successCallback, errorCallBack) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/ventas/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const eliminarVenta = async (id, successCallback, errorCallBack) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/ventas/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};
