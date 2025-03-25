// pages/SuccessPage.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get("session_id");

    useEffect(() => {
        if (sessionId) {
            console.log("Payment successful! Session ID:", sessionId);
            // You can also fetch additional details from your backend using the sessionId
        }
    }, [sessionId]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
            <p>Session ID: {sessionId}</p>
        </div>
    );
};

export default SuccessPage;