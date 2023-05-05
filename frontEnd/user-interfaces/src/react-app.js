// imports: react, react-router-dom, axios, components, css.
import "./App.css";
import React, { useState } from "react";
import ArtistLoginForm from "./components/artistLogin";
import ManagerLoginForm from "./components/managerLogin";
import ManagerDashboard from "./components/managerDashBoard";
import ArtistDashboard from "./components/artistDashBoard"; // ...
import logo from "./images/logo3.png";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//  Main app functional component.
function App() {
  // activeLoginForm state and setActiveLoginForm function.
  const [activeLoginForm, setActiveLoginForm] = useState("artist");

  return (
    <Router>
      {/* Container div for the application */}
      <div className="App">
        {/* Display the company logo */}
        <img src={logo} alt="Company Logo" className="company-logo" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Toggle buttons for artist and manager login forms */}
                <div className="toggleLogins">
                  {/* Button to display artist login form */}
                  <button
                    className={
                      activeLoginForm === "artist" ? "activeButton" : ""
                    }
                    onClick={() => setActiveLoginForm("artist")}
                  >
                    Artist Login
                  </button>
                  {/* Button to display manager login form */}
                  <button
                    className={
                      activeLoginForm === "manager" ? "activeButton" : ""
                    }
                    onClick={() => setActiveLoginForm("manager")}
                  >
                    Manager Login
                  </button>
                </div>

                {/* Conditional rendering of artist login form */}
                {activeLoginForm === "artist" && <ArtistLoginForm />}
                {/* Conditional rendering of manager login form */}
                {activeLoginForm === "manager" && <ManagerLoginForm />}
              </>
            }
          />
          {/* Route for manager dashboard */}
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          {/* Route for artist dashboard */}
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
