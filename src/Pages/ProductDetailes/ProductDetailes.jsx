import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {  Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductsCard from '../../Components/ProductsCard/ProductsCard';
import { useQuery } from '@tanstack/react-query';
import { wishListContext } from '../../Context/WishListContext';
import { cardContext } from '../../Context/CartContext';


function ProductDetailes() {
    let {id} = useParams()
    let {addProductToWishList} = useContext(wishListContext)
    let {addProductToCard} = useContext(cardContext)
    
    
    let {data , isLoading } = useQuery({
        queryKey:['products','details'],
        queryFn:()=>{
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        }
    })
    let [selectedImage, setSelectedImage] = useState(null);
    console.log(data?.data.data.imageCover);

    useEffect(() => {
            if (data?.data.data.imageCover) {
            setSelectedImage(data.data.data.imageCover);
        }
        }, [data]);

    if(isLoading){
        return(
        <>
            <div class="container mx-auto bg-white rounded-xl shadow-lg  overflow-hidden animate-pulse dark:bg-gray-500">
                <div class="flex flex-col items-center md:flex-row xl:mx-35 xl:my-15 rounded-xl dark:bg-gray-300">
    
                    <div class="md:w-1/3 p-4 relative">
                    <div class="h-64 bg-gray-200 rounded"></div>
                    <div class="absolute top-2 right-2 h-6 w-6 bg-gray-200 rounded-full"></div>
                    <div class="mt-5 flex justify-between items-center">
                        <div class="w-1/3 h-12 bg-gray-200 rounded-lg"></div>
                        <div class="w-1/3 h-12 bg-gray-200 rounded-lg"></div>
                        <div class="w-1/3 h-12 bg-gray-200 rounded-lg"></div>
                    </div>
                    </div>
                
                    <div class="md:w-2/3 p-6">
                    <div class="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div class="flex items-center mb-4">
                        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/6 ml-2"></div>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                        <div>
                        <div class="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div class="h-4 bg-gray-200 rounded w-2/5 mt-2"></div>
                        </div>
                        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
                    </div>
                    <div class="h-4 bg-green-200 text-sm font-semibold mb-4 w-1/4"></div>
                    <div class="flex space-x-4">
                        <button class="flex-1 h-12 bg-gray-200"></button>
                        <button class="flex-1 h-12 bg-gray-200"></button>
                    </div>
                    </div>
                </div>
            </div>
        </>
        )
    }

    // <div className="flex flex-col items-center md:flex-row xl:shadow-2xl dark:bg-gray-300 rounded-lg">
    //             {/* Product Image */}
    //             <div className="md:w-1/3 p-4 ">
    //                 <div className="relative">
    //                 <img src={data?.data.data.imageCover} alt="HP Victus Laptop" className="w-full h-auto object-cover rounded-lg" />
    //                 </div>
    //             <div className="mt-2">
    //             <Swiper
    //                 modules={[Pagination, A11y]}
    //                 spaceBetween={20}
    //                 slidesPerView={3}
    //                 pagination={{ clickable: true }}
    //                 onSwiper={(swiper) => console.log(swiper)}
    //                 onSlideChange={() => console.log('slide change')}
    //                 >
    //                 {data?.data.data.images.map((images)=>(
    //                         <SwiperSlide> <img src={images} alt={data?.data.data.title}/></SwiperSlide>
    //                 ))}
    //             </Swiper>   
    //                 </div>
    //             </div>

    //             {/* Product Details */}
    //             <div className="md:w-2/3 p-6 relative">
    //                 <Link 
    //                 to={'/'}
    //                 className="absolute rounded-full p-1.5 right-0 cursor-pointer top-0 my-3 mx-5 hover:bg-darkPrimary hover:-top-0.5 hover:right-0.5 transition-all ease-in bg-primary text-center text-white">
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    //                     </svg>
    //                 </Link>
    //                 <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-green-600">{data?.data.data.title}</h1>
    //                 <p className="text-sm text-gray-600 mb-4">{data?.data.data.description}</p>
    //                 <div className="flex items-center mb-4">
    //                 <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{data?.data.data.ratingsAverage} ★</span>
    //                 <span className="text-sm text-gray-500 ml-2">1,234 reviews</span>
    //                 </div>
                    
    //                 <div className="flex items-center justify-between mb-4">
    //                 <div>
    //                     <span className="text-3xl font-bold text-gray-900 dark:text-white">EGP {data?.data.data.price}</span>
    //                     <span className="ml-2 text-sm font-medium text-gray-500 line-through">EGP {data?.data.data.price+200}</span>
    //                 </div>
    //                 {/* <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span> */}
    //                 </div>
    //                 <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
    //                 <div className="flex space-x-4">
    //                 <button
    //                 onClick={()=>{
    //                     addProductToWishList(data.data.data._id)
    //                 }}
    //                 className="flex bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    //                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    //                     </svg>
    //                 </button>
    //                 <button
    //                 onClick={()=>{
    //                     addProductToCard(data.data.data._id)
    //                 }}
    //                 className="flex-1 bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
    //                     Add to Cart
    //                 </button>
    //                 </div>
    //             </div>

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-20 bg-white shadow-lg rounded-lg overflow-hidden py-8 dark:bg-gray-500">
                <div className="flex flex-col sm:flex-row sm:gap-6 items-center md:flex-row xl:shadow-2xl dark:bg-gray-300 rounded-lg">
                
                {/* <div className="md:w-1/3 p-4 ">
                    <div className="relative">
                    <img src={data?.data.data.imageCover} alt="HP Victus Laptop" className="w-full h-auto object-cover rounded-lg" />
                    </div>
                <div className="mt-2">
                <Swiper
                    modules={[Pagination, A11y]}
                    spaceBetween={20}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    >
                    {data?.data.data.images.map((images)=>(
                            <SwiperSlide> <img src={images} alt={data?.data.data.title} className='rounded-lg'/></SwiperSlide>
                    ))}
                </Swiper>   
                    </div>
                </div> */}
                <div className="md:w-1/3 w-full p-4"> 
                    <div className="relative">
                        <img
                            src={selectedImage}
                            alt="Main Product"
                            className="w-full h-auto object-cover rounded-lg"
                            />
                    </div>

                    <div className="mt-2">
                        <Swiper
                            modules={[Pagination, A11y]}
                            pagination={{ clickable: true }}
                            spaceBetween={20}
                            breakpoints={{
                                0: { slidesPerView: 4 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 3 },
                            }}
                            >
                            {data?.data.data.images.map((image, i) => (
                                <SwiperSlide key={i}>
                                <img
                                    src={image}
                                    alt={data?.data.data.title}
                                    onClick={() => setSelectedImage(image)}
                                    className="rounded-lg w-25 cursor-pointer hover:opacity-80 transition"
                                />
                                </SwiperSlide>
                            ))}
                            </Swiper>
                    </div>
                    </div>

                
                <div className="md:w-2/3 p-6 relative">
                    <Link 
                    to={'/'}
                    className="absolute rounded-full p-1.5 right-0 cursor-pointer top-0 my-3 mx-5 hover:bg-darkPrimary hover:-top-0.5 hover:right-0.5 transition-all ease-in bg-primary text-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-green-600">{data?.data.data.title}</h1>
                    <p className="text-sm text-gray-600 mb-4">{data?.data.data.description}</p>
                    <div className="flex items-center mb-4">
                    <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{data?.data.data.ratingsAverage} ★</span>
                    <span className="text-sm text-gray-500 ml-2">1,234 reviews</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-3xl sm:text-2xl font-bold text-gray-900 dark:text-white">EGP {data?.data.data.price}</span>
                        <span className="ml-2 text-sm  font-medium text-gray-500 line-through">EGP {data?.data.data.price+200}</span>
                    </div>
                    
                    </div>

                    <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
                    <div className="flex space-x-4">
                    <button
                    onClick={()=>{
                        addProductToWishList(data.data.data._id)
                    }}
                    className="flex bg-primary sm:w-auto hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                    <button
                    onClick={()=>{
                        addProductToCard(data.data.data._id)
                    }}
                    className="flex-1 sm:flex-1 bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                        Add to Cart
                    </button>
                    </div>
                </div>
                </div>

  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start dark:bg-gray-300 rounded-lg">
    
    {/* Product Image + Swiper 
    <div className="w-full">
      <img
        src={data?.data.data.imageCover}
        alt="product"
        className="w-full h-auto object-cover rounded-lg"
      />
      <div className="mt-2">
        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
        >
          {data?.data.data.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="product thumbnail" className="rounded-md" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

    {/* Product Details 
    <div className="relative space-y-4 px-2 sm:px-4">
      <Link to={'/'} className="absolute right-2 top-2 text-white bg-primary p-2 rounded-full hover:bg-darkPrimary transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold dark:text-green-600">{data?.data.data.title}</h1>
      <p className="text-sm sm:text-base text-gray-600">{data?.data.data.description}</p>

      <div className="flex items-center gap-2">
        <span className="bg-green-500 text-white text-xs sm:text-sm font-semibold px-2 py-0.5 rounded">
          {data?.data.data.ratingsAverage} ★
        </span>
        <span className="text-xs text-gray-500">1,234 reviews</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg sm:text-2xl font-bold dark:text-white text-gray-800">
            EGP {data?.data.data.price}
          </span>
          <span className="ml-2 text-sm text-gray-500 line-through">
            EGP {data?.data.data.price + 200}
          </span>
        </div>
      </div>

      <p className="text-green-600 text-sm font-semibold">Free Delivery</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => addProductToWishList(data.data.data._id)}
          className="w-full sm:w-auto bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded"
        >
          ❤️
        </button>

        <button
          onClick={() => addProductToCard(data.data.data._id)}
          className="w-full sm:flex-1 bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div> */}



            {/* <div className="my-10">
                <h1 className='wrapper font-extrabold text-3xl relative text-gray-800 text-center my-9'>Related Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {relate?.map((item)=>(
                    <ProductsCard key={item._id} item={item}/>
                ))}
                </div>
            </div> */}
            </div>
        </>
    );
}

export default ProductDetailes;