import React from "react";
import ImagenLogo from "../media/logo.gif";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  return (
    <nav className="hidden lg:flex lg:w-72 h-full flex-col bg-green-50 p-4 sidebar">
      <Link to="/admin">
        <img className="w-full" src={ImagenLogo} alt="Logo" />
      </Link>
      <div className="my-4">
        <Ruta icono="fa fa-cubes" ruta="/admin/productos" nombre="Productos" />
        <Ruta icono="fa fa-shopping-cart" ruta="/admin/ventas" nombre="Ventas" />
        <Ruta icono="fa fa-group" ruta="/admin/usuarios" nombre="Usuarios" />
        <Ruta icono="  fa fa-sign-out" ruta="/" nombre="Cerrar sesión" />
      </div>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre }) => {
  const { logout } = useAuth0();
  const cerrarSesion = () => {
    logout({ returnTo: window.location.origin })
    localStorage.setItem("token",null);
  }
  return (
    <Link to={ruta}>
      {nombre === "Cerrar sesión" ? <button className="p-1 my-2  bg-green-600 hover:bg-green-900 flex w-full items-center text-white rounded-md" onClick={() => cerrarSesion()}>
        <i className={`${icono} w-10`} />
        {nombre}
      </button>
        :
       <button className="p-1 my-2  bg-green-600 hover:bg-green-900 flex w-full items-center text-white rounded-md">
        <i className={`${icono} w-10`} />
        {nombre}
      </button>}
    </Link>
  );
};

export default Sidebar;
