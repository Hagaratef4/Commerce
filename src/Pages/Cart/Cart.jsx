import React, { useContext, useEffect } from 'react';
import { cardContext } from '../../Context/CartContext';
import CartItems from '../../Components/cartItems/CartItems';
import logo from '../../../public/images/favicon.png'
import CheckOut from '../../Components/CheckOut/CheckOut';
import { Link } from 'react-router-dom';

function Cart() {

    let {cart ,items , loading , clearCart , getCardLogged}= useContext(cardContext)

    useEffect(()=>{
        getCardLogged()
    },[])



    if(loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 animate-pulse dark:bg-gray-500">
            <div className="xl:min-w-6xl xl:w-auto w-full bg-gray-200 rounded-xl shadow-lg p-6 dark:bg-gray-400">
                <div className="h-5 bg-gray-300 mb-8" />
                <div className="space-y-4">
                {/* Skeleton for Cart Item */}
                <div className="h-16 bg-gray-300" />
                {/* Skeleton for Summary */}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between text-base mb-2">
                    <div className="w-1/4 h-4 bg-gray-300" />
                    <div className="w-1/4 h-4 bg-gray-300" />
                    </div>
                    <div className="flex justify-between text-base mb-4">
                    <div className="w-1/4 h-4 bg-gray-300" />
                    <div className="w-1/4 h-4 bg-gray-300" />
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-6">
                    <div className="w-1/4 h-5 bg-gray-300" />
                    <div className="w-1/4 h-5 bg-gray-300" />
                    </div>
                    <div className="w-full h-10" />
                </div>
                </div>
            </div>
            </div>
        );
    }

    if(cart?.numOfCartItems == 0){
        return(
            <div className="bg-white flex items-center justify-center p-6 dark:bg-gray-500">
            <div className="xl:min-w-6xl xl:w-auto w-full bg-mainLight rounded-xl shadow-lg p-6 dark:bg-gray-300">
                <div className="flex justify-between items-center">
                    <div className="flex items-center mb-8 gap-2">
                        <Link
                            to={'/'}
                            className=" rounded-full p-1.5 cursor-pointer ease-in  my-3 mx-5 hover:bg-darkPrimary bg-primary text-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                        </Link>
                    <h2 className="text-2xl font-bold text-darkPrimary dark:text-white text-md">Shop Cart</h2>
                    <img src={logo} alt="logo" className='w-10' />
                    </div>
                </div> 
            <div className="space-y-4 text-center pb-25 pt-10">
                        <p className='text-darkPrimary '>There are not items yet.</p>
                            <Link to={'/products'} className='bg-primary hover:bg-darkPrimary p-2.5 capitalize text-white rounded-lg'>
                            add your first product to favorite
                            </Link>
                </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="bg-white flex items-center justify-center p-6 dark:bg-gray-500">
            <div className="xl:min-w-6xl xl:w-auto w-full bg-mainLight rounded-xl shadow-lg p-6 dark:bg-gray-300">
                <div className="flex justify-between items-center">
                    <div className="flex items-center mb-8 gap-2">
                        <Link
                            to={'/'}
                            className=" rounded-full p-1.5 cursor-pointer ease-in  my-3 mx-5 hover:bg-darkPrimary bg-primary text-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                        </Link>
                    <h2 className="text-2xl font-bold text-darkPrimary">Shop Cart</h2>
                    <img src={logo} alt="logo" className='w-10' />
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="flex justify-between text-lg font-bold text-darkPrimary">Total Price:</p>
                        <p className='text-primary text-lg font-bold'>{cart?.totalCartPrice} EGP</p>
                    </div>
                </div> 

                {items ? 
                    <div className="space-y-4 text-center py-20">
                        <p className='text-darkPrimary'>There are not items yet.</p>
                        <Link to={'/products'} className='bg-primary hover:bg-darkPrimary p-2.5 capitalize text-white rounded-lg'>
                            add your first product to cart
                        </Link>
                    </div>  
                    :

                    <div className="space-y-4">
                    {/* Cart Item 1 */}
                    {cart?.products.map((item)=>(
                        <CartItems tems key={item._id} item={item}/>
                    ))}
                    <div className="flex justify-end">
                            <button
                        onClick={clearCart}
                        className='bg-red-600 flex space-x-2 rounded-lg p-1.5 text-white hover:bg-red-400'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <p className='capitalize'>clear all products</p>
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 pt-6 border-t">
                        <CheckOut totalPrice={cart?.totalCartPrice}/>
                    </div>
                    </div>
            }
            </div>
            </div>
        </>
    );
}

export default Cart;