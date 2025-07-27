import React from 'react';

function Loader() {
    return (
        <div className='w-full min-h-80 flex items-center-safe'> 
            <span className="loader dark:bg-white"></span>
        </div>
    );
}

export default Loader;