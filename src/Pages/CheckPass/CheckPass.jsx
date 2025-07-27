import axios from 'axios';
import {useFormik} from 'formik';
import React, {  useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authContext } from '../../Context/AuthContext';


function CheckPass() {

    const [err,setErr] = useState('')
    let {setToken, verifyToken}= useContext(authContext)

    let navigate = useNavigate()

    const validationSchema = yup.object({
        resetCode :yup.string().required('Reset code is invalid or has expired'),
    })

    const formik = useFormik({
        initialValues:{
            resetCode :"",
        },

        onSubmit:sendDataToSingUp
        ,validationSchema

    })

    async function sendDataToSingUp(values){

        const options = {
            url:'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
            method:'post',
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

            toast.success('Correct Code')
            navigate('/resetpass')
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
                    <h1 class="flex items-center justify-center gap-2.5 font-bold text-center text-2xl mb-5 capitalize">check your e-mail
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                    </h1>  
                    <p className='text-gray-500 mt-2 text-sm text-center'>Reset code send to your email.</p>
                    <form onSubmit={formik.handleSubmit} >
                        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200 dark:bg-gray-200 p-2">
                        <div class="flex-col:">

                            <div className="px-3 py-5">
                                {}
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">Enter Reset Code</label>
                            <input 
                                name = 'resetCode'
                                value={formik.values.resetCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            type="text" class="border flex grow rounded-lg pe-25 ps-3 py-2 mt-1 mb-5 text-sm w-full" />
                            {formik.errors.resetCode && formik.touched.resetCode && ( 
                                    <p className='bg-red-300 p-2 rounded-2xl mb-3'>
                                        {formik.errors.resetCode}
                                    </p>
                                    
                                )}

                                <button type='submit' class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span class="inline-block mr-2">Next</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                </button>
                            </div>

                            <div className="pb-5 text-center">
                                <Link to={'/forgetpass'} className='text-blue-500 hover:underline hover:text-blue-600 px-5 py-3 rounded-xl capitalize text-sm '>Back to forget password</Link>
                            </div>
                            
                            {err && ( 
                                <p className='bg-red-300 p-2 rounded-xl mt-4'>{err}</p>
                            )}

                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckPass;