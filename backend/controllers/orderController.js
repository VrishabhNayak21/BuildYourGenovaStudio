// Required modules
const Stripe = require('stripe');
const dotenv = require('dotenv');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

// Load environment variables
dotenv.config();

// Stripe setup
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Frontend URL (from env)
const frontend_url = process.env.FRONTEND_URL;

// Place order controller
const placeOrder = async (req, res) => {
    try {
        // 1. Save order in DB
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        // 2. Clear cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // 3. Prepare Stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100), // Ensure it's an integer
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        // 4. Create Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/myorders?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/myorders?success=false&orderId=${newOrder._id}`,
        });

        // 5. Send response
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.json({ success: false, message: error.message });
    }
};

module.exports = { placeOrder };
