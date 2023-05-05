// Imported express, router, Event model, authenticateUser and authorizeRole middleware.
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const mongoose = require("mongoose");
const authenticateUser = require("../middleware/authenticateUser");
const authorizeRole = require("../middleware/authorizeRole");

// Create event endpoint with authenticateUser and authorizeRole middleware.
router.post(
  "/createEvent",
  authenticateUser,
  authorizeRole("manager"),

  async (req, res) => {
    // Trys to create a new event
    try {
      // Creates a new event with the request body
      const event = new Event(req.body);
      // Saves the event
      await event.save();
      // Sends the event as a response
      res.status(201).json(event);
    } catch (err) {
      // If there is an error, it will be caught here
      res.status(400).json({ message: err.message });
    }
  }
);

// Read all events endpoint
router.get("/readEvents", async (req, res) => {
  try {
    // Finds all events
    const events = await Event.find();
    // Sends all events as a response
    res.json(events);
    // If there is an error, it will be caught here
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read by Name endpoint.
// This endpoint will read an event by its name.
// It was not used in the app but it can be used in the future.
router.get("/readByName/:name", async (req, res) => {
  try {
    // Encodes the name parameter
    const encodedName = encodeURIComponent(req.params.name);
    // Decodes the encoded name
    console.log(encodedName);
    //  Decodes the encoded name
    const decodedName = decodeURIComponent(encodedName);
    console.log(decodedName);
    //  Finds an event by its name
    const event = await Event.findOne({ name: decodedName });
    //  If the event is not found, it will return a 404 error
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Sends the event as a response
    res.json(event);
    // If there is an error, it will be caught here
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// This endpoint will update an event by its ID.
router.put(
  // The endpoint is protected with authenticateUser and authorizeRole middleware.
  "/updateEventById/:id",
  authenticateUser,
  authorizeRole("manager"),
  // The endpoint is protected with authenticateUser and authorizeRole middleware.
  async (req, res) => {
    // Gets the event ID from the request parameters
    const eventId = req.params.id;
    // Gets the updated event from the request body
    const updatedEvent = req.body;

    // If the event ID is not a valid MongoDB ID, it will return a 404 error
    try {
      const result = await Event.findByIdAndUpdate(eventId, updatedEvent, {
        new: true,
      });
      // If the event is not found, it will return a 404 error
      if (!result) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.status(200).json(result);
      }
      // If there is an error, it will be caught here
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete event by ID endpoint.
router.delete(
  // The endpoint is protected with authenticateUser and authorizeRole middleware.
  "/deleteEventById/:id",
  // The endpoint is protected with authenticateUser and authorizeRole middleware.
  authenticateUser,
  authorizeRole("manager"),
  async (req, res) => {
    try {
      // Gets the event ID from the request parameters
      const eventId = req.params.id;
      // Deletes the event by its ID
      const event = await Event.findByIdAndDelete(eventId);
      // If the event is not found, it will return a 404 error
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      //  Sends a message as a response
      res.json({ message: "Event deleted" });
    } catch (err) {
      // If there is an error, it will be caught here
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
