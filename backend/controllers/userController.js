import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { generateOTP, sendOTPEmail, sendWelcomeEmail } from '../utils/otp.js';

// Create JWT token
const createToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
    return jwt.sign({ id }, jwtSecret);
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        if (!user.isVerified) {
            return res.json({ success: false, message: "Account not verified. Please verify your email with the OTP sent." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Login error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP and expiry
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified: false
        });

        await newUser.save();
        await sendOTPEmail(email, otp);
        res.json({ success: true, message: "Registration successful. OTP sent to your email." });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Registration error" });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.isVerified) {
            return res.json({ success: false, message: "User already verified" });
        }
        if (user.otp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (user.otpExpiry < new Date()) {
            return res.json({ success: false, message: "OTP expired" });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        await sendWelcomeEmail(email);
        res.json({ success: true, message: "OTP verified. Account activated." });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "OTP verification error" });
    }
};

export { loginUser, registerUser };
