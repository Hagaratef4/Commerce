import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cardContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';
import 'animate.css'

function ProductsCard({item}) {

    let {addProductToCard} = useContext(cardContext)
    let {addProductToWishList} = useContext(wishListContext)

    return (
    <>
        <div className='animate__animated animate__fadeInUp shadow-lg rounded-2xl overflow-hidden group'>
            <div className='overflow-hidden relative '>
                <img src={item.imageCover} alt={item.title} className='p-2' />
                <div className="layer absolute w-full min-h-full opacity-0  group-hover:opacity-100 group-hover:top-0 text-white top-100 flex gap-3 justify-center items-center">
                    <div
                    onClick={()=>{
                        addProductToWishList(item._id)
                    }
                    }
                    className="heart  bg-green-300 p-2.5 rounded-4xl hover:bg-green-700 opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0 transition-all ease-in-out duration-300 delay-[100ms] ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 has-checked:text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                    </div>
                    <div
                    onClick={()=>{
                        addProductToCard(item._id)
                    }}
                    className="cart bg-green-300 hover:bg-green-700 p-2.5 rounded-4xl opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0   transition-all ease-in-out duration-500 delay-[300ms] ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                    <Link to={`/productsDetailes/${item.id}`} className="eye bg-green-300 hover:bg-green-700 p-2.5 rounded-4xl opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0  transition-all ease-in-out duration-1000 delay-[700ms]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </Link>
                </div> 
            </div>
            <div className="p-5 space-y-6 ">
                <div className="space-y-1.5">
                    <p className='text-green-400 hover:text-red-700 cursor-pointer'>{item.category.name}</p>
                    <p className='font-extrabold text-green-800 dark:text-slate-200'>{item.title.split(' ').slice(0,3).join(' ',)}</p>
                    <div className="flex gap-2">
                        <p className='text-gray-700 dark:text-white'>{item.brand.name}|</p>
                        { item.quantity > 0 ? <p className='text-green-400 '>Availible</p> :<p>Not Availible</p>}
                    </div>
                </div>
                <div className="flex justify-between ">
                    <span className='text-green-400'>EGP {item.price}</span>

                    <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                        <span className='text-green-600'>{item.ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ProductsCard;