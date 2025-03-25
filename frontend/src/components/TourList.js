import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../tours.css"; // Import the CSS file

const TourList = ({ setSelectedTour }) => {
    const [tours, setTours] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [showAuthForm, setShowAuthForm] = useState(false); // Track visibility of auth form
    const [selectedTourId, setSelectedTourId] = useState(null); // Track selected tour for booking
    const [userEmail, setUserEmail] = useState(""); // Store logged-in user's email for salutation
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch tours from the backend
        axios
            .get(`${process.env.REACT_APP_API_URL}/tours`)
            .then((response) => setTours(response.data))
            .catch((error) => console.error("Error fetching tours:", error));

        // Check if the user is already logged in
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem("email"); // Retrieve email from local storage
            if (storedEmail) setUserEmail(storedEmail);
        }
    }, []);

    const handleSelectTour = (tour) => {
        if (!isLoggedIn) {
            setSelectedTourId(tour.id); // Store the selected tour ID
            setShowAuthForm(true); // Show the login/register form
        } else {
            setSelectedTour(tour);
            navigate("/payment");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token); // Store the token
            localStorage.setItem("email", email); // Store the email for salutation
            setIsLoggedIn(true);
            setUserEmail(email); // Set the email for display
            setError("");
            setShowAuthForm(false); // Hide the auth form after registration
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed. Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token); // Store the token
            localStorage.setItem("email", email); // Store the email for salutation
            setIsLoggedIn(true);
            setUserEmail(email); // Set the email for display
            setError("");
            setShowAuthForm(false); // Hide the auth form after login
        } catch (error) {
            setError(error.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div className="tour-list-container">
            {/* Salutation for logged-in users */}
            {isLoggedIn && <h2>Welcome, {userEmail}!</h2>}

            <h2>Select a Tour Package</h2>

            {/* Registration and Login Form */}
            {showAuthForm && (
                <div className="auth-form">
                    <h3>Register or Log In</h3>
                    <form>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleRegister}>
                            Register
                        </button>
                        <button type="button" onClick={handleLogin}>
                            Log In
                        </button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}

            {/* Tours List */}
            <ul className="tours-list">
                {tours.map((tour) => (
                    <li key={tour.id} className="tour-item">
                        <h3>{tour.name}</h3>
                        <p>{tour.description}</p>
                        <p>Price: KES. {tour.price}</p>
                        <button onClick={() => handleSelectTour(tour)}>
                            {isLoggedIn ? "Proceed" : "Book Now"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourList;