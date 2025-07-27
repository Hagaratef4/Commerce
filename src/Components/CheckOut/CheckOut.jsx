import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { cardContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CheckOut({totalPrice}) {

    let {cart , getCardLogged} = useContext(cardContext)
    let navigate = useNavigate()
    let [pay,setPay] = useState('cash')

    const phoneReg = /^01[0125][0-9]{8}$/

    const validationSchema = yup.object({
            details : yup.string().required('please enter your details'),
            phone :yup.string().required('please enter your phone').matches(phoneReg,'must be Egyption Number'),
            city: yup.string().required('please enter your city'),
        })
    
    const formik = useFormik({
        initialValues:{
            details : "",
            phone: "",
            city: ""
        },
    
            onSubmit:(x)=>{
                if(pay == 'cash'){
                    payCash(x)
                }else {
                    payOnline(x)
                }
            }
            ,validationSchema
    
        })


        async function payOnline(values){
            try{
                let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.cartId}?url=http://localhost:5173`,
                    {
                        shippingAddress:values
                    },
                    {
                        headers:{
                            token : localStorage.getItem('token')
                        }
                    }
                )
                if(data.status === "success"){
                    window.location.href = data.session.url
                }

            }catch(err){
                console.error(err)
            }
        }

        async function payCash(values){
            try{
                let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart?.cartId}`,
                    {
                        shippingAddress:values
                    },
                    {
                        headers:{
                            token : localStorage.getItem('token')
                        }
                    }
                )

                toast.success('Order created successfully')
                
                if(data.status === "success"){
                    navigate('/allorders')
                    getCardLogged()
                }

            }catch(err){
                console.error(err)
            }
        }

    return (
        <>
        <div className="container  max-w-[535px] mt-12">
            <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
            <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
            <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

            <form
            onSubmit={formik.handleSubmit}
            id="checkOut"
            className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
            >
            <h3 className="font-bold text-lg -ml-2 text-darkPrimary capitalize">Cart totals</h3>

            <div className="flex  gap-4 items-center">
                <span className="font-bold text-darkPrimary">Total :</span>
                <span className="text-primary font-semibold">
                {totalPrice} EGP
                </span>
            </div>
            <div>
                <input
                className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
                autoComplete="off"
                type="text"
                placeholder="Enter Your City Name"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.errors.city && formik.touched.city && 
                <p className="text-red-600 font-bold text-sm -my-3 ">
                    {formik.errors.city}
                </p>}

            <div>
                <input
                className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
                autoComplete="off"
                type="tel"
                placeholder="Enter Your Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.errors.phone && formik.touched.phone && 
                <p className="text-red-600 font-bold text-sm -my-3 ">
                    {formik.errors.phone}
                </p>}
            
            
            <div>
                <textarea
                className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
                placeholder="Details"
                name="details"
                onChange={formik.handleChange}
                value={formik.values.details}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.errors.details && formik.touched.details && 
                <p className="text-red-600 font-bold text-sm -my-3 ">
                    {formik.errors.details}
                </p>}
            

                <div className=" flex max-md:flex-col  gap-4 justify-between items-center">
                    <button
                    onClick={()=>{
                        setPay('cash')
                    }}
                    type="submit"
                    className="btn rounded-md cursor-pointer bg-primary hover:bg-darkPrimary text-white w-full flex py-2 text-nowrap items-center justify-center gap-2"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>

                    <span> Cash Order</span>
                    </button>
                    <button
                    onClick={()=>{
                        setPay('online')
                    }}
                    type="submit"
                    className="btn rounded-md cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-white text-darkPrimary w-full"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                    <span>Online Order</span>
                    </button>
                </div>
            </form>
        </div>
    </>
    );
}

export default CheckOut;