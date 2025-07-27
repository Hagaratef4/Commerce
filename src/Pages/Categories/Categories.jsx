import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import Loader from '../../Components/loader';
import React from 'react';

function Categories() {


    let {data , isLoading } = useQuery({
        queryKey:['categories'],
        queryFn:()=>{
            return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        }
    })
    console.log(data);

    return (
        <>
            <div className="bg-white flex items-center justify-center p-6 dark:bg-gray-500">
                <div className="xl:max-w-6xl xl:w-auto w-full rounded-xl pb-6">
                    <div className="border-y grow text-center border-gray-400">
                        <h2 className='text-primary text-lg py-3 dark:text-white'>Shop by category</h2>
                    </div>
                    
                    {isLoading? <Loader/>:
                        <div className="grid grid-cols-2 gap-5 space-y-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 py-7">
                            {data?.data?.data.map((item)=>(
                                <CategoryCard item={item}/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Categories;