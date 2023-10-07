// Imports and sets up the edit modal. This modal is used to edit events.
// Imports & NPM packages.
// Import bootstrap components.
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";

// Edit functional component and props.
function Edit({ show, setShow, event, onUpdateEvents, props }) {
  // Sets up the state of the form data that is used to edit the event.
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

  // Handle close and show of the modal functions for the edit modal.
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handles the submit of the form when the user clicks the edit event button.
  const formRef = useRef();

  // Handles the submit of the form when the user clicks the edit event button.
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data: ", formData);
    try {
      // Gets the auth token from local storage.
      const authToken = localStorage.getItem("authToken");
      // Sends the event details to the database.
      const response = await axios.put(
        // The endpoint updates the event by id.
        `http://localhost:8080/event/updateEventById/${encodeURIComponent(
          event._id
        )}`,
        // Filters out any empty lineup items.
        {
          ...formData,
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
      // Closes the modal and updates the events.
      setShow(false);
      onUpdateEvents();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Below is the jsx and the react bootstrap edit model I used to create the edit component. */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* The form below in the modal takes all the new info submitted and updates the existing event item in the database. */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="event-name">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={event && event.name}
                autoFocus
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="event-image">
              <Form.Label>Event Image</Form.Label>
              <Form.Control
                type="text"
                name="eventImage"
                defaultValue={event && event.eventImage}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="event-time">
              <Form.Label>Event Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                defaultValue={event && event.time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="event-date">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                defaultValue={event && event.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>Lineup</Form.Label>
            {/* The input fields for the artist line ups are created below. They take artist names playing and their playing times. */}
            {formData.lineup.map((item, index) => (
              <div key={index} className="mb-3">
                <Form.Group controlId={`artist-${index}`}>
                  <Form.Label>Artist {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    name="artist"
                    defaultValue={item.artist}
                    onChange={(e) => handleLineupChange(e, index)}
                  />
                </Form.Group>
                <Form.Group controlId={`schedule-${index}`}>
                  <Form.Label>Schedule {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    name="schedule"
                    defaultValue={item.schedule}
                    onChange={(e) => handleLineupChange(e, index)}
                  />
                </Form.Group>
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* The handle submit button sends the new information to be processed into the an updated event in the back end. */}
          <Button onClick={handleSubmit} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
