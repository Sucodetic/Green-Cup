import React from 'react'
import ImagenLogo from "../media/logo.gif";
import { Link } from "react-router-dom";

const Error403 = () => {
        return (
        <div className= "flex flex-col items-center self-center justify-center w-30"
        style={{
                       
            textAlign: "center",
            
        }}
        >
            <img src={ImagenLogo} alt="logo"/>
            <h1 style={{
                    fontSize: 20,
                    fontWeight: 900
                    }}
            >
                    ¡ERROR 403!
            </h1>
            <p class="mt-5 text-gray-600"
            style={{
                fontSize: 30,
                fontWeight: 500
                }}            
            >
                Lo sentimos, acceso denegado.
            </p>
            <Link to="/">Volver a la página principal de Green Cup</Link>
        </div>
        )
}

export default Error403
