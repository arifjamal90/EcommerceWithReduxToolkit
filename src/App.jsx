
import './App.css'
import AddItems from './Component/AddItems';
import Home from './Component/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
   <Route path='/' element={<Home />} />
   <Route path='additems' element={<AddItems />} />
  </Routes>
    </BrowserRouter>
  )
}

export default App
