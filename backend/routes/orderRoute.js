// orderRoute.js

import express from 'express';
import {
  placeOrder,
  verifyOrder,
  userOrders,
  updateStatus,
  // listOrders, ←❌ remove this if not defined
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder);
router.get('/verify', verifyOrder);
router.get('/user-orders', userOrders);
router.put('/update-status', updateStatus);

export default router;
