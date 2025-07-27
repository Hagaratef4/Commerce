import React, { useContext } from 'react';
import { authContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

function LoginProtected({children}) {

    let {token} = useContext(authContext)
    
    return (
        <div>
            {!token ? children : <Navigate to={'/'}/>}
        </div>
    );
}

export default LoginProtected;