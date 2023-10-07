// Imports and sets up the manager dashboard. This page is for managers to view, add,edit and delete events.
import React, { useState } from "react";
import "../App.css";
import { useEffect } from "react";
import axios from "axios";

import CreateEvent from "../components/createEvent";
import Edit from "../components/editModal";
import "bootstrap/dist/css/bootstrap.min.css";

// Manager dashboard functional component and props.
function ManagerDashboard(props) {
  // All the states used in the manager dashboard.
  const [activeContent, setActiveContent] = useState("content1");
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [show, setShow] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [token, setToken] = useState("");

  // handles capturing the selected event id.
  function handleEdit(eventId) {
    // Variable to store the id of the selected event
    const selectedEvent = events.find((event) => event._id === eventId);
    if (selectedEvent) {
      // Set the edit event state to the selected event
      setEditEvent(selectedEvent);
      setShow(true);
    }
  }

  // Handles the deleting of an event by id.
  // Takes in the event id and the update events function.
  async function handleDelete(eventId, updateEvents) {
    // Variable to store the event id to delete.
    const eventToDelete = events.find((event) => event._id === eventId);
    // If the event to delete is not found, alert the user.
    if (!eventToDelete) {
      alert("Event not found");
      return;
    }

    // Try to delete the event.
    try {
      // Get the auth token from local storage.
      const authToken = localStorage.getItem("authToken");
      // Make a DELETE request to the provided endpoint
      // and set the authorization header to the auth token.
      await axios.delete(
        `http://localhost:8080/event/deleteEventById/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // sets the events state to the selected event id.
      setEvents(events.filter((event) => event._id !== eventId));

      console.log("eventToDelete:", eventToDelete);

      // Call the update events function.
      updateEvents();
      // Alert the user that there has been an error deleting the event.
    } catch (err) {
      console.error(err);
      alert("Error deleting event");
    }
  }

  // Use effect to fetch events from the database.
  useEffect(() => {
    // async Function to fetch events from the database.
    async function fetchEvents() {
      try {
        // Makes a GET request to the provided endpoint.
        const response = await axios.get(
          "http://localhost:8080/event/readEvents"
        );
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    // async Function to fetch artists from the database.
    async function fetchArtists() {
      try {
        const response = await axios.get(
          "http://localhost:8080/artist/readAllProfiles"
        );
        setArtists(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    // Calls the fetch events and fetch artists functions.
    fetchEvents();
    fetchArtists();
  }, []);

  // async Function to update events.
  async function updateEvents() {
    try {
      // Makes a GET request to the provided endpoint.
      const response = await axios.get(
        "http://localhost:8080/event/readEvents"
      );
      setEvents(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <div className="content-wrapper">
        <div className="events-container">
          <div className="dashboard-row">
            <div className="create-section">
              {activeContent === "content1" && (
                <div className="profile-section">
                  <CreateEvent onUpdateEvents={updateEvents}></CreateEvent>
                </div>
              )}
            </div>
            <div className="dashboard-container">
              {/* Below the event object being rendered to the events display is creted. The way the event item is rendered is defined below. */}
              <div className="events-div">
                {activeContent === "content1" && (
                  <>
                    <h1 className="md-events-header">Events</h1>
                    <div className="content1">
                      <div className="content1">
                        {/* Maps over ecents and displays all information of each existing event object in the database. */}
                        {events.map((event) => (
                          <div key={event._id} className="event-item">
                            <h2>Name: {event.name}</h2>
                            <img
                              className="event-image"
                              src={`/${event.eventImage}`}
                              alt={event.name}
                              height={100}
                              width={100}
                            />
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Time:</strong> {event.time}
                            </p>
                            <div className="line-up">
                              <strong>Line Up:</strong>

                              <ul>
                                {/* The line up are displayed by mapping over the artist in the line up. */}
                                {event.lineUp &&
                                  event.lineUp.map((artist, index) => (
                                    <li key={index}>
                                      {artist.artist} - {artist.schedule}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            {/* Edit and delete buttons are added to each event item below. */}
                            <div
                              className="event-buttons"
                              style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                              }}
                            >
                              {/* The edit modal is added here with functions passed to allow it to pop up and edit a selected event. */}
                              <Edit
                                className="edit-modal"
                                show={show}
                                setShow={setShow}
                                event={editEvent}
                                onUpdateEvents={updateEvents}
                              />
                              {/* The edit button is styled and has the handle edit function as an onclick that passes the event id so that the event can be found and edited */}
                              <button
                                style={{ marginRight: "10px" }}
                                onClick={() => handleEdit(event._id)}
                              >
                                Edit
                              </button>
                              {/* The delete button is styled and has the handle delete function as an onclick that passes the event id (and updateEvents function) so that the event can be found and edited and the event items immediately refresh. */}
                              <button
                                onClick={() =>
                                  handleDelete(event._id, updateEvents)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exports the manager dashboard component.
export default ManagerDashboard;
