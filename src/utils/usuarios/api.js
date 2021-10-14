import axios from "axios";

export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/usuarios" };
  await axios
    .request(options)
    .then(function (response) {
      setUsuarios(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerVendedores = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/usuarios/Vendedor" };
  await axios
    .request(options)
    .then(function (response) {
      setUsuarios(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const editarUsuario = async (id, data, successCallback, errorCallBack) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/usuarios/${id}`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const eliminarUsuario = async (id, successCallback, errorCallBack) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/usuarios/${id}`,
    headers: { "Content-Type": "application/json" },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};
