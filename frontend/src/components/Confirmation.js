import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../tours.css"; // Import the CSS file

const Confirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get("session_id");

    useEffect(() => {
        if (sessionId) {
            console.log("Payment successful! Session ID:", sessionId);
            // You can fetch additional details from your backend using the sessionId
        }
    }, [sessionId]);

    return (
        <div className="confirmation-container">
            <h2>Payment Successful!</h2>
            <p>Thank you for booking with Triply. Your tour has been confirmed.</p>
            {sessionId && <p><strong>Session ID:</strong> {sessionId}</p>}
            <button className="confirmation-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default Confirmation;