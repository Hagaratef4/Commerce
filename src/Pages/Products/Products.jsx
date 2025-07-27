import React, { useEffect, useState } from 'react';
import ProductsCard from '../../Components/ProductsCard/ProductsCard';
import axios from 'axios';
import Loader from '../../Components/loader';

function Products() {

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [pageClick,setPageClick] = useState(null)
    
    function hundlePages(x){
        getDisplayData(x)
    }

    async function getDisplayData (page=1){
        setLoading(true)
        try{
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
            setProducts(data.data)
            setPageClick(data.metadata)

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
            <div className="container my-6">

                {loading ? <Loader/> :
                    <div className="grid gap-4 mx-15 md:mx-8 xl:mx-44 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((item)=>(
                        <ProductsCard item = {item}/>
                    ))}
                </div>}

                    <div className='flex justify-center items-center my-5 gap-4'>
                        {[...Array(pageClick?.numberOfPages)].map((item,index)=>(
                            <button
                            onClick={()=>{
                                hundlePages(index+1)
                            }}
                            className='flex gap-3 btn p-2 rounded-lg bg-primary text-white cursor-pointer '>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                        </svg>
                                {index+1}
                            </button>
                        ))}
                    </div>

            </div>     
        </>
    );
}

export default Products;