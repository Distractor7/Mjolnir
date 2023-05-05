// Mongoose require and schema
const mongoose = require("mongoose");

// Event schema
const EventSchema = new mongoose.Schema({
  // Event name
  name: { type: String, required: true },
  // Event image
  eventImage: { type: String },
  // Event time
  time: { type: String, required: true },
  //  Event date
  date: { type: Date, required: true },
  // Event line up
  lineUp: [
    {
      artist: { type: String, required: true },
      schedule: { type: String, required: true },
    },
  ],
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
