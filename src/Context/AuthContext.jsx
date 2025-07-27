import axios from "axios";
import {createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let authContext = createContext(null)



function AuthContextProvider({children}) {

    async function verifyToken(){
       
        if(localStorage.getItem('token')){

             try{
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken' , {
                headers :{
                    token : localStorage.getItem('token'),
                },
            })
            localStorage.setItem('userId',data.decoded.id)
        }catch(err) {
            console.error(err)
            toast.error("Please login to get access")
            setToken(null)
            localStorage.removeItem('token')
        }
        }
    }

    useEffect(()=>{
        verifyToken()
    },[])

    let [token , setToken] = useState(localStorage.getItem('token'))

    return (
        <authContext.Provider value={{token , setToken , verifyToken}}>
            {children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;