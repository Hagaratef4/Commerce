import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import Brands from './Pages/Brands/Brands';
import Categories from './Pages/Categories/Categories';
import Cart from './Pages/Cart/Cart';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProtectedRoutes from './Components/Protected/protectedRoutes';
import { Toaster } from 'react-hot-toast';
import Orders from './Pages/Orders/Orders';

import { Children, useState } from 'react';
import AuthContextProvider from './Context/AuthContext';
import LoginProtected from './Components/Protected/LoginProtected';
import ProductDetailes from './Pages/ProductDetailes/ProductDetailes';
import CartContextProvider from './Context/CartContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './Pages/WishList/WishList';
import WishListContextProvider from './Context/WishListContext';
import Category from './Components/ProductsCategory/Category';
import SpacificBrand from './Components/SpacificBrand/SpacificBrand';
import ForgetPass from './Pages/ForgetPass/ForgetPass';
import CheckPass from './Pages/CheckPass/CheckPass';
import ResetPass from './Components/ResetPass/ResetPass';


function App() {

  let [theme,setTheme] = useState(localStorage.getItem('themeScreen') || 'light')

  function toggelTheme(){
    if (theme == 'light') {
      setTheme('dark')
      localStorage.setItem('themeScreen' , 'dark')
    }else {
      setTheme('light')
      localStorage.setItem('themeScreen' , 'light')

    }
  }

  const routes = createBrowserRouter([
    { 
      path:'/' , element:<Layout  toggelTheme={toggelTheme} theme={theme}/>, children:[
        {path:'/', element: <ProtectedRoutes>
          <Home/>
        </ProtectedRoutes>},
        {path:'/products', element: 
        <ProtectedRoutes>
          <Products/> 
        </ProtectedRoutes>},
        {path:'/productsDetailes/:id', element: 
        <ProtectedRoutes>
          <ProductDetailes/> 
        </ProtectedRoutes>},
        {path:'/brands', element: <ProtectedRoutes>
          <Brands/>
        </ProtectedRoutes>},
        {path:'/categories', element: <ProtectedRoutes>
          <Categories/>
        </ProtectedRoutes>},
        {path:'/cart', element:<ProtectedRoutes>
          <Cart/>
        </ProtectedRoutes>},
        {path:'/allorders', element:<ProtectedRoutes>
          <Orders/>
        </ProtectedRoutes>},
        {path:'/wishList', element:<ProtectedRoutes>
          <WishList/>
        </ProtectedRoutes>},
        {path:'/category/:id', element:<ProtectedRoutes>
          <Category/>
        </ProtectedRoutes>},
        {path:'/brand/:id', element:<ProtectedRoutes>
          <SpacificBrand/>
        </ProtectedRoutes>},
        
        {path:'/login', element: 
        <LoginProtected>
          <Login/>
        </LoginProtected>
        },
        {path:'/register', element: 
        <LoginProtected>
          <Register/>
        </LoginProtected>},
        {path:'/forgetpass', element: 
        <LoginProtected>
          <ForgetPass/>
        </LoginProtected>},
        {path:'/checkpass', element: 
        <LoginProtected>
          <CheckPass/>
        </LoginProtected>},
        {path:'/resetpass', element: 
        <LoginProtected>
          <ResetPass/>
        </LoginProtected>},
      ]
    }
  ])

  let client = new QueryClient()

  return (
    <>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <div className= {theme}>
            <RouterProvider router={routes}/>
            <Toaster/>
          </div>
        </WishListContextProvider>
      </CartContextProvider>
      </AuthContextProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
    </>
  )
}

export default App
