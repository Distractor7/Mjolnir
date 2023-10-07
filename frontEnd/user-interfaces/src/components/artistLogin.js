// Imports and sets up the artist login page. This page is for artists to log in to their account.
import React, { useState } from "react";
import "../App.css";
import axios from "axios";

// ArtistLogin functional component.
function ArtistLogin() {
  const [errorMessage, setErrorMessage] = useState("");

  // Handles the submit of the form when the user clicks the login button.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Try catch block to send the login details to the database and check if they are valid.
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });
      console.log("Response:", response);
      if (
        response.data &&
        response.data.token &&
        response.data.user.role === "artist"
      ) {
        // If the login details are valid, the user is redirected to the artist dashboard.
        // The token is also stored in local storage.
        localStorage.setItem("authToken", response.data.token);
        window.location.replace("/artist-dashboard");
      } else {
        // If the login details are invalid, an error message is displayed.
        setErrorMessage(
          "You are not a manager. Please log in with an artist account."
        );
      }
      // If there is an error, an error message is displayed.
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid login details. Please try something else.");
    }
  };

  // Return statement of all the elements in the component.
  return (
    <div className="login-container">
      <h1>Artist Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Form that takes the login details of the user. */}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Exports the ArtistLogin component.
export default ArtistLogin;
