const mongoose = require("mongoose");

const bookingRequestSchema = mongoose.Schema({
    rideId: { type: String },
    authorId: { type: String },
    recipientId: { type: String },
    status: { type: String, default: "pending" }, // pending, accepted, or rejected
});

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
