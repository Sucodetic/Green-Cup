import React from "react";
import { Link } from "react-router-dom";
const Dropdown = ({ isOpen, toggle }) => {
  return (
    <div className={isOpen ? "grid grid-rows-2 text-center items-center bg-white" : "hidden"} onClick={toggle}>
      <Link to="/">Continuar con Google</Link>
    </div>
  );
};
export default Dropdown;
