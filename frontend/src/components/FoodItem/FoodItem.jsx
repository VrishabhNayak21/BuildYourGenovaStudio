import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />

        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_to_cart}
            alt='Add to cart'
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt='Remove one'
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt='Add one more'
            />
          </div>
        )}
      </div>

      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <div className='star-rating'>★★★★★</div>
        </div>

        <div className='food-item-bottom-row'>
          <p className='food-item-price'>${price}</p>

          {cartItems[id] > 0 && (
            <button
              className='go-to-cart-btn'
              onClick={() => navigate('/cart')}
            >
              Go to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
