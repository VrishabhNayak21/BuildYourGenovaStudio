import React, { useContext, useState, useRef, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    
    const [menu,setMenu] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);


    const navigate = useNavigate();

    const logout = () =>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
      setMobileOpen(false);


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
       <Link to='/' onClick={()=>{setMobileOpen(false)}}><img src={assets.logo} alt="" className="logo" /></Link>
       <button className={`navbar-burger ${mobileOpen? 'open':''}`} aria-label="Menu" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(o=>!o)}>
         <span></span>
         <span></span>
         <span></span>
       </button>
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
            {!token?<button onClick={()=>{setShowLogin(true); setMobileOpen(false);}}>sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>{navigate('/myorders'); setMobileOpen(false);}}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                {/* <hr /> */}
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>

            </div>}
            

        </div>
        {/* Mobile slide-out menu */}
        <div className={`navbar-mobile-menu ${mobileOpen? 'show' : ''}`}>
          <div className='mobile-links'>
            <Link to='/' onClick={()=>{setMenu('Home'); setMobileOpen(false);}}>Home</Link>
            <a href='#explore-menu' onClick={(e)=>{e.preventDefault(); setMenu('Products'); setMobileOpen(false); window.location.href = '/#explore-menu';}}>Products</a>
            <a href='#app-download' onClick={(e)=>{e.preventDefault(); setMenu('Mobile-app'); setMobileOpen(false); window.location.href = '/#app-download';}}>Brands</a>
            <a href='#footer' onClick={(e)=>{e.preventDefault(); setMenu('Contact us'); setMobileOpen(false); window.location.href = '/#footer';}}>Contact us</a>
          </div>
          <div className='mobile-actions'>
            <Link to='/cart' onClick={()=>setMobileOpen(false)} className='mobile-cart'>Cart {getTotalCartAmount()===0? '' : '•'}</Link>
            {!token ? (
              <button onClick={()=>{setShowLogin(true);}}>sign in</button>
            ) : (
              <>
                <button onClick={()=>{navigate('/myorders'); setMobileOpen(false);}}>Orders</button>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </div>
      
    </div>
  )
}

export default Navbar
