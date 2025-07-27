import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let cardContext = createContext(null)


function CartContextProvider({children}) {

    let [cart,setCart] = useState(null)
    let [loading,setLoading] = useState(false)
    let [disableBtn,setDisableBtn] = useState(false)
    let [items , setItems] = useState(false)

    async function getCardLogged(){
        setLoading(true)
        try{
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers :{
                    token : localStorage.getItem('token'),
                }
            })
            setCart({
                ...data.data,
                numOfCartItems: data.numOfCartItems,
                cartId : data.cartId
            })
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false)
        }
    }

    async function addProductToCard(productId){
        setLoading(true)
        let toastLoading = toast.loading('Adding your product to cart...')
        try{
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId
            },{
                headers :{
                    token : localStorage.getItem('token'),
                }
            })
            toast.success('product added successfully to your cart')
            setCart({
                ...data.data,
                numOfCartItems: data.numOfCartItems,
                cartId : data.cartId
            })
            setItems(false)
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false)
            toast.dismiss(toastLoading)
        }
    }
    async function deleteProductFromCard(id){
        let toastLoading = toast.loading('Removing product from cart...')
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers :{
                    token : localStorage.getItem('token'),
                }
            })
            toast.success('product removed')
            setCart({
                ...data.data,
                numOfCartItems: data.numOfCartItems,
                cartId : data.cartId
            })

        }catch(err){
            console.error(err);
        }finally{
            toast.dismiss(toastLoading)
        }
    }
    async function clearCart(){
        let toastLoading = toast.loading('Loading...')
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers :{
                    token : localStorage.getItem('token'),
                }
            })

            toast.success('All Products Removed')
            setCart({
                ...data.data,
                numOfCartItems: data.numOfCartItems,
                cartId : data.cartId
            })
            setItems(true)

        }catch(err){
            console.error(err);
        }finally{
            toast.dismiss(toastLoading)
        }
    }
    async function updateCart(count,id){
        setDisableBtn(true)
        try{
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                count
            },{
                headers :{
                    token : localStorage.getItem('token'),
                }
            })

            toast.success('product updated')
            setCart({
                ...data.data,
                numOfCartItems: data.numOfCartItems,
                cartId : data.cartId
            })

        }catch(err){
            console.error(err);
        }finally{
            setDisableBtn(false)
        }
    }

    useEffect(()=>{
        getCardLogged()
    },[])


    return (
        <>
        <cardContext.Provider value={{loading , items , setItems, disableBtn , cart , updateCart , getCardLogged , clearCart, addProductToCard ,deleteProductFromCard}}>
            {children}
        </cardContext.Provider>  
        </>
    );
}

export default CartContextProvider;