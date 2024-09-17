import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApi,
  removeItems,
  addItems,
  incrementItemQuantity,
} from "../Cards/CardSlice";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

const Home = () => {
  const [toggleId, setToggleId] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.counter?.data);
  const loading = useSelector((state) => state?.counter?.loading);
  const error = useSelector((state) => state?.counter?.error);
  const cartItems = useSelector((state) => state?.counter?.addItems);
  const navigate = useNavigate();

  const stars = [0, 1, 2, 3, 4];

  const addHandleItem = (item) => {
    setToggleId(item.id);
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      dispatch(incrementItemQuantity(item.id));
    } else {
      dispatch(addItems({ ...item, quantity: 1 }));
      console.log("end");
    }
    console.log(cartItems, "crt");
    navigate("/additems");
  };

  console.log(cartItems, "cartitem");

  return (
    <div className="text-center w-full">
      <div className="text-center">
        <button
          onClick={() => dispatch(getApi())}
          className="bg-cyan-500 px-8 rounded-full py-1 my-5"
        >
          Get API
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex flex-wrap -mx-4">
        {users && users.length > 0
          ? users.map((item) => (
              <div key={item.id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                <div className="border border-green-500 p-2 rounded-lg bg-gray-100">
                  <img
                    src={item.images}
                    className="w-[70%] m-auto"
                    alt={item.title}
                  />
                  <p>{item.title}</p>
                  <p>{item.category}</p>
                  <div className="flex justify-evenly">
                    <p>&#8377;:{item.price}</p>
                    <p>Off: {item.discountPercentage}%</p>
                  </div>
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
                  <p>{item.brand}</p>
                  <div className="flex justify-evenly items-center">
                    <button
                      className="bg-gray-500 px-8 rounded-full py-1 my-5"
                      onClick={() => addHandleItem(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <p className="text-center w-full">No products available</p>
            )}
      </div>
    </div>
  );
};

export default Home;
