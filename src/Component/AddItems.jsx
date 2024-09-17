import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItems, incrementItemQuantity } from "../Cards/CardSlice";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

const AddItems = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.counter?.addItems);

  const stars = [0, 1, 2, 3, 4];

  const handleDelete = (id) => {
    dispatch(removeItems(id));
  };

  const handleAddItem = (id) => {
    dispatch(incrementItemQuantity(id)); // Just pass the item id
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItems(id)); // Just pass the item id
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="">
      <div className="flex justify-end px-5 fixed top-2 right-3">
        <MdOutlineCancel className="text-2xl" onClick={() => setToggle(true)} />
      </div>
      {toggle ? (
        <div>{/* Add content here if needed */}</div>
      ) : (
        <>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="w-[80%] pl-10 gap-10 m-auto my-2 border-2 border-green-500 p-2 rounded-lg bg-gray-100 flex"
              >
                <img src={item.images} className="w-[25%]" alt={item.title} />
                <div className="w-[50%]">
                  <p className="font-bold text-2xl">{item.title}</p>
                  <p className="font-medium text-xl py-2 text-gray-600">
                    {item.category}
                  </p>
                  <div className="flex justify-between py-2">
                    <p className="text-xl font-medium">
                      &#8377;:{item.price * item.quantity}
                    </p>
                    <p className="text-xl font-medium">
                      Off: {item.discountPercentage}%
                    </p>
                    <p className="text-xl font-medium line-through">
                      &#8377;:
                      {(
                        (item.price / 100) * item.discountPercentage +
                        item.price * item.quantity
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
                    <div className="flex gap-2">
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-full text-3xl font-bold text-white bg-black pb-2"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        -
                      </button>
                      <p className="text-black">{item.quantity}</p>
                      <button
                        className="w-10 h-10 pb-2 flex items-center justify-center rounded-full text-3xl font-bold text-white bg-black"
                        onClick={() => handleAddItem(item.id)}
                      >
                        +
                      </button>
                    </div>
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
      )}

      <div className="flex  fixed bottom-0 w-full bg-black items-center justify-center gap-5 py-2">
        <Link to="/" className=" justify-center ">
          <button className="px-8 bg-gray-400  py-1 rounded-lg">
            Continue
          </button>
        </Link>
        <p className="text-white">TotalItems: {totalQuantity}</p>
        <p className="text-white">&#8377;:{(totalPrice).toFixed(3)}</p>
      </div>
    </div>
  );
};

export default AddItems;
