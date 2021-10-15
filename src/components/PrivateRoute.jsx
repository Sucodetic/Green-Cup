import React, { useEffect } from 'react'

import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(()=>{
        const fetchAuth0Token = async () => {
           const accessToken = await getAccessTokenSilently({
                audience: `api-autenticacion-greencup`,
            });
            localStorage.setItem("token",accessToken);
        };
        if(isAuthenticated){
            fetchAuth0Token();
        }
    },[isAuthenticated, getAccessTokenSilently])

    if(isLoading) return <div>Loading...</div>;

    return isAuthenticated ? <>{children}</>:<div className="text-2xl text-red-700">No puedes acceder a este sitio.</div> 
}

export default PrivateRoute
