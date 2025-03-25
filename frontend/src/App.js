import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourList from "./components/TourList";
import Payment from "./components/Payment";
import Confirmation from "./components/Confirmation";
import "./style.css";
import SuccessPage from "./pages/SuccessPage";


function App() {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
      <Router>
        <div className="App">
          <h1>Triply Simple Booking Engine</h1>
          <Routes>
            <Route
                path="/"
                element={<TourList setSelectedTour={setSelectedTour} />}
            />
            <Route
                path="/payment"
                element={<Payment selectedTour={selectedTour} />}
            />
            <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/success" element={<SuccessPage />} />

          </Routes>
        </div>
      </Router>
  );
}

export default App;