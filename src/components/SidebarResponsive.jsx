import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarResponsive = () => {
  const [mostrarNavegacion, setMostrarNavegacion] = useState(false);
  return (
    <div
      className="lg:hidden pt-2"
      onClick={() => {
        setMostrarNavegacion(!mostrarNavegacion);
      }}
    >
      <i className={`mx-2 fa fa-${mostrarNavegacion ? "times" : "bars"} h-8 hover:text-yellow-600`} />
      {mostrarNavegacion && (
        <ul className="bg-green-800">
          <ResponsiveRoute icono="fa fa-cubes" ruta="/admin/productos" nombre="Productos" />
          <ResponsiveRoute icono="fa fa-shopping-cart" ruta="/admin/ventas" nombre="Ventas" />
          <ResponsiveRoute icono="fa fa-group" ruta="/admin/usuarios" nombre="Usuarios" />
          <ResponsiveRoute icono="fa fa-sign-out" ruta="/" nombre="Cerrar sesión" />
        </ul>
      )}
    </div>
  );
};

const ResponsiveRoute = ({ icono, ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <li className="text-gray-200 border border-gray-300 p-1">
        <i className={`${icono} w-7`} />
        {nombre}
      </li>
    </Link>
  );
};

export default SidebarResponsive;
