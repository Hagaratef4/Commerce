import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({item}) {

    return (
        <>
                        <Link to={`/category/${item._id}`}>
                        <div className="flex-col text-center size-45 justify-center cursor-pointer">
                            <div className="rounded-2xl overflow-hidden shadow-md m-2 flex justify-center items-center hover:scale-110 delay-100 transition-all ease-in-out">
                            <img src={item.image} alt={item.name} className='py-1 rounded-2xl size-38'/>
                            </div>
                            <h5 className='text-lg capitalize font-bold text-darkPrimary dark:text-slate-200'>{item.name}</h5>
                        </div>
                        </Link>
                    
        </>
    );
}

export default CategoryCard;