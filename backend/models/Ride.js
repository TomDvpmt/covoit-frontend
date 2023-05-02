const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
    driverId: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    departureDate: { type: Date, required: true },
    availableSeats: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("Ride", rideSchema);
