import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../tours.css";

const TourList = ({ setSelectedTour }) => {
    const [tours, setTours] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/tours`)
            .then((response) => {
                const toursData = Array.isArray(response.data) ? response.data : response.data.data;
                setTours(toursData);
            })
            .catch((error) => console.error("Error fetching tours:", error));

        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem("email");
            if (storedEmail) setUserEmail(storedEmail);
        }
    }, []);

    const handleSelectTour = (tour) => {
        if (!isLoggedIn) {
            setSelectedTourId(tour.id);
            setShowAuthForm(true);
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
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", email);
            setIsLoggedIn(true);
            setUserEmail(email);
            setError("");
            setShowAuthForm(false);
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", email);
            setIsLoggedIn(true);
            setUserEmail(email);
            setError("");
            setShowAuthForm(false);
        } catch (error) {
            setError(error.response?.data?.error || "Login failed.");
        }
    };

    return (
        <div className="tour-list-container">
            {isLoggedIn && <h2>Welcome, {userEmail}!</h2>}
            <h2>Select a Tour Package</h2>

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

            <ul className="tours-list">
                {Array.isArray(tours) && tours.length > 0 ? (
                    tours.map((tour) => (
                        <li key={tour.id} className="tour-item">
                            <h3>{tour.name}</h3>
                            <p>{tour.description}</p>
                            <p>Price: KES. {tour.price}</p>
                            <button onClick={() => handleSelectTour(tour)}>
                                {isLoggedIn ? "Proceed" : "Book Now"}
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No tours available.</p>
                )}
            </ul>
        </div>
    );
};

export default TourList;