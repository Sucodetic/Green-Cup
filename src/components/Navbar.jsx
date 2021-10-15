import React from "react";
import Icon from "../media/google.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ toggle }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className="flex justify-between items-center h-16 bg-white text-black btn-google relative shadow-sm font-mono" role="navigation">
      <Link to="/" className="pl-8">
        Green Cup
      </Link>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
      <button className="flex bg-gray-300 p-3 btn-google rounded-md m-2 hover:bg-indigo-900 hover:text-white" onClick={() => loginWithRedirect()}>
            <img className="mr-3" src={Icon} alt="Google Icon" />
            Continuar con Google
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
