import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import WishListItem from '../../Components/WishListItem/WishListItem';
import { wishListContext } from '../../Context/WishListContext';

function WishList() {

    let {wish , loading , loggedProductToWishList ,deleteProductFromWish} = useContext(wishListContext)
    

    useEffect(()=>{
        loggedProductToWishList()
    },[])

    if(loading){
            return (
                <div className="bg-white flex items-center justify-center p-6 dark:bg-gray-500">
                    <div className="xl:min-w-6xl xl:w-auto w-full bg-gray-200 rounded-xl p-6 bg-gray-400">
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full p-1.5 bg-gray-300 animate-pulse my-3 mx-5 w-8 h-8"></div>
                            <div className="h-6 w-48 bg-gray-300 animate-pulse"></div>
                            <div className="w-8 h-8 bg-gray-300 animate-pulse"></div>
                        </div>
                
                        <div className="md:flex space-y-3 items-center md:gap-6 px-4 py-8 rounded-lg">
                            <div className="h-40 w-40 bg-gray-300 animate-pulse rounded-md"></div>
                            <div className="flex-1 space-y-1">
                                <div className="h-6 w-48 bg-gray-300 animate-pulse"></div>
                                <div className="flex items-center">
                                    <span className="h-6 w-16 bg-gray-300 animate-pulse"></span>
                                    <span className="h-6 w-6 bg-gray-300 animate-pulse ml-2"></span>
                                </div>
                                <div className="h-6 w-48 bg-gray-300 animate-pulse"></div>
                                <div className="h-4 w-32 bg-gray-300 animate-pulse"></div>
                            </div>
                            <div className="lg:flex space-y-2 lg:space-y-0 lg:items-center lg:gap-4">
                                <button className="bg-gray-300 animate-pulse rounded-2xl text-white p-2.5 flex gap-1 text-sm uppercase w-32 h-10"></button>
                                <button className="bg-gray-300 animate-pulse rounded-2xl text-white p-2.5 flex gap-1 text-sm uppercase w-32 h-10"></button>
                            </div>
                        </div> 
                    </div>
                </div>     
        )
    }

    if(wish.count == 0) {
        return(
            <div className="bg-white flex items-center justify-center p-6 dark:bg-gray-500">
            <div className="xl:min-w-6xl xl:w-auto w-full bg-mainLight rounded-xl shadow-lg p-6 dark:bg-gray-300">
                <div className="flex gap-2 items-center">
                    <Link
                        to={'/'}
                        className=" rounded-full p-1.5 cursor-pointer ease-in  my-3 mx-5 hover:bg-darkPrimary bg-primary text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                    <h2 className="text-2xl font-bold text-darkPrimary capitalize ">favorite products</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>

            <div className="space-y-4 text-center py-20">
                        <p className='text-darkPrimary'>There are not items yet.</p>
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
                <div className="flex gap-2 items-center">
                    <Link
                        to={'/'}
                        className=" rounded-full p-1.5 cursor-pointer ease-in  my-3 mx-5 hover:bg-darkPrimary bg-primary text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                    <h2 className="text-2xl font-bold text-darkPrimary capitalize ">favorite products</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>

                        <div className="space-y-4">
                            {wish?.data?.map((item)=>(
                                <WishListItem key={item._id} item={item}/>
                            ))}
                        </div>

                <div className="flex justify-center">
                    <button 
                    onClick={()=>{
                        wish?.data?.map((item)=>{
                            deleteProductFromWish(item._id)
                        })
                    }}
                        className='text-center has-checked:hidden bg-red-600 hover:bg-red-700 rounded-2xl text-white p-2.5 flex gap-1 text-sm uppercase'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                            remove all
                    </button>
                </div>
            </div>
            </div>
        </>
    );
}

export default WishList;