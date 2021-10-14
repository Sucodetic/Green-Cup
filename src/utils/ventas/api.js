import axios from "axios";

export const obtenerVenta = async (setProductos, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/ventas" };
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

export const crearVenta = async (data, successCallback, errorCallBack) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/ventas",
    headers: { "Content-Type": "application/json" },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const editarVenta = async (id, data, successCallback, errorCallBack) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/ventas/${id}`,
    headers: { "Content-Type": "application/json" },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const eliminarVenta = async (id, successCallback, errorCallBack) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/ventas/${id}`,
    headers: { "Content-Type": "application/json" },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};
