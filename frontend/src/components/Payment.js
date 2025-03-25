import React, { useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import "../tours.css"; // Import the CSS file

const Payment = ({ selectedTour }) => {
    const navigate = useNavigate();

    // Redirect to home if no tour is selected
    useEffect(() => {
        if (!selectedTour) {
            navigate("/");
        }
    }, [selectedTour, navigate]);

    // Handle payment process
    const handlePayment = async () => {
        try {
            // Check if the user is logged in
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }

            // Step 1: Create a booking in the backend
            const bookingResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/bookings`,
                {
                    tourId: selectedTour.id,
                    amount: selectedTour.price,
                    currency: "KES", // Currency set to Kenyan Shillings
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Booking created:", bookingResponse.data);

            // Step 2: Create a Stripe Checkout session
            const sessionResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/payments/create-session`,
                {
                    bookingId: bookingResponse.data.id,
                    amount: selectedTour.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Stripe Session Response:", sessionResponse.data);

            // Step 3: Redirect to Stripe Checkout
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
            const { sessionId } = sessionResponse.data;

            // Log the session ID for debugging
            console.log("Stripe Session ID:", sessionId);

            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });

            // Handle Stripe redirect errors
            if (error) {
                console.error("Stripe Redirect Error:", error);
                alert("Failed to redirect to Stripe Checkout. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);

            // Handle specific errors
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                navigate("/login");
            } else {
                alert("Payment failed. Please try again.");
            }
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment</h2>
            <div className="payment-details">
                <p><strong>Tour:</strong> {selectedTour?.name}</p>
                <p><strong>Amount:</strong> KES. {selectedTour?.price}</p>
            </div>
            <button className="payment-button" onClick={handlePayment}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default Payment;