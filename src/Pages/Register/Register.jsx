import axios from 'axios';
import {useFormik} from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function Register() {

    const passReg = /^.{5,}$/
    const phoneReg = /^01[0125][0-9]{8}$/
    const [showPass , setShowPass] = useState('password')

    function toggleShowPass(){
        setShowPass(showPass === 'password' ? 'text' : 'password')
    }

    let navigate = useNavigate()

    const validationSchema = yup.object({
        name :yup.string().required('name must required').min(4,'minimum name is 4 chars').max(20,'maximum name is 20 chars'),
        email :yup.string().required('email must required').email('must be email'),
        password :yup.string().required('password is requried').matches(passReg,'wrong password'),
        rePassword : yup.string().required('re-password is required').oneOf([yup.ref('password')],'must be match the password'),
        phone:yup.string().required('phone is required').matches(phoneReg,'enter the phone') 
    })

    const formik = useFormik({
        initialValues:{
            name :"",
            email :"",
            password :"",
            rePassword : "",
            phone:""    
        },

        onSubmit:sendDataToSingUp
        ,validationSchema

    })

    async function sendDataToSingUp(values){
        const options = {
            url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
            method:'post',
            data: values
        }

        let toastLoading = toast.loading('Loading....')
        try{
            const res = await axios.request(options);
            console.log(res);
            toast.success('Successfully created!')
            navigate('/login')
        }
        catch(error){
            console.error(error);
            toast.error(error.response.data.message)
        }finally{
            toast.dismiss(toastLoading)
        }
    }

    return (
        <div>
            <div class="flex flex-col justify-center sm:py-12">
                <div class="p-5 xs:p-0 mx-auto shadow-2xl dark:bg-gray-300 rounded-xl">
                    <h1 class="font-bold text-center text-2xl mb-5">Register</h1>  
                    <form onSubmit={formik.handleSubmit} >
                        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200 dark:divide-gray-300 dark:bg-gray-200">
                            <div class="px-5 py-7 ">

                                {/* Name */}
                                <label class="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
                                <input
                                    name = 'name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text" class="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full" />
                                    {formik.errors.name && formik.touched.name && ( 
                                        <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                            {formik.errors.name}
                                        </p>
                                        
                                    )}

                                {/* email */}
                                <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                <input 
                                    name = 'email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                type="email" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                {formik.errors.email && formik.touched.email && ( 
                                        <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                            {formik.errors.email}
                                        </p>
                                        
                                    )}

                                {/* password */}
                                <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                                <div className="relative">
                                <input 
                                    name = 'password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    type={showPass} 
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full pr-10" />
                                <div
                                        className="absolute right-3 top-1/3 -translate-y-1/2 cursor-pointer text-gray-900"
                                        onClick={toggleShowPass}
                                        >
                                    {showPass === 'password' ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                                                    
                                                                    :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>}
                                </div>
                                {formik.errors.password && formik.touched.password && ( 
                                        <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                            {formik.errors.password}
                                        </p>
                                        
                                )}
                                </div>


                                {/* re password */}
                                <div>
                                    <label class="font-semibold text-sm text-gray-600 pb-1 block">Re-password</label>
                                    <input 
                                        name = 'rePassword'
                                        value={formik.values.rePassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type={showPass} 
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                </div>
                                

                                {formik.errors.rePassword && formik.touched.rePassword && ( 
                                        <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                            {formik.errors.rePassword}
                                        </p>
                                        
                                    )}


                                {/* phone */}
                                <label class="font-semibold text-sm text-gray-600 pb-1 block">Phone</label>
                                <input 
                                    name = 'phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                type="tel" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                {formik.errors.phone && formik.touched.phone && ( 
                                        <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                            {formik.errors.phone}
                                        </p>
                                        
                                    )}

                                <button type='submit' class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                    <span class="inline-block mr-2">Sing up</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                            <div class="py-5">
                                <div class="grid grid-cols-2 gap-1">
                                <div class="text-center sm:text-left whitespace-nowrap">
                                    <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                        <Link to={'/forgetpass'} class="inline-block ml-1 dark:text-gray-600">Forgot Password</Link>
                                    </button>
                                </div>
                                <div class="text-center sm:text-right  whitespace-nowrap">
                                    <button 
                                    class="flex items-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block align-text-top">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                            </svg>

                                        <Link to={'/login'} class="inline-block ml-1 dark:text-gray-600">Have an Account</Link>
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;