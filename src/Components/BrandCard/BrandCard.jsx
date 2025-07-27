import React from 'react';
import { Link } from 'react-router-dom';

function BrandCard({item}) {
    return (
        <>
            <Link to={`/brand/${item._id}`}>
                        <div className="animate__animated animate__fadeInUp  flex-col text-center justify-center cursor-pointer">
                            <div className="rounded-full overflow-hidden shadow-md m-2 flex justify-center hover:-translate-y-8 transition-transform duration-300 items-center hover: hover:scale-y-[1.2] hover:scale-x-[1.2] ease-in-out">
                            <img src={item.image} alt={item.name} className='py-1 rounded-full size-33 '/>
                            </div>
                            
                        </div>
                        </Link>
        </>
    );
}

export default BrandCard;