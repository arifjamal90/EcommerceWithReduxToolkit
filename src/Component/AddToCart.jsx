import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_To_cart, removeItems } from '../Cards/CardSlice';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LuStar } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';

const AddToCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addToCart = useSelector((state) => state?.counter?.add_cart_items);
    const stars = [0, 1, 2, 3, 4];

    const handleDelete = (id) => {
        dispatch(removeItems(id));
    };

    const handleAddCart = (id) => {
        dispatch(add_To_cart({ id }));
    };

    return (
        <div className='fixed top-[25%] w-full'>
            <>
                {addToCart.length > 0 ? (
                    addToCart.map((item, index) => (
                        <div
                            key={index}
                            className="w-[80%] pl-10 gap-10 m-auto my-2 border-2 border-green-500 p-2 rounded-lg bg-gray-200 flex "
                        >
                            <img src={item.images} className="w-[25%]" alt={item.title} />
                            <div className="w-[50%]">
                                <p className="font-bold text-2xl">{item.title}</p>
                                <p className="font-medium text-xl py-2 text-gray-800">
                                    {item.category}
                                </p>
                                <div className="flex justify-between py-2">
                                    <p className="text-xl font-medium">
                                        &#8377;:{(item.price).toFixed(3)}
                                    </p>
                                    <p className="text-xl font-medium">
                                        Off: {item.discountPercentage}%
                                    </p>
                                    <p className="text-xl font-medium line-through">
                                        &#8377;:
                                        {(
                                            (item.price / 100) * item.discountPercentage +
                                            item.price
                                        ).toFixed(3)}
                                    </p>
                                </div>
                                <div className="flex justify-between ">
                                    <p className="text-xl font-medium">Brand: {item.brand}</p>
                                    <p className="flex justify-center gap-2 py-2">
                                        {stars.map((star) => {
                                            if (item.rating >= star + 1) {
                                                return (
                                                    <span key={star} className="text-green-800">
                                                        <FaStar />
                                                    </span>
                                                );
                                            } else if (item.rating >= star + 0.5) {
                                                return (
                                                    <span key={star} className="text-green-800">
                                                        <FaStarHalfAlt />
                                                    </span>
                                                );
                                            } else {
                                                return (
                                                    <span key={star} className="text-green-800">
                                                        <LuStar />
                                                    </span>
                                                );
                                            }
                                        })}
                                    </p>
                                    <p className="text-xl font-medium">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button
                                        className="bg-red-500 px-8 rounded-full py-1 my-5"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                    <div className="bg-gray-400 px-8 rounded-full py-1 my-5" onClick={() => navigate('/additems')}>
                                        Go To Back
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <button className="bg-gray-400 px-4 rounded-full py-1 my-2" onClick={() => handleAddCart(item.id)}>
                                        Add to Cart
                                    </button>
                                    <Link to="/buynow">
                                        <button className="bg-gray-400 px-4 rounded-full py-1 my-2">Buy Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center ">
                        <p>No items in the cart</p>
                    </div>
                )}
            </>
        </div>
    );
}

export default AddToCart;
