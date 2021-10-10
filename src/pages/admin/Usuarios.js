import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@material-ui/core";
import { obtenerProductos } from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";

const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  
  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
        obtenerProductos(setUsuarios, setEjecutarConsulta);
    }
  }, [ejecutarConsulta]);
  
  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);
  
  
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
    <div className="flex flex-col w-full">
        <h2 className=" text-1xl text-center md:text-left md:text-3xl font-extrabold text-gray-900">Página de administración de usuarios</h2>
      </div>
      {mostrarTabla ? (
        <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionUsuarios setMostrarTabla={setMostrarTabla} listaUsuarios={usuarios} setUsuarios={setUsuarios} />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>    
  );
};
  
const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  
  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">Todos los usuarios</h2>
      <div className="hidden md:flex w-full">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombres y Apellidos</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => {
              return <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col w-full m-2 md:hidden">
        {usuariosFiltrados.map((el) => {
          return (
            <div className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
              <span>{el.name}</span>
              <span>{el.brand}</span>
              <span>{el.model}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    name: usuario.name,
    brand: usuario.brand,
    model: usuario.model,
  });

  const actualizarUsuario = async () => {
    //enviar la info al backend
    const options = {
      method: "PATCH",
      url: "https://vast-waters-45728.herokuapp.com/vehicle/update/",
      headers: { "Content-Type": "application/json" },
      data: { ...infoNuevoUsuario, id: usuario._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Vehículo modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error modificando el vehículo");
        console.error(error);
      });
  };
  
  const eliminarUsuario = async () => {
    const options = {
      method: "DELETE",
      url: "https://vast-waters-45728.herokuapp.com/vehicle/delete/",
      headers: { "Content-Type": "application/json" },
      data: { id: usuario._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("vehículo eliminado con éxito");
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error eliminando el vehículo");
      });
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoUsuario.name}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, name: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoUsuario.brand}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, brand: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoUsuario.model}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, model: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoUsuario.model}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, model: e.target.value })}
            />
          </td>
        </>
      ) : (
        <>
          <td>{usuario.name}</td>
          <td>{usuario.brand}</td>
          <td>{usuario.model}</td>
          <td>{usuario.model}</td>
        </>
      )}

      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i onClick={() => actualizarProducto()} className="fas fa-check text-green-700 hover:text-green-500" />
              </Tooltip>
              <Tooltip title="Cancelar edición" arrow>
                <i onClick={() => setEdit(!edit)} className="fas fa-ban text-yellow-700 hover:text-yellow-500" />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Editar Usuario" arrow>
                <i onClick={() => setEdit(!edit)} className="fas fa-pencil-alt text-yellow-700 hover:text-yellow-500" />
              </Tooltip>
              <Tooltip title="Eliminar Usuario" arrow>
                <i onClick={() => setOpenDialog(true)} className="fas fa-trash text-red-700 hover:text-red-500" />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className="p-8 flex flex-col">
            <h1 className="text-gray-900 text-2xl font-bold">¿Está seguro de querer eliminar el usuario?</h1>
            <div className="flex w-full items-center justify-center my-4">
              <button onClick={() => eliminarUsuario()} className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md">
                Sí
              </button>
              <button onClick={() => setOpenDialog(false)} className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md">
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};



export default Usuarios;