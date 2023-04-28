const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/database");
const userRoutes = require("./routes/user");

connectToDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/API/user", userRoutes);

module.exports = app;
