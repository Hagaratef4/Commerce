import React, { useContext, useState } from 'react';
import { cardContext } from '../../Context/CartContext';

function CartItems({item}) {

    let {deleteProductFromCard ,setItems, updateCart , disableBtn} = useContext(cardContext)

    const [count,setCount] = useState(item?.count)

    function countUpdate(){
        if (count === item?.count) {
            return
        }
        updateCart(count , item?.product._id)
    }

    function lastItem(){
        if (item?.numOfCartItems == 0) {
            setItems(true)
        }else{
            setItems(false)
        }
    }

    return (
        <div className="xl:max-w-6xl flex items-center gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-400">
                    <img src={item?.product.imageCover} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-darkPrimary dark:text-green-300">{item?.product.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-700">Price: EGP {item.price}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-700">{item.product.category?.name} | {item?.product.brand?.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                    <button
                    disabled = {disableBtn}
                    onClick={() => {
                        const newCount = count - 1;
                        setCount(newCount);
                        updateCart(newCount, item?.product._id);
                    }}
                    className="disabled:cursor-not-allowed cursor-pointer text-gray-500 hover:text-red-700 text-2xl">-</button>
                    <input
                    onChange={(e)=>{
                        setCount(Number(e.target.value));
                    }}
                    onBlur={countUpdate}
                    className="w-15 text-center dark:text-white"
                    value={count}
                    type="number" />
                    <button
                    disabled = {disableBtn}
                    onClick={() => {
                        const newCount = Number(count) + 1;
                        setCount(newCount);
                        updateCart(newCount, item?.product._id);
                    }}
                    className="disabled:cursor-not-allowed text-gray-500 cursor-pointer hover:text-green-500 text-2xl">+</button>
                    </div>
                    <p className="font-semibold text-gray-900 w-20 text-right dark:text-white/70">EGP {item?.price * count}</p>
                    <button className="text-gray-400 hover:text-red-500 text-2xl dark:text-black/70"
                    onClick={()=>{
                        deleteProductFromCard(item?.product._id),
                        lastItem()
                    }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
        </div>
    );
}

export default CartItems;