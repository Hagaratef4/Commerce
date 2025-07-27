import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/images/favicon.png'
import { authContext } from '../../Context/AuthContext';
import { cardContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';

function Navbar({toggelTheme , theme}) {

    let [mobileMenuOpen , setMpbileMenuOpen] = useState(false)
    
    let {cart} = useContext(cardContext)
    let {wish} = useContext(wishListContext)
    let {token , setToken} = useContext(authContext)
    let [counter , setCounter] = useState(cart?.numOfCartItems)
    let [WishCount , setWishCount] = useState(wish?.count)

    useEffect(()=>{
        setCounter(cart?.numOfCartItems)
    },[cart])

    useEffect(()=>{
        setWishCount(wish?.count)
        console.log(wish?.count);
    },[wish])

    function toggleMenu(){
        setMpbileMenuOpen(!mobileMenuOpen)
    }


    function logOut(){
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <div className='bg-mainLight pt-6 pb-4 dark:bg-gray-600'>

        {/* disk top design */}
            <div className="hidden cursor-pointer  lg:container lg:w-[75%] lg:flex lg:justify-between lg:items-center">
                <div className='flex'>
                    <img src={logo} alt="logo" className='w-10'/>
                    <h1 className='text-3xl text-gray-800 font-bold dark:text-white'>FreshCart</h1>
                </div>

                {/* pages links */}
                {token ? (
                    <ul className='flex justify-between space-x-6 items-center text-gray-500 dark:text-gray-300'>
                    <li>
                        <Link to={'/'} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Home</Link>
                    </li>
                    <li>
                        <Link to={'/products'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300 '>Products</Link>
                    </li>
                    <li>
                        <Link to={'/categories'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Categories</Link>
                    </li>
                    <li>
                        <Link to={'/brands'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Brands</Link>
                    </li>
                    <li> 
                        <Link to={'/allorders'} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300 '>Orders</Link>
                    </li>
                </ul>
                ):null}


                {/* autho links */}
                <ul className='flex justify-between items-center space-x-4 dark:text-gray-200'>
                    {token ? (
                        <>
                        <li>
                            <Link to={'/wishList'}>
                            {WishCount  > 0 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-red-700">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>:
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    }
                        </Link>
                        </li>

                            <li className='relative'>
                                <Link to={'/cart'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </Link>

                            {Number(counter) > 0 && (
                            <div className="absolute -top-4 -left-4 bg-primary text-white text-center size-5 text-sm  rounded-full">
                                {cart?.numOfCartItems}
                            </div> )}
                            </li>
                        </>
                    ) :
                    null
                    }

                    {!token ? (
                        <>
                            <li>
                                <Link to={'/login'} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Login</Link>
                            </li>
                            <li>
                                <Link to={'/register'} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Register</Link>
                            </li>
                        </>
                    ) : 
                        <li>
                            <Link onClick={logOut} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>LogOut</Link>
                        </li>
                    }

                    <li onClick={toggelTheme}>
                        {theme == 'dark' ? <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  hover:text-primary focus:font-extrabold focus:text-darkPrimary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        : <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary focus:font-extrabold focus:text-darkPrimary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>}</li>
                </ul>


            </div>
        
        {/* mobil design */}
            <div className='lg:hidden overflow-hidden mx-3 cursor-pointer'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <img src={logo} alt="logo" className='w-10'/>
                    <h1 className='text-3xl text-darkPrimary font-bold dark:text-white'>FreshCart</h1>
                    </div>
                    <div onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </div>
                </div>
                <div className={`lg:hidden mx-5 mt-4 space-y-2 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} >
                    {/* pages links */}
                    {token ? (
                    <ul className='space-y-2 text-gray-500 dark:text-gray-300'>
                    <li>
                        <Link to={'/'} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Home</Link>
                    </li>
                    <li>
                        <Link to={'/products'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Products</Link>
                    </li>
                    <li>
                        <Link to={'/categories'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Categories</Link>
                    </li>
                    <li>
                        <Link to={'/brands'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Brands</Link>
                    </li>
                    <li> 
                        <Link to={'/allorders'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Orders</Link>
                    </li>
                </ul>
                ):null}

                    {/* autho links */}
                    <ul className='space-y-2 dark:text-gray-300'>
                    {token ? (
                        <>
                        <li>
                            <Link to={'/wishList'}>
                            {WishCount  > 0 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-red-700">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>:
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    }
                        </Link>
                        </li>

                            <li className='relative'>
                                <Link to={'/cart'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </Link>

                            {Number(counter) > 0 && (
                            <div className="absolute -top-4 -left-4 bg-primary text-white text-center size-5 text-sm  rounded-full">
                                {cart?.numOfCartItems}
                            </div> )}
                            </li>
                        </>
                    ) :
                    null
                    }

                    {!token ? (
                        <>
                            <li>
                                <Link to={'/login'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Login</Link>
                            </li>
                            <li>
                                <Link to={'/register'} className=' hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300'>Register</Link>
                            </li>
                        </>
                    ) : 
                        <li>
                            <Link onClick={logOut} className='hover:text-primary focus:font-extrabold focus:text-darkPrimary dark:focus:text-green-300 '>LogOut</Link>
                        </li>
                    }

                    <li onClick={toggelTheme}>
                        {theme == 'dark' ? <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  hover:text-primary focus:font-extrabold focus:text-darkPrimary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        : <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary focus:font-extrabold focus:text-darkPrimary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>}</li>
                    </ul>

                </div>
            </div>

        </div>
    );
}

export default Navbar;