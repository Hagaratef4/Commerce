import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

function Layout({toggelTheme , theme}) {
    return (
        <div className='dark:bg-gray-500'>
            <Navbar  toggelTheme={toggelTheme} theme={theme}/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Layout;