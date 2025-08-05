// orderController.js

import Stripe from 'stripe';
import dotenv from 'dotenv';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;

export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/myorders?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/myorders?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.json({ success: false, message: error.message });
  }
};

// You can define these later if needed
export const verifyOrder = (req, res) => {};
export const userOrders = (req, res) => {};
export const updateStatus = (req, res) => {};
// DO NOT export listOrders if you don’t have it
