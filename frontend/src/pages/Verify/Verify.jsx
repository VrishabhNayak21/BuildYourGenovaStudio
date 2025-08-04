import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url, clearCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const [message, setMessage] = useState('Verifying payment...');

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                setMessage('Payment successful! Clearing cart...');
                // Clear the cart using the context function
                await clearCart();
                setTimeout(() => {
                    navigate("/myorders");
                }, 2000);
            } else {
                setMessage('Payment failed. Redirecting to home...');
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error('Verification error:', error);
            setMessage('Error verifying payment. Redirecting to home...');
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } finally {
            setVerifying(false);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="verification-container">
                <div className="spinner"></div>
                <h2>{message}</h2>
                {!verifying && (
                    <p>Please wait while we redirect you...</p>
                )}
            </div>
        </div>
    )
}

export default Verify
