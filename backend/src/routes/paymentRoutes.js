const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Stripe payment session
router.post('/create-session', authMiddleware, paymentController.createPaymentSession);

// Handle Stripe webhook
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;