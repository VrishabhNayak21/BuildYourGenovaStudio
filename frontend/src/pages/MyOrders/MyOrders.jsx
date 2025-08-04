import React, { useState, useEffect, useContext } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="orders-list">
        {data.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <img src={assets.parcel_icon} alt="Parcel" />
              <div className="order-summary">
                <h4>Order #{index + 1}</h4>
                <p>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} × {item.quantity}
                      {idx !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
              <span className={`status ${order.status.toLowerCase()}`}>
                ● {order.status}
              </span>
            </div>

            <div className="order-info">
              <p><strong>Amount:</strong> ${order.amount}.00</p>
              <p><strong>Total Items:</strong> {order.items.length}</p>
              <button onClick={fetchOrders}>✅ Payment Done</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
