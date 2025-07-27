import React from 'react';
import amazon from '/images/amazon-pay.png'
import american from '/images/American-Express-Color.png'
import paypal from '/images/paypal.png'
import masterCard from '/images/mastercard.webp'
import applePlay from '/images/get-apple-store.png'
import googlePlay from '/images/get-google-play.png'
function Footer() {
    return (
        <footer className='bg-mainLight p-15 dark:bg-gray-600'>
            <div className="container space-y-6">
                <div>
                    <h1 className='text-3xl font-light dark:text-white'>Get FreshCard app</h1>
                    <p className='mt-3 text-gray-400 '>We will send ypu a link, open it on your phone to download the app.</p>
                </div>

                <div className='flex flex-col md:flex-row gap-3 m-4'>
                    <input type="email" placeholder=' Email' className='bg-white border-2 grow p-2 focus:outline-none rounded-md border-gray-300 dark:border-gray-500' />
                    <button className='capitalize border-2 bg-primary text-white py-2 px-3 dark:bg-darkPrimary  rounded-md dark:border-gray-500'>share app link</button>
                </div>

                    {/* <hr className='mt-6 ' /> */}
                <div className='lg:flex lg:justify-between lg:mx-4 border-t-1 border-b-1 border-gray-300 p-4 mt-8'>
                    <div className='flex items-center gap-5 lg:gap-2 mb-6'>
                        <h3 className='capitalize text-sm  dark:text-white'>payment partners:</h3>
                        <img src={amazon} alt="amazon"  className='w-18'/>
                        <img src={american} alt="american" className='w-18' />
                        <img src={masterCard} alt="masterCard" className='w-18' />
                        <img src={paypal} alt="paypal" className='w-18' />
                    </div>

                    <div className='flex items-center gap-2'>
                        <h3 className='text-sm font-light dark:text-white'>Get deliveries with FreshCart:</h3>
                        <img src={applePlay} alt="apple Pay" className='w-20'/>
                        <img src={googlePlay} alt="google Pay" className='w-22'/>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;