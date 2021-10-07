import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRef, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Crear Nuevo Producto");
  const [setEjecutarConsulta] = useState(true);

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
        <h2 className="text-2sm text-center md:text-left md:text-3xl font-extrabold text-gray-900">Página de administración de productos</h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white  bg-green-500 p-3 rounded-sm m-6 w-50 self-center md:self-end hover:bg-green-900`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionProductos setMostrarTabla={setMostrarTabla} listaProductos={productos} setProductos={setProductos} />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">Todos los productos</h2>
      <div className="hidden md:flex w-full">
        <table className="tabla">
          <thead>
            <tr>
              <th>Id producto</th>
              <th>Descripción del producto</th>
              <th>Valor unitario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.map((producto, index) => {
              return (
                <tr>
                  <td>{producto.id}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.valor}</td>
                  <td>{producto.estado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    setMostrarTabla(true);
    setProductos([...listaProductos, nuevoProducto]);
    toast.success("Producto agregado con éxito");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-extrabold text-gray-800">Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col w-80">
        <label className="flex flex-col" htmlFor="nombre">
          Identificador del producto
          <input name="id" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Id producto" required />
        </label>
        <label className="flex flex-col" htmlFor="descripción">
          Descripción del producto
          <input name="descripcion" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="text" placeholder="Descripción" required />
        </label>
        <label className="flex flex-col" htmlFor="valor">
          Valor unitario
          <input name="valor" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Valor" required />
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
