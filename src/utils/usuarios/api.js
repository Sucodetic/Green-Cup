import axios from "axios";

const getToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

export const obtenerUsuarios = async (successCallback, errorCallBack) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/usuarios",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const obtenerVendedores = async (successCallback, errorCallBack) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/usuarios/Vendedor",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const editarUsuario = async (id, data, successCallback, errorCallBack) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/usuarios/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const eliminarUsuario = async (id, successCallback, errorCallBack) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/usuarios/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const obtenerDatosUsuarios = async (successCallback, errorCallBack) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/usuarios/self/",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallBack);
};
