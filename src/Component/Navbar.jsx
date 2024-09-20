import React, { useEffect, useState } from 'react';
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchItem, searchApi, getApi } from '../Cards/CardSlice';
import { Link, useParams } from 'react-router-dom';

const Navbar = () => {
    
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.counter?.addItems);
    const filterItems = useSelector((state) => state.counter?.searchItems); 

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleInput = (e) => {
        e.preventDefault(); 
        const searchValue = e.target.value;
        setSearch(searchValue);
        searchValue ? dispatch(searchItem(searchValue)) : dispatch(getApi())
      
       
    };

    useEffect(() => {
        dispatch(searchApi(filterItems)); 
    }, [search, ]); 

    

    return (
        <div className='fixed top-0 w-full right-0 left-0'>
            <nav>
                <div className="flex px-10 items-center justify-between bg-gray-800 py-2">
                    <Link to="/">
                        <p className='text-[#F8CB46] font-extrabold text-4xl'>blink<span className='text-[#54B226] font-extrabold text-4xl'>it </span></p>
                    </Link>
                    <div>
                        <input 
                            type="text" 
                            placeholder='Search Here Items' 
                            className='border border-gray-400 px-3 py-1 w-96 rounded-full' 
                            onChange={handleInput}
                            value={search}
                        />
                    </div>   
                    <ul className='relative'>
                        <Link to="/additems">
                            <li className="text-red-600 absolute -top-6 -right-1 border border-white px-2 rounded-full text-md">{totalQuantity}</li>
                            <p className='text-2xl text-white absolute top-0 -right-1'><BsCart3/></p>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
