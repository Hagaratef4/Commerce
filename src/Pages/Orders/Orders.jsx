import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import Loader from '../../Components/loader';
import OrderCard from '../../Components/OrderCard/OrderCard';

function Orders() {

    let userId = localStorage.getItem('userId')

    let {data , isLoading} = useQuery({
        queryKey: ['orders'],
        queryFn : ()=>{
            return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        }
    })
    console.log(data);

    return (
        <>
            <div className="container xl:px-20 mx-auto bg-white shadow-lg rounded-lg overflow-hidden py-8 dark:bg-gray-500">

                <div className="flex items-center mb-8">
                        <Link 
                        to={'/'}
                        className=" rounded-full p-1.5 cursor-pointer ease-in  my-3 mx-5 hover:bg-darkPrimary bg-primary text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                    <h2 className='text-darkPrimary text-2xl font-extrabold capitalize me-2 dark:text-white'>your orders</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                </div>

                {isLoading ? <Loader/> :
                    <div className="space-y-6 ">
                        {data?.data.map((item)=>(
                            <OrderCard item={item}/>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default Orders;