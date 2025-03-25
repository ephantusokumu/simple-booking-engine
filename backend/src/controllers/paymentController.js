require('dotenv').config();

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Booking, Payment } = require('../models');

// Create a Stripe Checkout session


exports.createPaymentSession = async (req, res) => {
    try {
        //env didnt work here...will check
        const stripe = require('stripe')('sk_test_51R5qvgR1ijzrS380GwTRlMk5oSgSdsiI1ycvWEYNJ6KYeQRzu79FyYueIgSBecfXgaH6HEay6i2FPkq3ejCN47sM003UMU37oL');

        const { bookingId, amount } = req.body;
        console.log("Stripe Secret Key:---", process.env.STRIPE_SECRET_KEY);


        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'kes',
                    product_data: {
                        name: `Booking #${bookingId}`,
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: { bookingId }
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log("Webhook Event Received:", event.type);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log("Session Metadata:", session.metadata);

                await Booking.update(
                    { status: 'confirmed' },
                    { where: { id: session.metadata.bookingId } }
                );
                console.log("Booking status updated to 'confirmed' for booking ID:", session.metadata.bookingId);

                await Payment.create({
                    bookingId: session.metadata.bookingId,
                    amount: session.amount_total / 100,
                    currency: session.currency,
                    status: 'completed',
                    stripePaymentId: session.payment_intent
                });
                console.log("Payment record created for booking ID:", session.metadata.bookingId);
                break;

            case 'checkout.session.expired':
                // Update the booking status to 'failed' if the session expires
                await Booking.update(
                    { status: 'failed' },
                    { where: { id: event.data.object.metadata.bookingId } }
                );
                console.log("Booking status updated to 'failed' for booking ID:", event.data.object.metadata.bookingId);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        // Respond to Stripe to acknowledge receipt of the event
        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error handling webhook event:", error);
        res.status(500).json({ error: error.message });
    }
};

