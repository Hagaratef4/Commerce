import React, { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import axios from 'axios';
import BrandCard from '../../Components/BrandCard/BrandCard';
import 'animate.css'



function Brands() {

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    async function getDisplayData (){
        setLoading(true)
        try{
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            setProducts(data.data)

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getDisplayData()
    },[])

    return (
        <>

        <div className="bg-white flex items-center justify-center p-6 dark:bg-gray-500">
                <div className="xl:max-w-6xl xl:w-auto w-full rounded-xl pb-6">
                    <div className="border-y grow text-center border-gray-400">
                        <h2 className='text-primary text-lg py-3 capitalize dark:text-slate-200'>Shop by brands</h2>
                    </div>
                    
                    {loading? <Loader/>:
                        <div className="animate__animated animate__fadeInUp grid grid-cols-2 gap-5 space-y-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 py-7">
                            {products.map((item)=>(
                                <BrandCard item={item}/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Brands;