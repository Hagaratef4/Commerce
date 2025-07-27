import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import ProductsCard from '../ProductsCard/ProductsCard';
import Loader from '../../Components/Loader';
import ErrorPage from '../ErrorPage/ErrorPage';

function Category() {

    let {id} = useParams()
    console.log(id);

    let {data , isFetching} = useQuery({
        queryKey:['categoryProduct'],
        queryFn:()=>{
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        }
    })
    console.log(data);

    return (
        <>
            <div className="container my-6">
                    <div className="xl:mx-44">
                        <div className="flex items-center mb-5">
                        <Link
                        to={'/categories'}
                        className="cursor-pointer rounded-full p-1.5 mb-3.5 ease-in  mx-5 hover:bg-darkPrimary bg-primary text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                        </div>

                        {isFetching ? <Loader/>  : 
                        data?.data?.results == 0 ? <ErrorPage/> :              
                        <div className="grid gap-4 mx-15 md:mx-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {data?.data?.data.map((item)=>(
                                    <ProductsCard item={item}/>
                                    ))}
                        </div>
                        }

                    </div>

            </div>   
        </>
    );
}

export default Category;