import './App.css';
import AddItems from './Component/AddItems';
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Component/Navbar';
import BuyNow from './Component/BuyNow';
import AddToCart from './Component/AddToCart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getApi } from './Cards/CardSlice';

function App() {
  // const dispatch= useDispatch()
  // useEffect(()=>{
  //   dispatch(getApi())
  // })
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/additems' element={<AddItems />} />
        <Route path='/buynow' element={<BuyNow />} />
        <Route path='/addtocart' element={<AddToCart />} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
