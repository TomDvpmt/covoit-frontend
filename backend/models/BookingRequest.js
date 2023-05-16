const mongoose = require("mongoose");

const bookingRequestSchema = mongoose.Schema({
    rideId: { type: String },
    senderId: { type: String },
    senderFirstName: { type: String },
    senderLastName: { type: String },
    senderEmail: { type: String },
    driverId: { type: String },
    driverFirstName: { type: String },
    driverLastName: { type: String },
    driverEmail: { type: String },
    departure: { type: String },
    destination: { type: String },
    departureDate: { type: Number },
    status: { type: String, default: "pending" }, // pending, accepted, or rejected
});

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
