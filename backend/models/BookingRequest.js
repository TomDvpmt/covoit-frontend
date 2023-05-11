const mongoose = require("mongoose");

const bookingRequestSchema = mongoose.Schema({
    rideId: { type: String },
    authorId: { type: String },
    authorFirstName: { type: String },
    authorLastName: { type: String },
    recipientId: { type: String },
    recipientFirstName: { type: String },
    recipientLastName: { type: String },
    departure: { type: String },
    destination: { type: String },
    departureDate: { type: Number },
    status: { type: String, default: "pending" }, // pending, accepted, or rejected
});

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
