import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@material-ui/core";
import { crearProducto, editarProducto, obtenerProductos, eliminarProducto } from "../../utils/productos/api";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Crear Nuevo Vehículo");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoaiding] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoaiding(true);
      await obtenerProductos(
        (response) => {
          setProductos(response.data);
          setEjecutarConsulta(false);
          setLoaiding(false);
        },
        (error) => {
          console.log("Ocurrió un erorr", error);
        }
      );
    };

    if (ejecutarConsulta) {
      fetchProductos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Crear Nuevo Producto");
    } else {
      setTextoBoton("Mostrar Todos los productos");
    }
  }, [mostrarTabla]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      <div className="flex flex-col w-full">
        <h2 className=" text-1xl text-center md:text-left md:text-3xl font-extrabold text-gray-900">Página de administración de productos</h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-green-500 p-3 rounded-sm m-6 w-60 self-center md:self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos loading={loading} listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionProductos setMostrarTabla={setMostrarTabla} listaProductos={productos} setProductos={setProductos} />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ loading, listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">Todos los productos</h2>
      <div className="hidden md:flex w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full mt-5">
            <ReactLoading type={"cubes"} color={"green"} height={100} width={200} />
          </div>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Id producto</th>
                <th>Descripción producto</th>
                <th>Valor unitario</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => {
                return <FilaProducto key={nanoid()} producto={producto} setEjecutarConsulta={setEjecutarConsulta} />;
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-col w-full m-2 md:hidden">
        {productosFiltrados.map((el) => {
          return (
            <div key={nanoid()} className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
              <span>{el.idProducto}</span>
              <span>{el.descripcion}</span>
              <span>{el.valorUnitario}</span>
              <span>{el.estado}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    idProducto: producto.idProducto,
    descripcion: producto.descripcion,
    valorUnitario: producto.valorUnitario,
    estado: producto.estado,
  });

  const actualizarProducto = async () => {
    await editarProducto(
      producto._id,
      {
        descripcion: infoNuevoProducto.descripcion,
        valorUnitario: infoNuevoProducto.valorUnitario,
        estado: infoNuevoProducto.estado,
      },
      (response) => {
        toast.success("Producto modificado con exito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error modificando el producto");
      }
    );
  };

  const eliminarProductos = async () => {
    await eliminarProducto(
      producto._id,
      (response) => {
        toast.success("Producto eliminado con exito");
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error eliminando producto");
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
              className="bg-gray-300 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoProducto.idProducto}
              disabled
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, idProducto: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              required
              value={infoNuevoProducto.descripcion}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, descripcion: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="number"
              value={infoNuevoProducto.valorUnitario}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, valorUnitario: e.target.value })}
              required
            />
          </td>
          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              value={infoNuevoProducto.estado}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })}
            >
              <option>Disponible</option>
              <option>No disponible</option>
            </select>
          </td>
        </>
      ) : (
        <>
          <td>{producto.idProducto}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.valorUnitario}</td>
          <td>{producto.estado}</td>
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
              <Tooltip title="Editar Producto" arrow>
                <i onClick={() => setEdit(!edit)} className="fas fa-pencil-alt text-yellow-700 hover:text-yellow-500" />
              </Tooltip>
              <Tooltip title="Eliminar Producto" arrow>
                <i onClick={() => setOpenDialog(true)} className="fas fa-trash text-red-700 hover:text-red-500" />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className="p-8 flex flex-col">
            <h1 className="text-gray-900 text-2xl font-bold">¿Está seguro de querer eliminar el producto?</h1>
            <div className="flex w-full items-center justify-center my-4">
              <button onClick={() => eliminarProductos()} className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md">
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

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    await crearProducto(
      {
        idProducto: nuevoProducto.idProducto,
        descripcion: nuevoProducto.descripcion,
        valorUnitario: nuevoProducto.valorUnitario,
        estado: nuevoProducto.estado,
      },
      (response) => {
        toast.success("Producto creado con exito");
      },
      (error) => {
        toast.error("Error creando el producto");
      }
    );
    setMostrarTabla(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-extrabold">Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col w-96">
        <label className="flex flex-col" htmlFor="id">
          Identificador del producto
          <input name="idProducto" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Id producto" required />
        </label>
        <label className="flex flex-col" htmlFor="descripción">
          Descripción del producto
          <input name="descripcion" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="text" placeholder="Descripción" required />
        </label>
        <label className="flex flex-col" htmlFor="valor">
          Valor unitario del producto
          <input name="valorUnitario" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Valor unitario" required />
        </label>
        <label className="flex flex-col" htmlFor="estado">
          Estado del producto
          <select className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" name="estado" required defaultValue={0}>
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Disponible</option>
            <option>No disponible</option>
          </select>
        </label>
        <button type="submit" className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white">
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default Productos;
