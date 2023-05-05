// Imports and sets up the create event page. This page is for managers to create events.
import React, { useState } from "react";
// Imports the axios package.
import axios from "axios";

// CreateEvent functional component.
function CreateEvent(props) {
  // Sets up the state variables for the form data.
  const [formData, setFormData] = useState({
    name: "",
    eventImage: "",
    time: "",
    date: "",
    lineup: [
      { artist: "", schedule: "" },
      { artist: "", schedule: "" },
      { artist: "", schedule: "" },
      { artist: "", schedule: "" },
    ],
  });

  // Handles the change of the form data.
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handles the change of the lineup form data.
  function handleLineupChange(event, index) {
    const { name, value } = event.target;
    const updatedLineup = formData.lineup.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
    setFormData({ ...formData, lineup: updatedLineup });
  }

  // Handles the submit of the form when the user clicks the create event button.
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form data: ", formData);
    // Try catch block to send the event details to the database and create the event.
    try {
      // Gets the auth token from local storage.
      const authToken = localStorage.getItem("authToken");
      // Sends the event details to the database.
      const response = await axios.post(
        "http://localhost:8080/event/createEvent",
        {
          ...formData,
          // Filters out any empty lineup items.
          lineUp: formData.lineup.filter(
            (item) => item.artist !== "" && item.schedule !== ""
          ),
        },
        // Sets the authorization header to the auth token.
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      // Updates the events in the dashboard.
      props.onUpdateEvents();
      // Redirects the user to the dashboard.
    } catch (err) {
      console.error(err);
    }
  }

  // Return statement of all the elements in the component.
  return (
    <div className="create-div">
      {/* Create event component */}
      <h1>Create Event</h1>
      {/* Form that takes new event informationand takes handle submit function as onSubmit. */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleChange}
        />

        <label htmlFor="eventImage">Event Image:</label>
        <input
          type="text"
          id="eventImage"
          name="eventImage"
          onChange={handleChange}
        />

        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          required
          onChange={handleChange}
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          onChange={handleChange}
        />

        <label htmlFor="lineUp">Lineup:</label>
        {/* The Line up and artist schedule input fields are generated below. */}
        <div id="lineUp">
          {formData.lineup.map((item, index) => (
            <div className="lineUp-item" key={index}>
              <label htmlFor={`artist${index + 1}`}>Artist {index + 1}:</label>
              <input
                type="text"
                id={`artist${index + 1}`}
                name="artist"
                required={index === 0}
                value={item.artist}
                onChange={(e) => handleLineupChange(e, index)}
              />

              <label htmlFor={`schedule${index + 1}`}>Schedule:</label>
              <input
                type="text"
                id={`schedule${index + 1}`}
                name="schedule"
                required={index === 0}
                value={item.schedule}
                onChange={(e) => handleLineupChange(e, index)}
              />
            </div>
          ))}
        </div>

        {/* The handleSubmit function is passed as onClick function for the create event button, passing the new info into the database to create a new event. */}
        <button onClick={handleSubmit} type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
