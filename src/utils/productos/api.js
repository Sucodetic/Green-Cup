import axios from "axios";

const getToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/productos",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios
    .request(options)
    .then(function (response) {
      setProductos(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const crearProducto = async (data, successCallback, errorCallBack) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/productos",
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const editarProducto = async (id, data, successCallback, errorCallBack) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/productos/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const eliminarProducto = async (id, successCallback, errorCallBack) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/productos/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};
