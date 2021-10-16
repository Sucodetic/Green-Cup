import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";
import ImagenLogo from "../media/logo.gif";
import { obtenerDatosUsuarios } from '../utils/usuarios/api';

const PrivateRoute = ({children}) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(()=>{
        const fetchAuth0Token = async () => {
           const accessToken = await getAccessTokenSilently({
                audience: `api-autenticacion-greencup`,
            });
            localStorage.setItem("token",accessToken);
            await obtenerDatosUsuarios((success) => {
                console.log("Respuesta", success);
            },
            (error)=>{
                console.log("Error",error);
            })
        };
        if(isAuthenticated){
            fetchAuth0Token();
        }
    },[isAuthenticated, getAccessTokenSilently])

    if(isLoading) return  <div className="flex flex-col items-center self-center justify-center w-full">
        <img src={ImagenLogo} alt="logo"/>
    <ReactLoading type={"spin"} color={"green"} height={100} width={200} />
  </div>;

    return isAuthenticated ? <>{children}</>:<div className="text-2xl text-red-700">No puedes acceder a este sitio.</div> 
}

export default PrivateRoute
