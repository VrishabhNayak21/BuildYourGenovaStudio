import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)


    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOTP] = useState("");
    const [pendingEmail, setPendingEmail] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } else {
            newUrl += "/api/user/register";
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setShowOTP(true);
                setPendingEmail(data.email);
                toast.success("Registration successful. Please enter the OTP sent to your email.");
            } else {
                toast.error(response.data.message);
            }
        }
    };

    const onVerifyOTP = async (event) => {
        event.preventDefault();
        setOtpLoading(true);
        setOtpMessage("");
        try {
            const response = await axios.post(url + "/api/user/verify-otp", { email: pendingEmail, otp });
            if (response.data.success) {
                setOtpMessage("✅ OTP verified! You can now log in.");
                setTimeout(() => {
                    setShowOTP(false);
                    setCurrState("Login");
                    setData({ name: "", email: pendingEmail, password: "" });
                    setOtpMessage("");
                }, 1500);
            } else {
                setOtpMessage("❌ " + response.data.message);
            }
        } catch (error) {
            setOtpMessage("❌ Error verifying OTP. Please try again.");
        } finally {
            setOtpLoading(false);
        }
    };


    return (
        <div className='login-popup'>
            {showOTP ? (
                <form onSubmit={onVerifyOTP} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>Verify OTP</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <div className="login-popup-input">
                        <input
                            name='otp'
                            onChange={e => setOTP(e.target.value)}
                            value={otp}
                            type="text"
                            placeholder='Enter OTP'
                            required
                            disabled={otpLoading}
                        />
                    </div>
                    <button type="submit" disabled={otpLoading}>{otpLoading ? "Verifying..." : "Verify OTP"}</button>
                    {otpLoading && <div className="otp-spinner" style={{ marginTop: 8 }}><div className="spinner"></div></div>}
                    {otpMessage && <div className="otp-message" style={{ marginTop: 8 }}>{otpMessage}</div>}
                </form>
            ) : (
                <form onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <div className="login-popup-input">
                        {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                        <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                    </div>
                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currState === "Login" ? (
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    )}
                </form>
            )}
        </div>
    )
}

export default LoginPopup;
