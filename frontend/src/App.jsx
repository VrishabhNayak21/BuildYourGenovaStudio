import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Payment from './pages/Payment/Payment';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  // Check if user is new and show login popup
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      setTimeout(() => {
        setShowLogin(true);
      }, 1000);
    }
  }, []);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></> }
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home setShowLogin={setShowLogin} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
      </div>
      <Footer />
    </>
     
  );
};

export default App;
