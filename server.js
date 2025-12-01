const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const bookingsRoutes = require("./routes/booking");
const slotsRoutes = require("./routes/slots");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve index.html

// MongoDB connection
mongoose.connect("mongodb+srv://Sweetaa:<Rudra@789>@cluster0.v5tyycc.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));


// Routes
app.use("/api/bookings", bookingsRoutes);
app.use("/api/slots", slotsRoutes);

// Serve index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
