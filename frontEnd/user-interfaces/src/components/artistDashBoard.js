// Imports & NPM packages
import React from "react";
import "../App.css";
import "../artistDashBoard.css";
import { useEffect, useState } from "react";
import axios from "axios";

// ArtistDashboard functional component.
function ArtistDashboard() {
  // Use state for events and which page is currently active.
  const [activeContent, setActiveContent] = useState("content1");
  const [events, setEvents] = useState([]);

  // Use effect to fetch events from the database.
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(
          "http://localhost:8080/event/readEvents"
        );
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();
  }, []);

  // Return statement of all the elements in the component.
  return (
    <div className="content-wrapper">
      <div className="events-container">
        <h1>Artist Dashboard</h1>
        <div className="events-div">
          {activeContent === "content1" && (
            <>
              <h1 className="ad-events-header artistHead">Upcoming Events</h1>
              <div className="content1">
                {/* Below the events are mapped over rendering them in a certain fashion showing all their respective details and images. */}
                {events.map((event) => (
                  <div key={event._id} className="event-item">
                    <h2>Event Name: {event.name}</h2>
                    <img
                      className="event-image"
                      src={`/${event.eventImage}`}
                      alt={event.name}
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
                        {/* The line up items are mapped over and the artist and schedules are displayed. */}
                        {event.lineUp &&
                          event.lineUp.map((artist, index) => (
                            <li key={index}>
                              {artist.artist} - {artist.schedule}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistDashboard;
