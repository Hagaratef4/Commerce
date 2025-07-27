import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';

function ProtectedRoutes({children}) {

    let {token} = useContext(authContext)

    return (
        <div>
            {token ? children : <Navigate to={'/login'}/>}
        </div>
    );
}

export default ProtectedRoutes;