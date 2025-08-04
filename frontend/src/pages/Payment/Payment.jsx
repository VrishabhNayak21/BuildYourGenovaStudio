import React, { useContext, useEffect, useState } from 'react';
import './Payment.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const { getTotalCartAmount, token, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
    
    // Get order data from location state
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
    } else {
      navigate('/place-order');
    }
  }, [token, getTotalCartAmount(), navigate, location]);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Create Stripe checkout session
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // Redirect to Stripe checkout
        window.location.href = response.data.session_url;
      } else {
        alert("Error creating payment session");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment');
      setIsProcessing(false);
    }
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <div className="payment-logo">
            <div className="logo-icon">💳</div>
            <span>Secure Payment</span>
          </div>
          <div className="payment-amount">
            <span className="amount-label">Total Amount</span>
            <span className="amount-value">${getTotalCartAmount() + 2}</span>
          </div>
        </div>

        <div className="payment-form">
          <div className="form-section">
            <h3>Complete Your Order</h3>
            <p className="payment-description">
              Click the button below to proceed to our secure payment gateway powered by Stripe.
            </p>
            
            {isProcessing ? (
              <div className="processing-status">
                <div className="spinner"></div>
                <span>Redirecting to secure payment gateway...</span>
              </div>
            ) : (
              <div className="payment-actions">
                <button 
                  onClick={handlePayment} 
                  className="proceed-btn"
                  disabled={isProcessing}
                >
                  Proceed to Secure Payment
                </button>
                <div className="payment-note">
                  <div className="secure-badge">
                    <span className="lock-icon">🔒</span>
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="payment-footer">
          <div className="order-details">
            <div className="detail-item">
              <span>Subtotal</span>
              <span>${getTotalCartAmount()}</span>
            </div>
            <div className="detail-item">
              <span>Delivery</span>
              <span>$2</span>
            </div>
            <div className="detail-item total">
              <span>Total</span>
              <span>${getTotalCartAmount() + 2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 