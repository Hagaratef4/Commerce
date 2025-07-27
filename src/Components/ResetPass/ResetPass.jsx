import axios from 'axios';
import {useFormik} from 'formik';
import React, {  useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authContext } from '../../Context/AuthContext';


function ResetPass() {

        const passReg = /^[A-Z][A-Za-z0-9]{5,}$/
        const [showPass , setShowPass] = useState('password')
        const [err,setErr] = useState('')
        let {setToken, verifyToken}= useContext(authContext)
    
        let navigate = useNavigate()
    
        function toggleShowPass(){
            setShowPass(showPass === 'password' ? 'text' : 'password')
        }
    
        const validationSchema = yup.object({
            email :yup.string().required('email must required').email('must be email'),
            newPassword :yup.string().required('password is requried').matches(passReg,'enter the password'),
        })
    
        const formik = useFormik({
            initialValues:{
                email :"",
                newPassword :"" 
            },
    
            onSubmit:sendDataToSingUp
            ,validationSchema
    
        })

    async function sendDataToSingUp(values){

        const options = {
            url:'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            method:'put',
            data: values
        }

        let toastLoading = toast.loading('Waiting...')
        try{
            const res = await axios.request(options);
            console.log(res);
            console.log(res.data.token);
            localStorage.setItem('token',res.data.token)
            verifyToken()
            setToken(res.data.token)

            toast.success('Login successfully')
            navigate('/login')
        }
        catch(error){
            console.error(error);
            toast.error('Reset code is invalid or has expired')
            setErr(error.response.data.message)
        }finally{
            toast.dismiss(toastLoading)
        }
    }

    return (
        <div>
            <div class="flex flex-col justify-center sm:py-12">
                <div class="p-8 m-5 xs:p-0 mx-auto shadow-2xl space-y-6 dark:bg-gray-300 rounded-xl">
                    <h1 class="flex items-center justify-center gap-2.5 font-bold text-center text-2xl mb-5 capitalize">create new password
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                    </h1>  
                    <p className='text-gray-500 mt-2 text-sm text-center text-wrap'>This password should be different from the
                        previous password.</p>
                    <form onSubmit={formik.handleSubmit} >
                        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200 dark:bg-gray-200 p-2">
                        <div class="flex-col:">

                            <div className="px-3 py-5">
                                {}
                            {/* email */}
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                            <input 
                                name = 'email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            type="email" class="border rounded-lg px-3 py-2 pe-25 ps-3 mt-1 mb-5 text-sm w-full" />
                            {formik.errors.email && formik.touched.email && ( 
                                    <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                        {formik.errors.email}
                                    </p>
                                    
                                )}

                            {/* password */}
                        <div className='relative'>
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
                            <input 
                                name = 'newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type={showPass} 
                            class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full " />
                        </div>
                        <div className='absolute top-[60%] right-[15%] md:top-[63%] md:right-[30%] lg:right-[37%] lg:top-[61%] xl:top-[58%] xl:right-[40%] ' onClick={toggleShowPass}>
                                {showPass === 'password' ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                                                
                                :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>}
                            </div>
                            {err && ( 
                                <p className='bg-red-300 p-2 rounded-xl mb-7'>{err}</p>
                            )}

                                <button type='submit' class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span class="inline-block mr-2">Reset Password</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                </button>
                            </div>

                            <div className="pb-5 text-center">
                                <Link to={'/login'} className='text-blue-500 hover:underline hover:text-blue-600 px-5 py-3 rounded-xl capitalize text-sm '>Back to login</Link>
                            </div>
                            

                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPass;