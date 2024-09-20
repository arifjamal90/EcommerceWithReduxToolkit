import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApi,
  removeItems,
  addItems,
  incrementItemQuantity,
  searchApi,
} from "../Cards/CardSlice";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

const Home = () => {
  const [toggleId, setToggleId] = useState(null);
  const dispatch = useDispatch();
  let users = useSelector((state) => state?.counter?.data);
  const loading = useSelector((state) => state?.counter?.loading);
  const error = useSelector((state) => state?.counter?.error);
  const cartItems = useSelector((state) => state?.counter?.addItems);
  const filteredItems = useSelector((state) => state.counter.searchItems); 
  const navigate = useNavigate();

  const stars = [0, 1, 2, 3, 4];

  const addHandleItem = (item) => {
    setToggleId(item.id);
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (itemInCart) {
      dispatch(incrementItemQuantity(item.id));
    } else {
      dispatch(addItems({ ...item, quantity: 1 }));
    }
    
    // Navigate to "/additems" route after adding the item
    navigate("/additems");
  };
  
  useEffect(() => {
    dispatch(getApi());
  }, []);

  console.log(filteredItems, "filter");
 
 
  //  users = filteredItems.length > 0 ? filteredItems : users;
console.log(loading);

  return (
    <>
      <div className="text-center w-full mt-14">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="flex flex-wrap">
          {users && users.length > 0 ? (
            users.map((item) => (
              <div key={item.id} className="w-full sm:w-1/2 lg:w-1/4 px-2 py-2">
                <div className="border border-green-500 pb-2 rounded-lg bg-gray-100">
                  <img
                    src={item.images}
                    className="w-[70%] m-auto"
                    alt={item.title}
                  />
                  <p className="font-bold text-lg" text-2xl>{item.title}</p>
                  <p className="font-semibold text-lg text-gray-800">{item.category}</p>
                  <div className="flex justify-evenly">
                    <p className="text-lg text-gray-800">&#8377;:{item.price}</p>
                    <p className="text-lg text-gray-800">Off: {item.discountPercentage}%</p>
                    <p className="text-lg text-gray-800 font-medium line-through">
                      &#8377;:
                      {(
                        (item.price / 100) * item.discountPercentage +
                        item.price
                      ).toFixed(3)}
                    </p>
                  </div>
                  <p className="flex justify-center gap-2 py-2">
                    {stars.map((star) => {
                      if (item.rating >= star + 1) {
                        return (
                          <span key={star} className="text-green-800 text-lg">
                            <FaStar />
                          </span>
                        );
                      } else if (item.rating >= star + 0.5) {
                        return (
                          <span key={star} className="text-green-800 text-lg">
                            <FaStarHalfAlt />
                          </span>
                        );
                      } else {
                        return (
                          <span key={star} className="text-green-800 text-lg">
                            <LuStar />
                          </span>
                        );
                      }
                    })}
                  </p>
                  <div className="flex justify-evenly items-center">
                    <button
                      className="bg-gray-500 rounded-full py-1 my-5 w-[60%] hover:bg-gray-600 text-md"
                      onClick={() => addHandleItem(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : !loading ? (
            <p className="text-center w-full">No items found</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
