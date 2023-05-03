const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/database");
const userRoutes = require("./routes/user");
const rideRoutes = require("./routes/ride");

connectToDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/API/users", userRoutes);
app.use("/API/rides", rideRoutes);

module.exports = app;
