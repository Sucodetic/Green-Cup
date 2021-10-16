import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@material-ui/core";
import { obtenerUsuarios, editarUsuario, eliminarUsuario } from "../../utils/usuarios/api";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const Usuarios = () => {
  const [mostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      await obtenerUsuarios(
        (response) => {
          setUsuarios(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.log("Ocurrió un erorr", error);
        }
      );
    };

    if (ejecutarConsulta) {
      fetchUsuarios();
      console.log(usuarios);
    }
  }, [ejecutarConsulta, usuarios]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      <div className="flex flex-col w-full">
        <h2 className=" text-1xl text-center mb-7 md:text-left md:text-3xl font-extrabold text-gray-900">Página de administración de usuarios</h2>
      </div>

      <TablaUsuarios loading={loading} listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

const TablaUsuarios = ({ loading, listaUsuarios, setEjecutarConsulta }) => {
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
        placeholder="Buscar usuarios"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">Todos los usuarios</h2>
      <div className="hidden md:flex w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full mt-5">
            <ReactLoading type={"cubes"} color={"green"} height={100} width={200} />
          </div>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => {
                return <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta} />;
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-col w-full m-2 md:hidden">
        {usuariosFiltrados.map((el) => {
          return (
            <div key={nanoid()} className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
              <span>{el.name}</span>
              <span>{el.email}</span>
              <span>{el.estado}</span>
              <span>{el.rol}</span>
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
    nombre: usuario.name,
    correo: usuario.email,
    estado: usuario.estado,
    rol: usuario.rol,
  });

  const actualizarUsuario = async () => {
    editarUsuario(
      usuario._id,
      {
        estado: infoNuevoUsuario.estado,
        rol: infoNuevoUsuario.rol,
      },
      (response) => {
        toast.success("Usuario modificado con exito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        console.log(error);
        toast.error("Error al modificar el usuario");
      }
    );
  };

  const eliminarUsuarios = async () => {
    eliminarUsuario(
      usuario._id,
      (response) => {
        toast.success("Usuario eliminado con exito");
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Eror eliminando al usuario");
      }
    );
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className="bg-gray-200 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoUsuario.nombre}
              disabled
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, nombre: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-200 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              required
              disabled
              value={infoNuevoUsuario.correo}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, correo: e.target.value })}
            />
          </td>
          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              value={infoNuevoUsuario.estado}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, estado: e.target.value })}
            >
              <option>Pendiente</option>
              <option>Autorizado</option>
              <option>No autorizado</option>
            </select>
          </td>
          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              value={infoNuevoUsuario.rol}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })}
            >
              <option>Administador</option>
              <option>Vendedor</option>
            </select>
          </td>
        </>
      ) : (
        <>
          <td>{usuario.name}</td>
          <td>{usuario.email}</td>
          <td>{usuario.estado}</td>
          <td>{usuario.rol}</td>
        </>
      )}

      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i onClick={() => actualizarUsuario()} className="fas fa-check text-green-700 hover:text-green-500" />
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
              <button onClick={() => eliminarUsuarios()} className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md">
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
