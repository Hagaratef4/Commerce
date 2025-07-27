import React, { useContext } from 'react';
import { cardContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';

function WishListItem({item}) {

    let {addProductToCard } = useContext(cardContext)
    let {deleteProductFromWish} = useContext(wishListContext)

    if (item?.count == 0) {
        return(
            <div className="space-y-4 text-center py-20">
                        <p className='text-darkPrimary'>There are not items yet.</p>
                            <Link to={'/products'} className='bg-primary hover:bg-darkPrimary p-2.5 capitalize text-white rounded-lg'>
                            add your first product to favorite
                            </Link>
                        </div>
        )
    }


    return (
        <>
            <div className="md:flex space-y-3 items-center md:gap-6 px-4 py-8 rounded-lg">
                    <img src={item?.imageCover} alt={item?.title} className="h-50 w-40 object-cover rounded-md" />
                    <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-darkPrimary text-xl capitalize">{item?.title}</h3>
                    <p className=" text-darkPrimary capitalize flex">rate : <span className='text-primary flex '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-300">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        {item?.ratingsAverage}</span></p>
                    <p className=" text-darkPrimary capitalize">price : <span className='text-primary'>{item.price}</span></p>
                    <p className=" text-gray-600 text-sm">{item.category?.name} | {item?.brand?.name} |
                        { item.quantity > 0 ? <p className='text-green-400 text-sm '>Availible</p> :<p>Not Availible</p>}
                    </p>
                    </div>
                    <div className="lg:flex space-y-2 lg:space-y-0 lg:items-center lg:gap-4">
                        <button
                        onClick={()=>{
                            addProductToCard(item._id)
                        }}
                        className='bg-primary hover:bg-darkPrimary rounded-2xl text-white p-2.5 flex gap-1 text-sm uppercase'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                            </svg>
                            add to cart
                        </button>
                        <button 
                        onClick={()=>{
                            deleteProductFromWish(item._id)
                        }}
                        className='bg-red-600 hover:bg-red-700 rounded-2xl text-white p-2.5 flex gap-1 text-sm uppercase'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                            remove
                        </button>
                    </div>
                    
                </div>
        </>
    );
}

export default WishListItem;