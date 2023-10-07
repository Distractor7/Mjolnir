// Imports and sets up the manager dashboard. This page is for managers login.
import React, { useState } from "react";
// Imports the css.
import "../App.css";
import axios from "axios";

// Manager login functional component.
function ManagerLogin() {
  // State for error message.
  const [errorMessage, setErrorMessage] = useState("");

  // Handles the submit of the login form.
  const handleSubmit = async (event) => {
    // Prevents the default behaviour of the form.
    event.preventDefault();
    // Variables to store the username and password.
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Try to login.
    try {
      // Make a POST request to the provided endpoint
      const response = await axios.post("http://localhost:8080/user/login", {
        // and sends the username and password in the request body.
        username,
        password,
      });
      console.log("Response:", response);
      // If the response contains a token and the user is a manager,
      if (
        response.data &&
        response.data.token &&
        response.data.user.role === "manager"
      ) {
        // set the auth token in local storage and redirect to the manager dashboard.
        localStorage.setItem("authToken", response.data.token);
        // line below is redirecting to the manager dashboard page if the user is authenticated.
        window.location.replace("/manager-dashboard");
        // If the user is not a manager,
      } else {
        // set the error message.
        setErrorMessage(
          "You are not a manager. Please log in with an artist account."
        );
      }
      // If there is an error,
    } catch (error) {
      console.error("Error:", error);
      // If the error is a 400,
      if (error.response && error.response.status === 400) {
        // set the error message.
        setErrorMessage("Invalid login details. Please try something else");
      } else {
        // Otherwise, set the error message to this.
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Returns the login form.
  return (
    <div className="login-container">
      <h1>Manager Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Form below takes the handleSubmit function. */}
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

export default ManagerLogin;
