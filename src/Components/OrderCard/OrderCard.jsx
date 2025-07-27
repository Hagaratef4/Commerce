import React from 'react';
import { Link } from 'react-router-dom';

function OrderCard({item}) {

    const totalQuantity = item?.cartItems?.reduce((acc, cur) => acc + cur.count, 0);


    return (
        <div className="xl:mx-20 px-5 border-2 border-dashed border-gray-300 rounded-xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-5 items-center">
                        <p className='text-darkPrimary font-bold dark:text-white'>Transaction Number : <span className='font-medium'>#{item.id}</span> </p>
                        <p className='text-darkPrimary font-bold dark:text-white'>Placed on : <span className='font-medium'>{item.createdAt.split('',10).join('')}</span></p>
                        <div className="flex justify-between items-center">
                            <p className='text-darkPrimary font-bold dark:text-white'>Payment : <span className='font-medium'>{item.paymentMethodType}</span></p>
                            <Link
                            to={'/'}
                            className='bg-primary hover:bg-darkPrimary text-sm rounded-xl py-2 px-2 capitalize text-white'>
                            add new item
                            </Link>
                        </div>
                    </div>

                    {/* order details */}
                    <div className="gap-4 py-4 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border-t border-gray-300">
                        {item?.cartItems.map((cartItem)=>(
                            <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                    <img src={cartItem.product.imageCover} alt={cartItem.product.title} className='h-full' />
                                    </div>
                                    <div className="m-3 space-y-1.5">
                                        <p className='text-darkPrimary capitalize font-medium dark:text-green-200'>{cartItem.product.title.split(' ',3).join(' ')}</p>
                                        <p className='text-darkPrimary font-meduim capitalize dark:text-slate-300'>price : <span className='font-medium text-primary'>{cartItem.price}</span></p>
                                        <p className='text-darkPrimary font-meduim capitalize dark:text-slate-300'>Quantity : <span className='font-medium text-primary'>{cartItem.count}</span></p>
                                        <p className='text-gray-500 capitalize dark:text-slate-300'>{cartItem.product.category.name}</p>
                                        <p className='text-gray-500 capitalize dark:text-slate-300'>{cartItem.product.brand.name}</p>
                                    </div>
                            </div>)
                        )}
                        

                    </div>
                        <div className="space-y-4 pb-5">
                            <div className="mt-3 space-y-1">
                                <p className='text-darkPrimary font-bold  capitalize dark:text-white'>products quantity : <span className='text-primary'>{totalQuantity}</span></p>
                                <p className='text-darkPrimary font-bold capitalize dark:text-white'>shipping price : <span className='text-primary'>{item.shippingPrice}</span></p>
                            </div>
                            <p className='text-darkPrimary font-extrabold capitalize text-xl dark:text-white'>total order price :  <span className='text-primary'>{item.totalOrderPrice}</span></p>
                        </div>
                </div>
    );
}

export default OrderCard;