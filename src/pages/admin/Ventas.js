import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@material-ui/core";
import { obtenerVentas } from "../../utils/api-ventas";
import "react-toastify/dist/ReactToastify.css";

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Crear Nueva Venta");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  console.log(ventas);

  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerVentas(setVentas, setEjecutarConsulta);
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Crear Nueva Venta");
    } else {
      setTextoBoton("Mostrar Todas las ventas");
    }
  }, [mostrarTabla]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      <div className="flex flex-col w-full">
        <h2 className=" text-1xl text-center md:text-left md:text-3xl font-extrabold text-gray-900">Página de administración de ventas</h2>
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
        <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionVentas setMostrarTabla={setMostrarTabla} listaVentas={ventas} setVentas={setVentas} />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

  useEffect(() => {
    setVentasFiltradas(
      listaVentas.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVentas]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar venta"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">Todas las ventas</h2>
      <div className="hidden md:flex w-full">
        <table className="tabla">
          <thead>
            <tr>
              <th>Id venta</th>
              <th>Valor venta</th>
              <th>Id producto</th>
              <th>Cantidad venta</th>
              <th>Precio unitario</th>
              <th>Fecha venta</th>
              <th>Nombre cliente</th>
              <th>Documento cliente</th>
              <th>vendedor</th>
              <th>estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map((venta) => {
              return <FilaVenta key={nanoid()} venta={venta} setEjecutarConsulta={setEjecutarConsulta} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col w-full m-2 md:hidden">
        {ventasFiltradas.map((el) => {
          return (
            <div className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
              <span>{el.idVenta}</span>
              <span>{el.valorVenta}</span>
              <span>{el.idProducto}</span>
              <span>{el.cantidad}</span>
              <span>{el.precioUnitario}</span>
              <span>{el.fecha}</span>
              <span>{el.nombreCliente}</span>
              <span>{el.documentoCliente}</span>
              <span>{el.vendedor}</span>
              <span>{el.estado}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVenta = ({ venta, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
    idVenta: venta.idVenta,
    valorVenta: venta.valorVenta,
    idProducto: venta.idProducto,
    cantidad: venta.cantidad,
    precioUnitario: venta.precioUnitario,
    fecha: venta.fecha,
    nombreCliente: venta.nombreCliente,
    documentoCliente: venta.documentoCliente,
    vendedor: venta.vendedor,
    estado: venta.estado,
  });

  const actualizarVenta = async () => {
    //enviar la info al backend
    const options = {
      method: "PATCH",
      url: `http://localhost:5000/ventas/${venta._id}`,
      headers: { "Content-Type": "application/json" },
      data: { ...infoNuevaVenta, id: venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Venta modificada con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error modificando la venta");
        console.error(error);
      });
  };

  const eliminarVenta = async () => {
    const options = {
      method: "DELETE",
      url: `http://localhost:5000/ventas/${venta._id}`,
      headers: { "Content-Type": "application/json" },
      data: { id: venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Venta eliminada con éxito");
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error eliminando la venta");
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
              value={infoNuevaVenta.idVenta}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, idVenta: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.valorVenta}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, valorVenta: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.idProducto}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, idProducto: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.cantidad}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, cantidad: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.precioUnitario}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, precioUnitario: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.fecha}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, fecha: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.nombreCliente}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, nombreCliente: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.documentoCliente}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, documentoCliente: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.vendedor}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, vendedor: e.target.value })}
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevaVenta.estado}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, estado: e.target.value })}
            />
          </td>
        </>
      ) : (
        <>
          <td>{venta.idVenta}</td>
          <td>{venta.valorVenta}</td>
          <td>{venta.idProducto}</td>
          <td>{venta.cantidad}</td>
          <td>{venta.precioUnitario}</td>
          <td>{venta.fecha}</td>
          <td>{venta.nombreCliente}</td>
          <td>{venta.documentoCliente}</td>
          <td>{venta.vendedor}</td>
          <td>{venta.estado}</td>
        </>
      )}

      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i onClick={() => actualizarVenta()} className="fas fa-check text-green-700 hover:text-green-500" />
              </Tooltip>
              <Tooltip title="Cancelar edición" arrow>
                <i onClick={() => setEdit(!edit)} className="fas fa-ban text-yellow-700 hover:text-yellow-500" />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Editar Venta" arrow>
                <i onClick={() => setEdit(!edit)} className="fas fa-pencil-alt text-yellow-700 hover:text-yellow-500" />
              </Tooltip>
              <Tooltip title="Eliminar Venta" arrow>
                <i onClick={() => setOpenDialog(true)} className="fas fa-trash text-red-700 hover:text-red-500" />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className="p-8 flex flex-col">
            <h1 className="text-gray-900 text-2xl font-bold">¿Está seguro de querer eliminar la venta?</h1>
            <div className="flex w-full items-center justify-center my-4">
              <button onClick={() => eliminarVenta()} className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md">
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

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    const options = {
      method: "POST",
      url: `http://localhost:5000/ventas/${venta._id}`,
      headers: { "Content-Type": "application/json" },
      data: { 
        idVenta: nuevaventa.idVenta,
        valorVenta: nuevaventa.valorVenta,
        idProducto: nuevaventa.idProducto,
        cantidad: nuevaventa.cantidad,
        precioUnitario: nuevaventa.precioUnitario,
        fecha: nuevaventa.fecha,
        nombreCliente: nuevaventa.nombreCliente,
        documentoCliente: nuevaventa.documentoCliente,
        vendedor: nuevaventa.vendedor,
        estado: nuevaventa.estado,
       },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Venta creada con éxito");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error creando venta");
      });

    setMostrarTabla(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-extrabold mb-4">Crear nueva venta</h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <label className="flex flex-col" htmlFor="id">
            Identificador de la venta
            <input name="id" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Id venta" required />
          </label>
          <label className="flex flex-col" htmlFor="valor">
            Valor total de la venta
            <input name="valor" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Valor total venta" required />
          </label>
        </div>
        <div className="flex flex-col md:flex-row">
          <label className="flex flex-col" htmlFor="idProducto">
            Identificador producto
            <input name="idProducto" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Id producto" required />
          </label>
          <label className="flex flex-col" htmlFor="idProducto">
            Cantidad de la venta
            <input name="cantidad" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Cantidad de venta" required />
          </label>
        </div>
        <div className="flex flex-col md:flex-row">
          <label className="flex flex-col" htmlFor="precio">
            Precio unitario
            <input name="precio" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="number" placeholder="Precio" required />
          </label>
          <label className="flex flex-col" htmlFor="valor">
            Fecha de venta
            <input name="fecha" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="date" placeholder="Fecha" required />
          </label>
        </div>
        <div className="flex flex-col md:flex-row">
          <label className="flex flex-col" htmlFor="nombreCliente">
            Nombre cliente
            <input name="nombreCliente" className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2" type="text" placeholder="Nombre cliente" required />
          </label>
          <label className="flex flex-col" htmlFor="documentoCliente">
            Documento cliente
            <input
              name="documentoCliente"
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              placeholder="Documento cliente"
              required
            />
          </label>
        </div>
        <button type="submit" className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white">
          Crear venta
        </button>
      </form>
    </div>
  );
};

export default Ventas;
