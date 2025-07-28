import React from 'react';
import ProductsCard from '../../Components/ProductsCard/ProductsCard';
import axios from 'axios';
import Loader from '../../Components/Loader';
import { useQuery } from '@tanstack/react-query';
import 'animate.css'
import { Navigate } from 'react-router-dom';

function Home() {

    let {data , isLoading } = useQuery({
        queryKey:['showProduct'],
        queryFn:()=>{
            return axios.get('https://ecommerce.routemisr.com/api/v1/products')
        }
    })

    return (
        <>
            <div className="container my-6">
                { isLoading ? <Loader/> :
                <div>
                    <div className="container xl:px-44 px-4 flex flex-col md:flex-row items-stretch gap-4">
                    <div className="md:w-2/3 h-full relative overflow-hidden">
                        <img
                        src="/images/img1.jpg"
                        alt=""
                        className="w-full h-full md:h-[480px] lg:h-[660px] xl:h-[788px] object-cover rounded-xl"
                        />
                        <div className="absolute top-5 md:top-18 -left-3 space-y-4">
                            <div className="bg-gray-50/30 rounded-2xl me-8">
                                <p className='text-white px-10 py-3 text-sm md:text-lg'>Whether you’re looking for the freshest produce, pantry staples, or specialty items, FreshCart brings the supermarket to you, redefining the way you shop for groceries.</p>
                            </div>
                                <button
                                onClick={() => {
                                        document.getElementById("product-section")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                            
                                className=' py-3 px-8 bg-primary text-sm md:text-md rounded-full text-white capitalize mx-13 hover:bg-darkPrimary'>
                                    get start
                                </button>
                            
                        </div>
                    </div>

                    {/* Two Small Images */}
                    <div className="md:w-1/3 flex flex-row md:flex-col gap-4">
                        <div className="w-1/2 md:w-full">
                        <img
                            src="/images/img3.jpg"
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        />
                        </div>
                        <div className="w-1/2 md:w-full">
                        <img
                            src="/images/img4.jpg"
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        />
                        </div>
                    </div>
                </div>

                <h2 id='product-section' className='wrapper font-extrabold text-3xl relative text-gray-800 text-center my-9 dark:text-white'> Shope now by popular products</h2>
                    <div className="animate__animated animate__fadeInUp grid gap-4 mx-15 md:mx-8 xl:mx-44 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.data.data.map((item) => (
                        <div
                            key={item.id}
                            className={`animate__animated animate__fadeInUp animate__delay-2s`}
                        >
                            <ProductsCard item={item} />
                        </div>
                        ))}
                    </div>
                </div>
                }
            </div>     
        </>
    );
}

export default Home;