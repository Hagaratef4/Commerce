import React from 'react';

function ErrorPage() {
    return (
        <div className='my-20 mb-35 flex flex-col justify-center items-center space-y-5 text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-40 text-red-800 dark:text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <h2 className='text-4xl text-gray-600 capitalize dark:text-white'>Sorry, no products found!</h2>
        </div>
    );
}

export default ErrorPage;