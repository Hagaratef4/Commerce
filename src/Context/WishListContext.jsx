import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext(null)

import React from 'react';
import toast from "react-hot-toast";

function WishListContextProvider({children}) {

    let [wish,setWish] = useState(null)
    let [loading,setLoading] = useState(false)


    async function loggedProductToWishList(){
        setLoading(true)
        try{
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            setWish({
                data: data.data,
                count : data.count
            })
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }
    async function addProductToWishList(productId){
        let toastLoading = toast.loading('Adding your product to wish list..')
        setLoading(true)
        try{
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
                    productId
            },{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            setWish({
                data: data.data,
                count : data.count
            })
            toast.success('Product added successfully to your wishlist')
            await loggedProductToWishList()
        }catch(err){
            console.log(err);
        }finally{
            toast.dismiss(toastLoading)
            setLoading(false)
        }
    }
    async function deleteProductFromWish(id){
        let toastLoading = toast.loading('Removing Product from wish list ..')
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
                headers :{
                    token : localStorage.getItem('token'),
                }
            })
            toast.success('product removed successfully')
            setWish({
                data: data.data,
                count : data.count
            })
            await loggedProductToWishList()
        }catch(err){
            console.error(err);
        }finally{
            toast.dismiss(toastLoading)
            
        }
    }

    useEffect(()=>{
        loggedProductToWishList()
    },[])


    return (
            <wishListContext.Provider value={{wish , loading   , addProductToWishList , deleteProductFromWish , loggedProductToWishList}}>
                {children}
            </wishListContext.Provider>
    );
}

export default WishListContextProvider;