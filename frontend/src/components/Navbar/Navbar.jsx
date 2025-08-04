import React, { useContext, useState, useRef, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    
    const [menu,setMenu] = useState("Home");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);


    const navigate = useNavigate();

    const logout = () =>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")


    }

  const [currentGif, setCurrentGif] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGif((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='navbar'>
       <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
       <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={(e)=>{e.preventDefault(); setMenu("Products"); window.location.href = '/#explore-menu';}} className={menu==="Products"?"active":""}>Products</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Brands</a>
        <a href='#footer' onClick={()=>setMenu("Contact us")} className={menu==="Contact us"?"active":""}>Contact us</a>
        </ul> 
        <div className='navbar-right'>

<div className="navbar-gif-carousel">
  <div className="navbar-gif-track">
    <img src={assets.gif1} alt="gif1" />
    <img src={assets.gif2} alt="gif2" />
    <img src={assets.gif3} alt="gif3" />
    {/* Duplicate for seamless loop */}
    <img src={assets.gif1} alt="gif1-dup" />
    <img src={assets.gif2} alt="gif2-dup" />
    <img src={assets.gif3} alt="gif3-dup" />
  </div>
</div>




            <div className='navbar-search-icon'>
                <Link to='/cart'><img src={assets.cart_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}> </div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                {/* <hr /> */}
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>

            </div>}
            

        </div>
      
    </div>
  )
}

export default Navbar
